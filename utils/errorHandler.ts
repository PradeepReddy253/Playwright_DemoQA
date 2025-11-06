// utils/errorHandler.ts
import fs from 'fs';
import path from 'path';
import { Page } from '@playwright/test';

export async function handleError(testName: string, err: unknown, page?: Page) {
  try {
    // Ensure screenshots folder exists
    if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots');
    }

    // Safe file name for screenshot
    const safeTitle = testName.replace(/[^a-zA-Z0-9-_]/g, '_');
    const screenshotPath = path.join('screenshots', `${safeTitle}.png`);

    // Capture screenshot if page is provided
    if (page) {
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`📸 Screenshot saved at: ${screenshotPath}`);
    }

    // Log error details
    if (err instanceof Error) {
      console.error(` Error in ${testName}: ${err.message}`);
    } else {
      console.error(` Unknown error in ${testName}: ${String(err)}`);
    }
  } catch (screenshotErr) {
    console.error(`Failed to capture screenshot: ${String(screenshotErr)}`);
  }

  // Rethrow so Playwright marks test as failed
  throw err;
}