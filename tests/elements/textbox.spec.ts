import { test, expect } from '@playwright/test';
import { TextBoxPage } from '../../pages/TextBoxPage';
import { testData } from '../../utils/testData';
import { logStep } from '../../utils/logger';

test('Text Box form submission', async ({ page }) => {
  const textBoxPage = new TextBoxPage(page);
  logStep('Navigating to Text Box page');
  await textBoxPage.navigate();

  logStep('Filling form');
  await textBoxPage.fillForm(testData.name, testData.email, testData.currentAddress, testData.permanentAddress);

  await page.waitForTimeout(2000);
  logStep('Submitting form');
  await textBoxPage.submit();

  const output = await textBoxPage.getOutput();
  expect(output).toContain(testData.name);
  expect(output).toContain(testData.email);
});
