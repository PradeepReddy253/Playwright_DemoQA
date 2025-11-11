import { test, expect } from '@playwright/test';
import { RadioButtonPage } from '../../pages/RadioButtonPage';
import { handleError } from '../../utils/errorHandler';

test.describe('Radio Button Tests', () => {

  test('Positive: Radio Button selection', async ({ page }) => {
    try {
      const radioButtonPage = new RadioButtonPage(page);

      //'Navigating to Radio Button page');
      await radioButtonPage.navigate();
      await page.waitForTimeout(1000);

      //Selecting Yes option');
      await radioButtonPage.selectOption('Yes');
      expect(await radioButtonPage.getSelectionMessage()).toBe('Yes');

      await page.waitForTimeout(1000);
      //'Selecting Impressive option');
      await radioButtonPage.selectOption('Impressive');
      expect(await radioButtonPage.getSelectionMessage()).toBe('Impressive');

      //('Checking if No option is disabled');
      expect(await radioButtonPage.isNoDisabled()).toBeTruthy();
    } catch (err) {
      await handleError('Radio Button Test', err, page);
    }
  });
  test('Negative: Attempt to select disabled No option', async ({ page }) => {
    try {
      const radioButtonPage = new RadioButtonPage(page);

      await radioButtonPage.navigate();
      await page.waitForTimeout(1000);

      const isDisabled = await radioButtonPage.isNoDisabled();
      expect(isDisabled).toBeTruthy(); // No option should be disabled
    } catch (err) {
      await handleError('Negative: Disabled No option', err, page);
    }
  });

});