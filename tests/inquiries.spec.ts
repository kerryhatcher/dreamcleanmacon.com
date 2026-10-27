import { test, expect, type Page } from '@playwright/test';

const production = 'https://www.dreamcleanmacon.com';
const endpoint = 'https://formspree.io/f/xeaoybzw';
const paths = ['/', '/housekeeping/', '/move-in-move-out-cleaning/'];

async function events(page: Page) {
  return page.evaluate(() => (window as any).__inquiryEvents);
}

async function fillQuote(page: Page) {
  await expect(page).toHaveTitle(/Dream Clean/);
  await page.getByLabel('Your name (required)').fill('Browser Test');
  await page.getByLabel('Email address (required)').fill('browser-test@example.invalid');
  await page.getByLabel('Phone number (optional)').fill('555-0100');
  await page.getByLabel('Tell us about your cleaning needs (optional)').fill('Private test message');
}

test.beforeEach(async ({ page }) => {
  // Production-host behavior using only local build output. Never contact the live form.
  await page.route(`${production}/**`, async route => {
    const url = new URL(route.request().url());
    const response = await route.fetch({ url: `http://127.0.0.1:4517${url.pathname}${url.search}` });
    await route.fulfill({ response });
  });
  await page.route('https://formspree.io/**', route => route.abort());
  await page.addInitScript(() => {
    (window as any).__inquiryEvents = [];
    (window as any).zaraz = { track: (name: string, properties: object) => {
      (window as any).__inquiryEvents.push({ name, properties });
      return Promise.resolve();
    } };
  });
});

test.afterEach(async ({ page }) => {
  await page.unrouteAll({ behavior: 'wait' });
});

for (const path of paths) {
  test(`accepted quote on ${path} records exactly one lead without contact data`, async ({ page }) => {
    let posts = 0;
    await page.route(endpoint, async route => {
      posts++;
      expect(route.request().method()).toBe('POST');
      expect(route.request().headers().accept).toBe('application/json');
      expect(route.request().postData()).toContain('browser-test@example.invalid');
      await route.fulfill({ json: { ok: true, next: '/thanks' } });
    });
    await page.goto(`${production}${path}?email=private@example.invalid`);
    await fillQuote(page);
    await page.getByRole('button', { name: 'Request a quote', exact: true }).click();
    await expect(page.getByRole('status')).toContainText('Your quote request has been received');
    await expect(page.getByRole('status')).toBeFocused();
    await expect(page.getByRole('button', { name: 'Request sent' })).toBeDisabled();
    await page.locator('[data-quote-form]').evaluate(form => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    expect(posts).toBe(1);
    const recorded = await events(page);
    expect(recorded).toHaveLength(1);
    expect(recorded[0]).toEqual({ name: 'generate_lead', properties: {
      page_path: path,
      service_type: path === '/' ? 'property_cleaning' : path === '/housekeeping/' ? 'housekeeping' : 'move_in_move_out',
      form_id: 'cleaning_quote', contact_method: 'quote_form',
    } });
    expect(JSON.stringify(recorded)).not.toMatch(/Browser Test|example.invalid|555-0100|Private test message/);
  });

  test(`phone links on ${path} retain normal behavior and send intent only`, async ({ page }) => {
    await page.goto(`${production}${path}`);
    const links = page.locator('a[href^="tel:"]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      // Dispatch a cancelable click without opening the OS telephone handler.
      const canceled = await links.nth(i).evaluate(link => !link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })));
      expect(canceled).toBe(false);
    }
    const recorded = await events(page);
    expect(recorded).toHaveLength(count);
    expect(recorded.every((event: any) => event.name === 'phone_click')).toBe(true);
    expect(recorded.map((event: any) => event.properties.link_location)).toEqual(expect.arrayContaining(['header', 'quote', 'footer']));
    expect(recorded.every((event: any) => !('conversion' in event.properties))).toBe(true);
  });
}

test('invalid form never posts or records a lead', async ({ page }) => {
  let posts = 0;
  await page.route(endpoint, async route => { posts++; await route.abort(); });
  await page.goto(production);
  await page.getByRole('button', { name: 'Request a quote', exact: true }).click();
  expect(await page.getByLabel('Your name (required)').evaluate((input: HTMLInputElement) => input.validity.valueMissing)).toBe(true);
  expect(posts).toBe(0);
  expect(await events(page)).toEqual([]);
});

for (const failure of ['validation', 'rate_limit', 'server', 'ok_false', 'invalid_json', 'network']) {
  test(`${failure} response preserves details and never records a lead`, async ({ page }) => {
    await page.route(endpoint, async route => {
      if (failure === 'network') return route.abort('failed');
      if (failure === 'invalid_json') return route.fulfill({ status: 200, contentType: 'text/html', body: '<h1>Challenge</h1>' });
      const status = failure === 'validation' ? 422 : failure === 'rate_limit' ? 429 : failure === 'server' ? 500 : 200;
      await route.fulfill({ status, json: { ok: false, errors: [{ message: 'Not accepted' }] } });
    });
    await page.goto(production);
    await fillQuote(page);
    await page.getByRole('button', { name: 'Request a quote', exact: true }).click();
    await expect(page.getByRole('status')).toContainText(failure === 'network' || failure === 'invalid_json' ? 'couldn’t confirm' : 'wasn’t accepted');
    await expect(page.getByLabel('Email address (required)')).toHaveValue('browser-test@example.invalid');
    await expect(page.getByRole('button', { name: 'Request a quote', exact: true })).toBeEnabled();
    expect(await events(page)).toEqual([]);
  });
}

test('pending submissions cannot be duplicated; rejected submissions can be retried', async ({ page }) => {
  let posts = 0;
  let release: () => void = () => {};
  const waiting = new Promise<void>(resolve => { release = resolve; });
  await page.route(endpoint, async route => {
    posts++;
    if (posts === 1) {
      await waiting;
      await route.fulfill({ status: 422, json: { ok: false } });
    } else await route.fulfill({ json: { ok: true } });
  });
  await page.goto(production);
  await fillQuote(page);
  await page.getByRole('button', { name: 'Request a quote', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Sending…' })).toBeDisabled();
  await page.locator('form').evaluate(form => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  expect(posts).toBe(1);
  release();
  await expect(page.getByRole('status')).toContainText('wasn’t accepted');
  await page.getByRole('button', { name: 'Request a quote', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('has been received');
  expect(posts).toBe(2);
  expect(await events(page)).toHaveLength(1);
});

for (const tracking of ['absent', 'throws', 'rejects']) {
  test(`quote succeeds when analytics ${tracking}`, async ({ page }) => {
    await page.addInitScript(mode => {
      if (mode === 'absent') delete (window as any).zaraz;
      else (window as any).zaraz = { track: () => {
        if (mode === 'throws') throw new Error('Blocked analytics');
        return Promise.reject(new Error('Blocked analytics'));
      } };
    }, tracking);
    await page.route(endpoint, route => route.fulfill({ json: { ok: true } }));
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(production);
    await fillQuote(page);
    await page.getByRole('button', { name: 'Request a quote', exact: true }).click();
    await expect(page.getByRole('status')).toContainText('has been received');
    expect(errors).toEqual([]);
  });
}

test('localhost does not emit production inquiry events', async ({ page }) => {
  await page.route(endpoint, route => route.fulfill({ json: { ok: true } }));
  await page.goto('/');
  await fillQuote(page);
  await page.getByRole('button', { name: 'Request a quote', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('has been received');
  await page.locator('a[href^="tel:"]').first().evaluate(link => link.dispatchEvent(new MouseEvent('click', { bubbles: true })));
  expect(await events(page)).toEqual([]);
});

test('without JavaScript the native POST remains usable', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' });
  const page = await context.newPage();
  let posts = 0;
  await page.route(endpoint, async route => {
    posts++;
    await route.fulfill({ contentType: 'text/html', body: '<h1>Native POST received</h1>' });
  });
  await page.goto('http://127.0.0.1:4517/');
  await fillQuote(page);
  await page.getByLabel('Email address (required)').press('Enter');
  await expect(page.getByRole('heading', { name: 'Native POST received' })).toBeVisible();
  expect(posts).toBe(1);
  await context.close();
});
