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

async getRowData(rowIndex: number): Promise<string[]> {
  const rowLocator = this.page.locator(`.rt-tr-group:nth-child(${rowIndex}) .rt-td`);
  const cellCount = await rowLocator.count();
  const rowData: string[] = [];
  for (let i = 0; i < cellCount; i++) {
    const text = (await rowLocator.nth(i).innerText()).trim();
    if (text) rowData.push(text); // Ignore empty cells
  }
  return rowData;
}

  async findRowIndexByName(name: string): Promise<number | null> {
    const rows = this.page.locator('.rt-tr-group');
    const rowCount = await rows.count();
    for (let i = 1; i <= rowCount; i++) {
      const rowText = await rows.nth(i - 1).innerText();
      if (rowText.includes(name)) {
        return i;
      }
    }
    return null;
  }
}