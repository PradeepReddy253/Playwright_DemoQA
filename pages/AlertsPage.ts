import { Page } from '@playwright/test';
import { navigateTo, clickElement, getText } from '../utils/actions';


export class AlertsPage {
  constructor(private page: Page) {}

  async handleAlert() {
  this.page.once('dialog', async dialog => {
    await this.page.waitForTimeout(2000);
    await dialog.accept();
  });
}

async handleConfirm(accept: boolean = true) {
  this.page.once('dialog', async dialog => {
    accept ? await dialog.accept() : await dialog.dismiss();
  });
}

async handlePrompt(text: string) {
  this.page.once('dialog', async dialog => {
    await dialog.accept(text);
  });
}

  async navigate() {
    await navigateTo(this.page, '/alerts');
  }

  async clickAlertButton() {
    await clickElement(this.page, '#alertButton');
  }

  async clickTimerAlertButton() {
    await clickElement(this.page, '#timerAlertButton');
  }

  async clickConfirmButton() {
    await clickElement(this.page, '#confirmButton');
  }

  async clickPromptButton() {
    await clickElement(this.page, '#promtButton');
  }

  async getConfirmResultText() {
  return await getText(this.page, '#confirmResult');
}

async getPromptResultText() {
  return await getText(this.page, '#promptResult');
}

}

