import { Locator, Page } from "@playwright/test";

export class ProductSuggestionsPage {
    readonly productList: Locator

    constructor(private page: Page) {
        this.productList = page.locator('//div[@data-cnstrc-item-section="Products"]').describe('Product suggestions list');
    }

    async selectProductByPosition(position: number) : Promise<string> {
        await this.productList.first().click({ trial: true });
        const productListCount = await this.productList.count();
        if (productListCount < position || position <= 0) {
            throw new Error(`Product at position ${position} does not exist in suggestions.`); 
        }
        const product = await this.productList.nth(position - 1);
        product.click();

        const text = await product.textContent();
        return text === null ? '' : text;
    }

    async selectProductByName(productName: string) {
        const product = await this.productList.filter({ hasText: productName });
        if (await product.count() > 0) {
            await product.first().click();
            await this.page.waitForLoadState('load');
        } else {
            throw new Error(`Product with name "${productName}" not found in suggestions.`);
        }
    }
}