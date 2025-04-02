import { Page, expect } from '@playwright/test';
import {BasePage} from './BasePage';
import  logger  from '../utils/logger';



export default class SocialConnectPage extends BasePage {
    private readonly youtubeButtonText = 'Youtube'; 

    constructor(page: Page) {
        super(page);
    }

    async clickYouTube(): Promise<void> {
        await this.page.waitForSelector(`text=${this.youtubeButtonText}`, { timeout: 10000 });
        await expect(this.page.getByText(this.youtubeButtonText)).toBeVisible();
        await this.page.getByText(this.youtubeButtonText).click();
        logger.info('Clicked YouTube button')
    }
}