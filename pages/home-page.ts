import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly searchBox: Locator
    readonly navigationLink: Locator

    constructor(private page: Page) {
        this.searchBox = page.getByTestId('constructor-search-input').describe('Search Box');
        this.navigationLink = page.locator('.nav-item').describe('Navigation Link');
    }

    async goto() {
        await this.page.goto('/');
        await this.page.waitForLoadState('load');
    }

    async searchItem(item: string) {
        await this.searchBox.click();
        await this.searchBox.pressSequentially(item);
    }

    async getNavigationLinks() : Promise<Array<string>> {
        return await this.navigationLink.allInnerTexts();
    }

}