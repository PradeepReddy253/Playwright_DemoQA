import { Page } from '@playwright/test';
import { navigateTo, clickElement, getText, waitForVisible } from '../utils/actions';

export class BrowserWindowsPage {
  constructor(private page: Page) {}

  async navigate() {
    await navigateTo(this.page, 'https://demoqa.com/browser-windows');
  }

  async clickNewTabButton() {
    await clickElement(this.page, '#tabButton');
  }

  async clickNewWindowButton() {
    await clickElement(this.page, '#windowButton');
  }

  async clickNewWindowMessageButton() {
    await clickElement(this.page, '#messageWindowButton');
  }

  async getMainPageHeading() {
    return await getText(this.page, '.main-header');
  }

  // Wait for the page to be fully loaded and interactive
  async waitForPageToLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    await waitForVisible(this.page, '.main-header');
  }
}