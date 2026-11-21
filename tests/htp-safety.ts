import { expect, type BrowserContext, type Page } from '@playwright/test';

export const mockEndpoint = 'https://htp.example.invalid/public/forms/11111111-1111-4111-8111-111111111111';

// Page-level mock routes take precedence; everything else must stay on the local preview.
export async function blockExternalRequests(context: BrowserContext, blocked: string[] = []) {
  await context.route('**/*', async route => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.origin === 'http://127.0.0.1:4517' && request.method() === 'GET') return route.continue();
    blocked.push(request.url());
    return route.abort();
  });
}

export async function assertMockAction(page: Page) {
  await expect(page.locator('[data-quote-form]')).toHaveAttribute('action', mockEndpoint, { timeout: 1000 });
}
