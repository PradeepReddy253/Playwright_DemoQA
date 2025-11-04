import { test, expect } from '@playwright/test';
import { WebTablesPage } from '../../pages/WebTablesPage';
import { logStep } from '../../utils/logger';
import { webTablesData } from '../../utils/testData';

test('Add, edit, and delete records in Web Tables', async ({ page }) => {
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
  
// Screenshot after adding user
  await page.screenshot({ path: 'screenshots/after-add.png', fullPage: true });

  let tableText = await webTablesPage.getTableText();
  expect(tableText).toContain('John');

  // Edit record
  logStep('Editing record department');
  await webTablesPage.editRecord(4, 'HR'); // Assuming new record is at index 4
  
  // Screenshot after updating user
  await page.screenshot({ path: 'screenshots/after-update.png', fullPage: true });

  tableText = await webTablesPage.getTableText();
  expect(tableText).toContain('HR');

  // Delete record
  logStep('Deleting record');
  await webTablesPage.deleteRecord(4);
  tableText = await webTablesPage.getTableText();
  expect(tableText).not.toContain('John');
});
