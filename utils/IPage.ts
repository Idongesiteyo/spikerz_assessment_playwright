export interface IPage {
    navigateTo(url: string): Promise<void>;
    // waitAndClick(locator: string): Promise<void>;
}