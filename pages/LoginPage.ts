import { Page } from '@playwright/test';
import {BasePage} from './BasePage';
import  logger  from '../utils/logger';
// import { chromium } from "playwright-extra";
// import stealth from 'puppeteer-extra-plugin-stealth';

// // Add stealth before launching the browser
// chromium.use(stealth());

export default class LoginPage extends BasePage {
    private readonly googleSignInButton = 'app-google-and-youtube-login';

    constructor(page: Page) {
        super(page);
    }

    async performBasicAuth(username: string, password: string, baseUrl: string): Promise<void> {
        const authUrl = `https://${username}:${password}@${baseUrl.replace('https://', '')}`;
        await this.navigateTo(authUrl);
        logger.info('Accessing baseURL');
    }

    async clickGoogleSignIn(): Promise<void> {
        await this.page.click(this.googleSignInButton);
    }
}