import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import SocialConnectPage from '../pages/SocialConnectPage';
import GooglePopupPage from '../pages/GooglePopupPage';
import dotenv from 'dotenv';

dotenv.config();

test('Negative Test - Failed URL Redirect', async ({ browser }) => {
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();

    const loginPage = new LoginPage(page);
    const socialConnectPage = new SocialConnectPage(page);

    await loginPage.performBasicAuth(
        process.env.BASIC_AUTH_USER!, 
        process.env.BASIC_AUTH_PASS!, 
        process.env.BASE_URL!
    );
    await loginPage.navigateTo(`${process.env.BASE_URL}/social-connect`);
    await expect(page).toHaveURL(`${process.env.BASE_URL}/social-connect`);
    
    await socialConnectPage.clickYouTube();

    const [popup] = await Promise.all([
        context.waitForEvent('page'),
        loginPage.clickGoogleSignIn()
    ]);

    expect(popup).toBeDefined();
    expect(popup.url()).toContain('google.com');
    
    const googlePopupPage = new GooglePopupPage(popup);

    await googlePopupPage.loginToGoogle(
        process.env.GOOGLE_EMAIL!, 
        process.env.GOOGLE_PASSWORD!
    );
    await googlePopupPage.clickContinueButton();


    await googlePopupPage.checkSelectAllCheckbox();
    await googlePopupPage.clickContinueButton();
   
    await expect(page).not.toHaveURL(`${process.env.BASE_URL}/dashboard`);
});