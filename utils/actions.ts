// utils/actions.ts
import { Page, FrameLocator } from '@playwright/test';
import logger from './logger';


function logAction(action: string) {
  logger.info(`ACTION: ${action}`);
}

export async function navigateTo(page: Page, url: string) {
  logAction(`Navigating to URL: ${url}`);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
}

export async function clickElement(page: Page, selector: string) {
  logAction(`Clicking element: ${selector}`);
  await page.locator(selector).click();
}

export async function fillText(page: Page, selector: string, text: string) {
  logAction(`Filling text in ${selector} with "${text}"`);
  await page.locator(selector).fill(text);
}

export async function getText(page: Page, selector: string): Promise<string> {
  logAction(`Getting text from element: ${selector}`);
  return await page.locator(selector).innerText();
}

export async function waitForVisible(page: Page, selector: string) {
  logAction(`Waiting for element to be visible: ${selector}`);
  await page.locator(selector).waitFor({ state: 'visible' });
}

// Frame-specific utility functions
export async function clickElementInFrame(frame: FrameLocator, selector: string) {
  logAction(`Clicking element inside frame: ${selector}`);
  await frame.locator(selector).click();
}

export async function getTextFromFrame(frame: FrameLocator, selector: string): Promise<string> {
  logAction(`Getting text from frame element: ${selector}`);
  return await frame.locator(selector).innerText();
}

export async function waitForVisibleInFrame(frame: FrameLocator, selector: string) {
  logAction(`Waiting for frame element to be visible: ${selector}`);
  await frame.locator(selector).waitFor({ state: 'visible' });
}