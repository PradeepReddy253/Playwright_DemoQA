import { test, expect } from '@playwright/test';
import { BrowserWindowsPage } from '../../pages/BrowserWindowsPage';
import { handleError } from '../../utils/errorHandler';

test.describe('Browser Windows Tests', () => {
  test('Handle new tab and verify content', async ({ page, context }) => {
    try {
      const browserWindowsPage = new BrowserWindowsPage(page);

      //('Navigating to Browser Windows page');
      await browserWindowsPage.navigate();

      //('Waiting for new tab button to be visible');
      await page.waitForSelector('#tabButton', { state: 'visible', timeout: 10000 });

      //('Clicking new tab button');
      const [newPage] = await Promise.all([
        context.waitForEvent('page', { timeout: 15000 }),
        browserWindowsPage.clickNewTabButton()
      ]);

      //('Waiting for new page to load');
      await newPage.waitForLoadState('domcontentloaded');
      await newPage.waitForSelector('#sampleHeading', { state: 'visible', timeout: 10000 });

      //('Verifying new tab content');
      const sampleHeading = await newPage.locator('#sampleHeading').textContent();
      expect(sampleHeading).toBe('This is a sample page');

      //('Closing new tab and returning to main page');
      await newPage.close();

      //('New tab handled and verified successfully');
    } catch (err) {
      await handleError('Handle new tab and verify content', err, page);
    }
  });

  test('Handle new window and verify content', async ({ page, context }) => {
    try {
      const browserWindowsPage = new BrowserWindowsPage(page);

      //('Navigating to Browser Windows page');
      await browserWindowsPage.navigate();

      //('Waiting for new window button to be visible');
      await page.waitForSelector('#windowButton', { state: 'visible', timeout: 10000 });

      //('Clicking new window button');
      const [newWindow] = await Promise.all([
        context.waitForEvent('page', { timeout: 15000 }),
        browserWindowsPage.clickNewWindowButton()
      ]);

      //('Waiting for new window to load');
      await newWindow.waitForLoadState('domcontentloaded');
      await newWindow.waitForSelector('#sampleHeading', { state: 'visible', timeout: 10000 });

      //('Verifying new window content');
      const sampleHeading = await newWindow.locator('#sampleHeading').textContent();
      expect(sampleHeading).toBe('This is a sample page');

      //('Closing new window and returning to main page');
      await newWindow.close();

      //('New window handled and verified successfully');
    } catch (err) {
      await handleError('Handle new window and verify content', err, page);
    }
  });

  test('Handle new window with message', async ({ page, context }) => {
    try {
      const browserWindowsPage = new BrowserWindowsPage(page);

      //('Navigating to Browser Windows page');
      await browserWindowsPage.navigate();

      //('Waiting for message window button to be visible');
      await page.waitForSelector('#messageWindowButton', { state: 'visible', timeout: 10000 });

      //('Clicking new window message button');
      const [newWindow] = await Promise.all([
        context.waitForEvent('page', { timeout: 15000 }),
        browserWindowsPage.clickNewWindowMessageButton()
      ]);

      //('Waiting for new window to load');
      await newWindow.waitForLoadState('domcontentloaded');
      await newWindow.waitForTimeout(2000); // Extra time for message window

      //('Verifying message window content');
      const bodyText = await newWindow.locator('body').textContent();
      expect(bodyText).toContain('Knowledge');

      //('Closing message window');
      await newWindow.close();

      //('Message window handled and verified successfully');
    } catch (err) {
      await handleError('Handle new window with message', err, page);
    }
  });
});