import { Page } from '@playwright/test';
import { navigateTo, fillText, clickElement, getText } from '../utils/actions';

export class TextBoxPage {
  constructor(private page: Page) {}

  async navigate() {
    await navigateTo(this.page, '/text-box');
  }

  async fillForm(name: string, email: string, currentAddress: string, permanentAddress: string) {
    await fillText(this.page, '#userName', name);
    await fillText(this.page, '#userEmail', email);
    await fillText(this.page, '#currentAddress', currentAddress);
    await fillText(this.page, '#permanentAddress', permanentAddress);
  }

  async submit() {
    await clickElement(this.page, '#submit');
  }

  async getOutput() {
    return await getText(this.page, '#output');
  }
}