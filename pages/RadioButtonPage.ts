import { Page } from '@playwright/test';
import { navigateTo, clickElement, getText } from '../utils/actions';

export class RadioButtonPage {
  constructor(private page: Page) {}

  async navigate() {
    await navigateTo(this.page, '/radio-button');
  }

  async selectOption(option: string) {
    await clickElement(this.page, `label:has-text("${option}")`);
  }

  async getSelectionMessage() {
    return await getText(this.page, '.text-success');
  }

  async isNoDisabled() {
    return await this.page.locator('#noRadio').isDisabled();
  }
}
