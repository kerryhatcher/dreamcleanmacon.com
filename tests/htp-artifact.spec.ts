import { expect, test } from '@playwright/test';
import { blockExternalRequests } from './htp-safety';

const endpoint = process.env.PUBLIC_HTP_FORM_ENDPOINT;
test.skip(!endpoint, 'Requires a configured HTP build');

for (const path of ['/', '/housekeeping/', '/move-in-move-out-cleaning/']) {
  test(`built quote form points to the configured endpoint on ${path}`, async ({ context, page }) => {
    await blockExternalRequests(context);
    await page.goto(path);
    const form = page.locator('[data-quote-form]');
    await expect(form).toHaveAttribute('action', endpoint ?? '');
    await expect(form).toHaveAttribute('method', 'POST');
    await expect(form).toHaveAttribute('data-htp', 'true');
  });
}
