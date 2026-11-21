import { test, expect } from '@playwright/test';

const endpoint = 'https://htp.example.invalid/public/forms/11111111-1111-4111-8111-111111111111';
test.skip(!process.env.PUBLIC_HTP_FORM_ENDPOINT, 'Requires a build with the mock HTP endpoint');
test('HTP ambiguous submission survives reload and replays once without changed values', async ({ page }) => {
  const payloads: any[] = [];
  await page.route('https://www.dreamcleanmacon.com/**', async route => {
    const url = new URL(route.request().url());
    await route.fulfill({ response: await route.fetch({ url: `http://127.0.0.1:4517${url.pathname}` }) });
  });
  await page.addInitScript(() => {
    (window as any).events = [];
    (window as any).zaraz = { track: (name: string) => (window as any).events.push(name) };
  });
  await page.route(endpoint, async route => {
    if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'POST', 'access-control-allow-headers': 'content-type' } });
    payloads.push(route.request().postDataJSON());
    if (payloads.length === 1) return route.abort();
    await route.fulfill({ json: { ok: true, duplicate: true }, headers: { 'access-control-allow-origin': '*' } });
  });
  await page.goto('https://www.dreamcleanmacon.com/');
  await page.getByLabel('Your name (required)').fill('Test');
  await page.getByLabel('Email address (required)').fill('test@example.invalid');
  await page.getByRole('button', { name: 'Request a quote' }).click();
  await expect(page.getByRole('status')).toContainText('couldn’t confirm');
  await page.reload();
  await expect(page.getByLabel('Your name (required)')).toHaveValue('Test');
  await page.getByLabel('Your name (required)').fill('Changed');
  await page.getByRole('button', { name: 'Request a quote' }).click();
  await expect(page.getByRole('status')).toContainText('restore the original details');
  expect(payloads).toHaveLength(1);
  await page.getByLabel('Your name (required)').fill('Test');
  await page.getByRole('button', { name: 'Request a quote' }).click();
  await expect(page.getByRole('status')).toContainText('Your visit is not booked yet');
  expect(payloads).toHaveLength(2);
  expect(payloads[1]).toEqual(payloads[0]);
  expect(payloads[0].submission_id).toMatch(/^[0-9a-f-]{36}$/);
  expect(await page.evaluate(() => (window as any).events)).toEqual(['generate_lead']);
});

test('HTP validation allows corrected retry; conflict never silently resubmits', async ({ page }) => {
  const payloads: any[] = [];
  await page.route(endpoint, async route => {
    payloads.push(route.request().postDataJSON());
    await route.fulfill({ status: payloads.length === 1 ? 422 : 409, json: { ok: false }, headers: { 'access-control-allow-origin': '*' } });
  });
  await page.goto('/');
  await page.getByLabel('Your name (required)').fill('Test');
  await page.getByLabel('Email address (required)').fill('test@example.invalid');
  await page.getByRole('button', { name: 'Request a quote' }).click();
  await expect(page.getByRole('status')).toContainText('wasn’t accepted');
  await page.getByLabel('Your name (required)').fill('Corrected');
  await page.getByRole('button', { name: 'Request a quote' }).click();
  await expect(page.getByRole('status')).toContainText('couldn’t reconcile');
  expect(payloads).toHaveLength(2);
  expect(payloads[1].submission_id).not.toBe(payloads[0].submission_id);
  await page.getByLabel('Your name (required)').fill('Changed again');
  await page.getByRole('button', { name: 'Request a quote' }).click();
  await expect(page.getByRole('status')).toContainText('restore the original details');
  expect(payloads).toHaveLength(2);
});
