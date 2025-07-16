import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly searchBox: Locator

    constructor(private page: Page) {
        this.searchBox = page.getByTestId('constructor-search-input').describe('Search Box');
    }

    async goto() {
        await this.page.goto('/');
        await this.page.waitForLoadState('load');
    }

    async searchItem(item: string) {
        await this.searchBox.click();
        await this.searchBox.pressSequentially(item);
    }

}