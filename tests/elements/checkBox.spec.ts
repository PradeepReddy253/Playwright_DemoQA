import { test, expect } from '@playwright/test';
import { CheckBoxPage } from '../../pages/CheckBoxPage';
import { logStep } from '../../utils/logger';

test('Check Box selection', async ({ page }) => {
  const checkBoxPage = new CheckBoxPage(page);

  logStep('Navigating to Check Box page');
  await checkBoxPage.navigate();

  logStep('Expanding all checkboxes');
  await checkBoxPage.expandAll();
  await page.waitForTimeout(1000); // Pause for demo clarity

  logStep('Selecting Desktop and Notes checkboxes');
  await checkBoxPage.selectCheckbox('Desktop');
  await checkBoxPage.selectCheckbox('Notes');
  await page.waitForTimeout(1000);

  logStep('Verifying selected items');
  const result = await checkBoxPage.getSelectedItems();
  expect(result).toContain('commands');
});