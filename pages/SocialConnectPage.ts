import { Page, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class SocialConnectPage extends BasePage {
    private readonly youtubeButtonText = 'Youtube'; 

    constructor(page: Page) {
        super(page);
    }

    async clickYouTube(): Promise<void> {
        await expect(this.page.getByText(this.youtubeButtonText)).toBeVisible();
        await this.page.getByText(this.youtubeButtonText).click();
    }
}