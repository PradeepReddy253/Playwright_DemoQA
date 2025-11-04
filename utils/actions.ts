import { Page } from '@playwright/test';

export async function navigateTo(page: Page, url: string) {
  await page.goto(url, { waitUntil: 'domcontentloaded' }); // Faster and reliable
}

export async function clickElement(page: Page, selector: string) {
  await page.locator(selector).click();
}

export async function fillText(page: Page, selector: string, text: string) {
  await page.locator(selector).fill(text);
}

export async function getText(page: Page, selector: string): Promise<string> {
  return await page.locator(selector).innerText();
}

export async function waitForVisible(page: Page, selector: string) {
  await page.locator(selector).waitFor({ state: 'visible' });
}