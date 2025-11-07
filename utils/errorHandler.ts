// utils/errorHandler.ts
import path from 'path';
import { Page } from '@playwright/test';
import fs from 'fs';
import logger from './logger';

export async function handleError(testName: string, err: unknown, page?: Page) {
  try {
    const safeTitle = testName.replace(/[^a-zA-Z0-9-_]/g, '_');
    const screenshotDir = 'screenshots';
    const screenshotPath = path.join(screenshotDir, `${safeTitle}.png`);

    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    if (page) {
      await page.screenshot({ path: screenshotPath, fullPage: true });
      logger.error(`Screenshot saved at: ${screenshotPath}`);
    }

    const errorMessage = err instanceof Error ? err.message : String(err);
    const errorStack = err instanceof Error && err.stack ? err.stack : 'No stack trace';

    logger.error(`ERROR in ${testName}: ${errorMessage}\n${errorStack}`);

  } catch (screenshotErr) {
    logger.error(`Failed to capture screenshot: ${String(screenshotErr)}`);
  }

  throw err;
}