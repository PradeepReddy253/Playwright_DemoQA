import { test, expect } from '@playwright/test';
import { RadioButtonPage } from '../../pages/RadioButtonPage';
import { logStep } from '../../utils/logger';
import fs from 'fs';
import path from 'path';
import { handleError } from '../../utils/errorHandler';

test.describe('Radio Button Tests', () => {

  test('Positive: Radio Button selection', async ({ page }) => {
    try {
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
    } catch (err) {
          await handleError('Radio Button Test', err,page);
        }
  });
});