import { Page } from '@playwright/test';
import {BasePage} from './BasePage';

export default class LoginPage extends BasePage {
    private readonly googleSignInButton = 'app-google-and-youtube-login';

    constructor(page: Page) {
        super(page);
    }

    async performBasicAuth(username: string, password: string, baseUrl: string): Promise<void> {
        const authUrl = `https://${username}:${password}@${baseUrl.replace('https://', '')}`;
        await this.navigateTo(authUrl);
    }

    async clickGoogleSignIn(): Promise<void> {
        await this.page.click(this.googleSignInButton);
    }
}

// import {BasePage} from './BasePage';
// import { AuthCredentials } from '../types';

// export default class LoginPage extends BasePage {
//   private readonly googleSignInButton: string = 'app-google-and-youtube-login';

//   async performBasicAuth(credentials: AuthCredentials): Promise<void> {
//     const { username, password, baseUrl } = credentials;
//     const authUrl = `https://${username}:${password}@${baseUrl.replace('https://', '')}`;
//     await this.navigateTo(authUrl);
//   }

//   async clickGoogleSignIn(): Promise<void> {
//     await this.waitAndClick(this.googleSignInButton);
//   }
// }