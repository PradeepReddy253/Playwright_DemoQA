import { test, expect } from '@playwright/test';
import { CheckBoxPage } from '../../pages/CheckBoxPage';
import { handleError } from '../../utils/errorHandler';

test.describe('Check Box Tests', () => {

  test('Positive: Check Box selection', async ({ page }) => {
    try {
      const checkBoxPage = new CheckBoxPage(page);

      //('Navigating to Check Box page');
      await checkBoxPage.navigate();

      //'Expanding all checkboxes');
      await checkBoxPage.expandAll();
      await page.waitForTimeout(1000); // Pause for demo clarity

      //'Selecting Desktop and Notes checkboxes');
      await checkBoxPage.selectCheckbox('Desktop');
      await checkBoxPage.selectCheckbox('Notes');
      await page.waitForTimeout(1000);

      //'Verifying selected items');
      const result = await checkBoxPage.getSelectedItems();
      expect(result).toContain('commands');
    } catch (err) {
      await handleError('Check Box Test', err, page);
    }
  });

  test('Negative: No checkbox selected', async ({ page }) => {
    try {
      const checkBoxPage = new CheckBoxPage(page);

      await checkBoxPage.navigate();
      await checkBoxPage.expandAll();
      await page.waitForTimeout(1000);

      // Verify that result area does NOT exist
      const resultLocator = page.locator('.display-result');
      expect(await resultLocator.count()).toBe(0); // Element should not exist
    } catch (err) {
      await handleError('Negative: No checkbox selected', err, page);
    }
  });
});