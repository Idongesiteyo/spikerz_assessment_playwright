import { Page, Locator } from '@playwright/test';
import { IPage } from '../utils/IPage';
import  logger  from '../utils/logger';

// import { chromium } from "playwright-extra";
// import stealth from 'puppeteer-extra-plugin-stealth';

// Add stealth before launching the browser
// chromium.use(stealth());

// export abstract class BasePage {
 
// }

export abstract class BasePage implements IPage {

  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
    logger.info(`Navigated to ${url}`);
  }

  protected async waitAndClick(locator: Locator | string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'visible' });
    await element.click();
  }
}