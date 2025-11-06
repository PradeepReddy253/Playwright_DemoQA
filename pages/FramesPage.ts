import { Page } from '@playwright/test';
import { navigateTo, getText } from '../utils/actions';

export class FramesPage {
  constructor(private page: Page) {}

  async navigate() {
    await navigateTo(this.page, 'https://demoqa.com/frames');
  }

  // Methods for Frame 1
  async getFrame1Heading(): Promise<string> {
    const frame1 = this.page.frameLocator('#frame1');
    return await frame1.locator('#sampleHeading').innerText();
  }

  async getFrame1BodyText(): Promise<string> {
    const frame1 = this.page.frameLocator('#frame1');
    return await frame1.locator('body').textContent() || '';
  }

  // Methods for Frame 2
  async getFrame2Heading(): Promise<string> {
    const frame2 = this.page.frameLocator('#frame2');
    return await frame2.locator('#sampleHeading').innerText();
  }

  async getFrame2BodyText(): Promise<string> {
    const frame2 = this.page.frameLocator('#frame2');
    return await frame2.locator('body').textContent() || '';
  }

  // Direct frame interaction methods
  async isFrame1Visible(): Promise<boolean> {
    const frame1 = this.page.frameLocator('#frame1');
    return await frame1.locator('#sampleHeading').isVisible();
  }

  async isFrame2Visible(): Promise<boolean> {
    const frame2 = this.page.frameLocator('#frame2');
    return await frame2.locator('#sampleHeading').isVisible();
  }

  async getMainPageHeading() {
    return await getText(this.page, '.main-header');
  }
}