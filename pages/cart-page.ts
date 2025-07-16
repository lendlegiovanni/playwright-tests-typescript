import { Locator, Page } from "@playwright/test";

export class CartPage {
    readonly itemDetailsList: Locator;
    readonly secureCheckoutButton: Locator;

    constructor(private page: Page) {
        this.itemDetailsList = page.locator('//div[contains(@class,"cartProductDetailItem_full_product_info")]').describe('Item Details List');
        this.secureCheckoutButton = page.getByTestId('secureCheckoutButton').describe('Secure Checkout Button');
    }

    async removeProductFromCart(productName: string) {
        const removeButton = this.itemDetailsList.filter({ hasText: productName })
            .getByTestId('cc-btn-remove-0');
        await removeButton.click();
    }

    async getItems() : Promise<Array<string>> {
        await this.itemDetailsList.first().click({ trial: true });
        return await this.itemDetailsList.allInnerTexts();
    }
}