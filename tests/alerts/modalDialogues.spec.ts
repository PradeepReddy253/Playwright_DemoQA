import { test, expect } from '@playwright/test';
import { ModalDialogsPage } from '../../pages/ModalDialogsPage';
import { handleError } from '../../utils/errorHandler';

//start test
test.describe('Modal Dialog Tests', () => {
  test('Verify small modal', async ({ page }) => {
    try {
      const modalPage = new ModalDialogsPage(page);

      //('Navigating to Modal Dialogs page');
      await modalPage.navigate();

      //('Opening small modal');
      await modalPage.openSmallModal();

      //('Fetching text from small modal');
      const text = await modalPage.getModalText();
      expect(text).toContain('This is a small modal');

      //('Closing small modal');
      await modalPage.closeModal('small');

      //('Small modal test completed successfully');
    } catch (err) {
      await handleError('Verify small modal', err, page);
    }
  });

  test('Verify large modal', async ({ page }) => {
    try {
      const modalPage = new ModalDialogsPage(page);

      //('Navigating to Modal Dialogs page');
      await modalPage.navigate();

      //('Opening large modal');
      await modalPage.openLargeModal();

      //('Fetching text from large modal');
      const text = await modalPage.getModalText();
      expect(text).toContain(
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
      );

      //('Closing large modal');
      await modalPage.closeModal('large');

      //('Large modal test completed successfully');
    } catch (err) {
      await handleError('Verify large modal', err, page);
    }
  });
});