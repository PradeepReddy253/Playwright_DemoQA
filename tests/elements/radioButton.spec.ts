import { test, expect } from '@playwright/test';
import { RadioButtonPage } from '../../pages/RadioButtonPage';
import { logStep } from '../../utils/logger';

test('Radio Button selection', async ({ page }) => {
  const radioButtonPage = new RadioButtonPage(page);

  logStep('Navigating to Radio Button page');
  await radioButtonPage.navigate();
  await page.waitForTimeout(1000);

  logStep('Selecting Yes option');
  await radioButtonPage.selectOption('Yes');
  expect(await radioButtonPage.getSelectionMessage()).toBe('Yes');

  await page.waitForTimeout(1000);
  logStep('Selecting Impressive option');
  await radioButtonPage.selectOption('Impressive');
  expect(await radioButtonPage.getSelectionMessage()).toBe('Impressive');

  logStep('Checking if No option is disabled');
  expect(await radioButtonPage.isNoDisabled()).toBeTruthy();
});
