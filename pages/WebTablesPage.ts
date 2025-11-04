import { Page } from '@playwright/test';
import { navigateTo, clickElement, fillText, getText } from '../utils/actions';

export class WebTablesPage {
  constructor(private page: Page) {}

  async navigate() {
    await navigateTo(this.page, '/webtables');
  }

  async addRecord(firstName: string, lastName: string, email: string, age: string, salary: string, department: string) {
    await clickElement(this.page, '#addNewRecordButton');
    await fillText(this.page, '#firstName', firstName);
    await fillText(this.page, '#lastName', lastName);
    await fillText(this.page, '#userEmail', email);
    await fillText(this.page, '#age', age);
    await fillText(this.page, '#salary', salary);
    await fillText(this.page, '#department', department);
    await clickElement(this.page, '#submit');
  }

  async editRecord(rowIndex: number, newDepartment: string) {
    await clickElement(this.page, `#edit-record-${rowIndex}`);
    await fillText(this.page, '#department', newDepartment);
    await clickElement(this.page, '#submit');
  }

  async deleteRecord(rowIndex: number) {
    await clickElement(this.page, `#delete-record-${rowIndex}`);
  }

  async getTableText(): Promise<string> {
    return await getText(this.page, '.rt-table');
  }
}
