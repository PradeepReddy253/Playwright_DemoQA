import { test, expect } from '@playwright/test';
import { WebTablesPage } from '../../pages/WebTablesPage';
import { logStep } from '../../utils/logger';
import { webTablesData } from '../../utils/testData';
import fs from 'fs';
import path from 'path';
import { handleError } from '../../utils/errorHandler';

test.describe('Web Tables Tests', () => {

  // Global afterEach for screenshots on failure
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      if (!fs.existsSync('screenshots')) {
        fs.mkdirSync('screenshots');
      }
      const safeTitle = testInfo.title.replace(/[^a-zA-Z0-9-_]/g, '_');
      const screenshotPath = path.join('screenshots', `${safeTitle}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.error(` Test failed: ${testInfo.error?.message}`);
      console.log(` Screenshot saved at: ${screenshotPath}`);
    }
  });

  test('Add, edit, and delete records in Web Tables', async ({ page }) => {
    try {
      const webTablesPage = new WebTablesPage(page);

      logStep('Navigating to Web Tables page');
      await webTablesPage.navigate();

      // Add new record
      logStep('Adding new record');
      await webTablesPage.addRecord(
        webTablesData.firstName,
        webTablesData.lastName,
        webTablesData.email,
        webTablesData.age,
        webTablesData.salary,
        webTablesData.department
      );

      //  Verify full record
      const rowIndex = await webTablesPage.findRowIndexByName(webTablesData.firstName);
      expect(rowIndex).not.toBeNull();

      const rowData = await webTablesPage.getRowData(rowIndex!);
      expect(rowData).toEqual([
        webTablesData.firstName,
        webTablesData.lastName,
        webTablesData.age,
        webTablesData.email,
        webTablesData.salary,
        webTablesData.department
      ]);

      // Edit record
      logStep('Editing record department');
      await webTablesPage.editRecord(rowIndex!, 'HR');

      const updatedRowData = await webTablesPage.getRowData(rowIndex!);
      expect(updatedRowData[5]).toBe('HR');

      // Delete record
      logStep('Deleting record');
      await webTablesPage.deleteRecord(rowIndex!);

      const deletedRowIndex = await webTablesPage.findRowIndexByName(webTablesData.firstName);
      expect(deletedRowIndex).toBeNull();

    }
    catch (err) {
      await handleError('Radio Button Test', err);
    }
  });
});