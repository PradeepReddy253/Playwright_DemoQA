import { test, expect } from '@playwright/test';
import { TextBoxPage } from '../../pages/TextBoxPage';
import { testData } from '../../utils/testData';
import { handleError } from '../../utils/errorHandler';

test.describe('Text Box Tests', () => {

  test('Positive: Valid form submission', async ({ page }) => {
    try {
      const textBoxPage = new TextBoxPage(page);

      //'Navigating to Text Box page');
      await textBoxPage.navigate();

      //'Filling form with valid data');
      await textBoxPage.fillForm(testData.name, testData.email, testData.currentAddress, testData.permanentAddress);

      //('Submitting form');
      await textBoxPage.submit();

      const output = await textBoxPage.getOutput();
      expect(output).toContain(`Name:${testData.name}`);
      expect(output).toContain(`Email:${testData.email}`);
      expect(output).toContain(`Current Address :${testData.currentAddress}`);
      expect(output).toContain(`Permananet Address :${testData.permanentAddress}`);
    } catch (err) {
      await handleError('Positive: Valid form submission', err, page);
    }
  });

  test('Negative: Invalid email format', async ({ page }) => {
    try {
      const textBoxPage = new TextBoxPage(page);

      //('Navigating to Text Box page');
      await textBoxPage.navigate();

      //('Filling form with invalid email');
      await textBoxPage.fillForm(testData.name, 'invalid-email', testData.currentAddress, testData.permanentAddress);

      //('Submitting form');
      await textBoxPage.submit();

      const emailField = page.locator('#userEmail');
      await expect(emailField).toHaveClass(/field-error/); // Assuming demoqa adds error class
    } catch (err) {
      await handleError('Negative: Invalid email format', err, page);
    }
  });

  // test('Negative: Invalid permanent address with special characters', async ({ page }) => {
  //   try {
  //     const textBoxPage = new TextBoxPage(page);

  //     //('Navigating to Text Box page');
  //     await textBoxPage.navigate();

  //     //('Filling form with invalid permanent address');
  //     await textBoxPage.fillForm(testData.name, testData.email, testData.currentAddress, '@@@###$$$');

  //     //('Submitting form');
  //     await textBoxPage.submit();

  //     const permanentAddressField = page.locator('#permanentAddress');
  //     await expect(permanentAddressField).toHaveClass(/field-error/); // Assuming demoqa adds error class
  //   } catch (err) {
  //     await handleError('Negative: Invalid permanent address', err, page);
  //   }
  // });

});