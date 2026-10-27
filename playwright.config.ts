import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4517', browserName: 'chromium' },
  webServer: {
    command: 'npm run preview -- --port 4517 --ignore-lock',
    url: 'http://127.0.0.1:4517',
    reuseExistingServer: process.env.PLAYWRIGHT_REUSE_SERVER === '1' && !process.env.CI,
  },
});
