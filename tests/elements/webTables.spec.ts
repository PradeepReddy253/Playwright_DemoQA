import { test, expect } from '@playwright/test';
import { WebTablesPage } from '../../pages/WebTablesPage';
import { webTablesData } from '../../utils/testData';
import { handleError } from '../../utils/errorHandler';

test.describe('Web Tables Tests', () => {

  test('Add, edit, and delete records in Web Tables', async ({ page }) => {
    try {
      const webTablesPage = new WebTablesPage(page);

      await webTablesPage.navigate();

      // Add new record
      await webTablesPage.addRecord(
        webTablesData.firstName,
        webTablesData.lastName,
        webTablesData.email,
        webTablesData.age,
        webTablesData.salary,
        webTablesData.department
      );

      // Verify full record
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
      await webTablesPage.editRecord(rowIndex!, 'HR');

      const updatedRowData = await webTablesPage.getRowData(rowIndex!);
      expect(updatedRowData[5]).toBe('HR');

      // Delete record
      await webTablesPage.deleteRecord(rowIndex!);

      const deletedRowIndex = await webTablesPage.findRowIndexByName(webTablesData.firstName);
      expect(deletedRowIndex).toBeNull();

    } catch (err) {
      await handleError('Web Tables Test', err, page);
    }
  });

  test('Should not allow adding a record with missing required fields', async ({ page }) => {
    try {
      const webTablesPage = new WebTablesPage(page);

      await webTablesPage.navigate();

      await webTablesPage.addRecord(
        webTablesData.firstName,
        webTablesData.lastName,
        '', // Missing email
        webTablesData.age,
        webTablesData.salary,
        webTablesData.department
      );

      const rowIndex = await webTablesPage.findRowIndexByName(webTablesData.firstName);
      expect(rowIndex).toBeNull(); // Expect the record to not be added

    } catch (err) {
      await handleError('Negative Test - Missing Email', err, page);
    }
  });

});