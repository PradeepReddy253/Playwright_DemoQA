import { test, expect } from '@playwright/test';
import { FramesPage } from '../../pages/FramesPage';
import { handleError } from '../../utils/errorHandler';

test.describe('Frames Tests', () => {
  test('Verify content in Frame 1', async ({ page }) => {
    try {
      const framesPage = new FramesPage(page);

      //('Navigating to Frames page');
      await framesPage.navigate();

      //('Verifying Frame 1 content');
      const frame1Heading = await framesPage.getFrame1Heading();
      expect(frame1Heading).toBe('This is a sample page');

      const frame1BodyText = await framesPage.getFrame1BodyText();
      expect(frame1BodyText).toContain('This is a sample page');

      //('Frame 1 content verified successfully');
    } catch (err) {
      await handleError('Verify content in Frame 1', err, page);
    }
  });

  test('Verify content in Frame 2', async ({ page }) => {
    try {
      const framesPage = new FramesPage(page);

      //('Navigating to Frames page');
      await framesPage.navigate();

      //('Verifying Frame 2 content');
      const frame2Heading = await framesPage.getFrame2Heading();
      expect(frame2Heading).toBe('This is a sample page');

      const frame2BodyText = await framesPage.getFrame2BodyText();
      expect(frame2BodyText).toContain('This is a sample page');

      //('Frame 2 content verified successfully');
    } catch (err) {
      await handleError('Verify content in Frame 2', err, page);
    }
  });

});