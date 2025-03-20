import { Page, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class GooglePopupPage extends BasePage {
    private readonly continueButton = 'button:has-text("Continue")';
    private readonly selectAllCheckbox = 'role=checkbox[name="Select all"]';
    private readonly emailInput = 'input[type="email"]';
    private readonly passwordInput = 'input[type="password"]';
    private readonly nextButton = 'button:has-text("Next")';
    private readonly spikerzAccessText = 'Spikerz already has some access'; 
    private readonly bakeryShopText = 'dina_bakery_shop';
    private readonly emailErrorMessage = 'Couldn’t find your Google Account';
    private readonly cancelButton = 'button:has-text("Cancel")';
    private readonly confirmationHeader = 'h5';
    private readonly bakeryCard = 'nz-card';

    constructor(page: Page) {
        super(page);
    }

    async loginToGoogle(email: string, password: string): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.emailInput).fill(email);
        await expect(this.page.locator(this.emailInput)).toHaveValue(email);
        await this.page.locator(this.nextButton).click();
        await this.page.locator(this.passwordInput).fill(password);
        await expect(this.page.locator(this.passwordInput)).toHaveValue(password);
        console.log('Clicked the "Next" button after entering password.');
        
        await this.page.locator(this.nextButton).click();
    }

    async invalidloginToGoogle(email: string, password: string): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.emailInput).fill(email);
        await this.page.locator(this.nextButton).click();
        const errorMessage = await this.page.getByText(this.emailErrorMessage);
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Couldn’t find your Google Account');
    }
    
    
    async handleCheckboxAndContinue(): Promise<void> {
        try {
            if (!this.page.isClosed()) {
                
                await this.page.locator(this.selectAllCheckbox).waitFor({ state: 'visible', timeout: 60000 });
                await this.page.locator(this.selectAllCheckbox).check();
                await expect(this.page.locator(this.selectAllCheckbox)).toBeChecked();
                await this.page.locator(this.continueButton).click();
                console.log('Checked "Select All" and clicked "Continue".');
            } else {
                throw new Error('Page is already closed. Cannot proceed.');
            }
        } catch (error) {
            console.warn('Select All checkbox not visible, checking other conditions.');
    
            
            if (!this.page.isClosed()) {
                const isSpikerzAccessTextVisible = await this.page.locator('text=Spikerz already has some').isVisible();
                if (isSpikerzAccessTextVisible) {
                    console.log('"Spikerz already has some" text is visible.');
    
                    const isContinueButtonEnabled = await this.page.locator(this.continueButton).isEnabled();
                    if (isContinueButtonEnabled) {
                        await this.page.locator(this.continueButton).click();
                        console.log('Clicked "Continue" on permission screen.');
                    } else {
                        throw new Error('Continue button is not enabled.');
                    }
                } else {
                    throw new Error('Neither checkbox nor "Spikerz already has some" text is visible. Cannot proceed.');
                }
            } else {
                throw new Error('Page is closed, cannot verify visibility.');
            }
        }
    }
    
    

    async clickContinueButton(): Promise<void> {
        await this.page.locator(this.continueButton).waitFor({ state: 'visible' });
        await this.page.locator(this.continueButton).click();
    }

    async checkSelectAllCheckbox(): Promise<void> {
        await this.page.locator(this.selectAllCheckbox).waitFor({ state: 'visible' });
        await this.page.locator(this.selectAllCheckbox).check();
        await expect(this.page.locator(this.selectAllCheckbox)).toBeChecked();
    }

    async clickCancelButton(): Promise<void> {
        await this.page.locator(this.cancelButton).waitFor({ state: 'visible' });
        await this.page.locator(this.cancelButton).click();
        console.log('Clicked the "Cancel" button.');
    }

    async verifyBakeryShopVisible(): Promise<void> {
        await expect(this.page.locator(this.bakeryCard)).toContainText(this.bakeryShopText);
        await expect(this.page.getByText(this.bakeryShopText)).toBeVisible();
    }

    async verifyUrl(): Promise<void> {
        await this.page.waitForURL(`${process.env.BASE_URL}/social-connect/youtube`, { timeout: 15000 });
        const currentUrl = this.page.url();
        expect(currentUrl).toContain('social-connect');
    }
}