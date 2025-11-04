import { Page } from '@playwright/test';
import { navigateTo, clickElement, getText } from '../utils/actions';

export class CheckBoxPage {
  constructor(private page: Page) {}

  async navigate() {
    await navigateTo(this.page, '/checkbox');
  }

  async expandAll() {
    await clickElement(this.page, 'button[title="Expand all"]');  // Expand all nodes
  }

  async selectCheckbox(label: string) {
    const selector = `label:has-text("${label}")`;   // Click checkbox by label
    await clickElement(this.page, selector);
  }

  async getSelectedItems() {
    return await getText(this.page, '.display-result');   // Get result text
  }
}