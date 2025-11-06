import { test, expect } from '@playwright/test';
import { ModalDialogsPage } from '../../pages/ModalDialogsPage';
import { handleError } from '../../utils/errorHandler';
import { logStep } from '../../utils/logger';

//start test
test.describe('Modal Dialog Tests', () => {
  test('Verify small modal', async ({ page }) => {
    try {
      const modalPage = new ModalDialogsPage(page);

      logStep('Navigating to Modal Dialogs page');
      await modalPage.navigate();

      logStep('Opening small modal');
      await modalPage.openSmallModal();

      logStep('Fetching text from small modal');
      const text = await modalPage.getModalText();
      expect(text).toContain('This is a small modal');

      logStep('Closing small modal');
      await modalPage.closeModal('small');

      logStep('Small modal test completed successfully');
    } catch (err) {
      await handleError('Verify small modal', err, page);
    }
  });

  test('Verify large modal', async ({ page }) => {
    try {
      const modalPage = new ModalDialogsPage(page);

      logStep('Navigating to Modal Dialogs page');
      await modalPage.navigate();

      logStep('Opening large modal');
      await modalPage.openLargeModal();

      logStep('Fetching text from large modal');
      const text = await modalPage.getModalText();
      expect(text).toContain(
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
      );

      logStep('Closing large modal');
      await modalPage.closeModal('large');

      logStep('Large modal test completed successfully');
    } catch (err) {
      await handleError('Verify large modal', err, page);
    }
  });
});