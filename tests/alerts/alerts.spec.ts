import { test, expect } from '@playwright/test';
import { AlertsPage } from '../../pages/AlertsPage';
import { handleError } from '../../utils/errorHandler';

test.describe('Alerts Tests', () => {
  test('Handle simple alert and verify it appears', async ({ page }) => {
  try {
    const alertsPage = new AlertsPage(page);

    //('Navigating to Alerts page');
    await alertsPage.navigate();

    //('Setting up alert handler');
    await alertsPage.handleAlert(); 

    //('Clicking simple alert button');
    await alertsPage.clickAlertButton();

    //('Simple alert handled and verified successfully');
  } catch (err) {
    await handleError('Handle simple alert and verify', err, page);
  }
});
  test('Handle timed alert and verify it appears', async ({ page }) => {
  try {
    const alertsPage = new AlertsPage(page);

    //('Navigating to Alerts page');
    await alertsPage.navigate();

    //('Setting up alert handler');
    await alertsPage.handleAlert(); // Uses page.once internally

    //('Clicking timed alert button');
    await alertsPage.clickTimerAlertButton();

    //('Timed alert handled and verified successfully');
  } catch (err) {
    await handleError('Handle timed alert and verify', err, page);
  }
});

 
test('Handle confirm alert and verify it appears', async ({ page }) => {
    try {
      const alertsPage = new AlertsPage(page);

      //('Navigating to Alerts page');
      await alertsPage.navigate();

      //('Setting up confirm alert handler');
      await alertsPage.handleConfirm(true); // Accepts the confirm dialog

      //('Clicking confirm alert button');
      await alertsPage.clickConfirmButton();

      //('Verifying confirm alert result text');
      //const result = await getText(page, '#confirmResult'); //  using getText
      const result = await alertsPage.getConfirmResultText();
      expect(result).toContain('Ok');

      //('Confirm alert handled and verified successfully');
    } catch (err) {
      await handleError('Handle confirm alert and verify', err, page);
    }
  });

  test('Handle prompt alert and verify it appears', async ({ page }) => {
    try {
      const alertsPage = new AlertsPage(page);

      //('Navigating to Alerts page');
      await alertsPage.navigate();

      //('Setting up prompt alert handler');
      await alertsPage.handlePrompt('Playwright Test'); // Sends input to prompt

      //('Clicking prompt alert button');
      await alertsPage.clickPromptButton();

      //('Verifying prompt alert result text');
      //const result = await getText(page, '#promptResult'); //  using getText
      const result = await alertsPage.getPromptResultText();
      expect(result).toContain('Playwright Test');

      //('Prompt alert handled and verified successfully');
    } catch (err) {
      await handleError('Handle prompt alert and verify', err, page);
    }
  });
});
