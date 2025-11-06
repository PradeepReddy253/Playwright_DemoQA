import { test, expect } from '@playwright/test';
import { AlertsPage } from '../../pages/AlertsPage';
import { handleError } from '../../utils/errorHandler';
import { logStep } from '../../utils/logger';


test.describe('Alerts Tests', () => {
  test('Handle simple alert and verify it appears', async ({ page }) => {
  try {
    const alertsPage = new AlertsPage(page);

    logStep('Navigating to Alerts page');
    await alertsPage.navigate();

    logStep('Setting up alert handler');
    await alertsPage.handleAlert(); 

    logStep('Clicking simple alert button');
    await alertsPage.clickAlertButton();

    logStep('Simple alert handled and verified successfully');
  } catch (err) {
    await handleError('Handle simple alert and verify', err, page);
  }
});
  test('Handle timed alert and verify it appears', async ({ page }) => {
  try {
    const alertsPage = new AlertsPage(page);

    logStep('Navigating to Alerts page');
    await alertsPage.navigate();

    logStep('Setting up alert handler');
    await alertsPage.handleAlert(); // Uses page.once internally

    logStep('Clicking timed alert button');
    await alertsPage.clickTimerAlertButton();

    logStep('Timed alert handled and verified successfully');
  } catch (err) {
    await handleError('Handle timed alert and verify', err, page);
  }
});

 
test('Handle confirm alert and verify it appears', async ({ page }) => {
    try {
      const alertsPage = new AlertsPage(page);

      logStep('Navigating to Alerts page');
      await alertsPage.navigate();

      logStep('Setting up confirm alert handler');
      await alertsPage.handleConfirm(true); // Accepts the confirm dialog

      logStep('Clicking confirm alert button');
      await alertsPage.clickConfirmButton();

      logStep('Verifying confirm alert result text');
      //const result = await getText(page, '#confirmResult'); //  using getText
      const result = await alertsPage.getConfirmResultText();
      expect(result).toContain('Ok');

      logStep('Confirm alert handled and verified successfully');
    } catch (err) {
      await handleError('Handle confirm alert and verify', err, page);
    }
  });

  test('Handle prompt alert and verify it appears', async ({ page }) => {
    try {
      const alertsPage = new AlertsPage(page);

      logStep('Navigating to Alerts page');
      await alertsPage.navigate();

      logStep('Setting up prompt alert handler');
      await alertsPage.handlePrompt('Playwright Test'); // Sends input to prompt

      logStep('Clicking prompt alert button');
      await alertsPage.clickPromptButton();

      logStep('Verifying prompt alert result text');
      //const result = await getText(page, '#promptResult'); //  using getText
      const result = await alertsPage.getPromptResultText();
      expect(result).toContain('Playwright Test');

      logStep('Prompt alert handled and verified successfully');
    } catch (err) {
      await handleError('Handle prompt alert and verify', err, page);
    }
  });
});
