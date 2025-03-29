// import { Page } from '@playwright/test';

// export default class BasePage {
//     protected page: Page;

//     constructor(page: Page) {
//         this.page = page;
//     }

//     async navigateTo(url: string): Promise<void> {
//         await this.page.goto(url);
//         await this.page.waitForLoadState('networkidle');
//     }
// }

import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  protected async waitAndClick(locator: Locator | string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'visible' });
    await element.click();
  }
}