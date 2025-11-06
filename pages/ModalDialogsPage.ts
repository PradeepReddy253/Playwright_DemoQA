import { Page } from '@playwright/test';
import { navigateTo, clickElement, getText } from '../utils/actions';

export class ModalDialogsPage {
  constructor(private page: Page) {}

  async navigate() {
    await navigateTo(this.page, '/modal-dialogs');
  }

  async openSmallModal() {
    await clickElement(this.page, '#showSmallModal');
  }

  async openLargeModal() {
    await clickElement(this.page, '#showLargeModal');
  }

  async getModalText() {
    return await getText(this.page, '.modal-body');
  }

  async closeModal(modalType: 'small' | 'large') {
  if (modalType === 'small') {
    await clickElement(this.page, '#closeSmallModal');
  } else {
    await clickElement(this.page, '#closeLargeModal');
  }
}
}