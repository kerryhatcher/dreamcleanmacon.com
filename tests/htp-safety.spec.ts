import { test, expect } from '@playwright/test';
import { assertMockAction, blockExternalRequests } from './htp-safety';

test('mismatched form actions fail before submission and external POSTs are blocked', async ({ page, context }) => {
  const blocked: string[] = [];
  await blockExternalRequests(context, blocked);
  await page.goto('/');
  for (const action of [
    'https://formspree.io/f/xeaoybzw',
    'https://other.example.invalid/public/forms/11111111-1111-4111-8111-111111111111',
  ]) {
    await page.locator('[data-quote-form]').evaluate((form, value) => form.setAttribute('action', value), action);
    await expect(assertMockAction(page)).rejects.toThrow();
    await page.evaluate(url => fetch(url, { method: 'POST' }).catch(() => {}), action);
  }
  expect(blocked).toEqual([
    'https://formspree.io/f/xeaoybzw',
    'https://other.example.invalid/public/forms/11111111-1111-4111-8111-111111111111',
  ]);
});
