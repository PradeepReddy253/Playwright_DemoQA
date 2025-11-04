import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30*1000,
  retries: 1,
  fullyParallel: false,
  workers: 1,
  use: {
    headless: true,
    baseURL: 'https://demoqa.com', // ✅ Add this
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
 reporter: [
    ['list'], // shows results in terminal
    ['html', { outputFolder: 'playwright-report', open: 'never' }] // ✅ HTML report
  ]
});