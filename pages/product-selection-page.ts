import { Locator, Page } from "@playwright/test";
import { ProductCustomization } from "../test-helpers/test-models";

export class ProductSelectionPage {
    readonly addToCartButton: Locator;
    readonly viewToCartButton: Locator;
    readonly heightList: Locator;

    constructor(private page: Page) {
        this.addToCartButton = page.getByTestId('pdc-btn-addtocart').nth(0).describe('Add to Cart Button');
        this.viewToCartButton = page.getByTestId('pdc-add-to-cart-modal-btn-viewcart').describe('View Cart Button');
        this.heightList = page.locator('//span[contains(@data-testid,"pdgf-div-Height-")]').describe('Height Options')
    }

    async selectHeight(height: string) {
        await this.page.getByRole('radio', { name: height }).describe(`Height ${height}`).click();
    }

    async getAvailableHeights() : Promise<Array<string>> {
        return this.heightList.allInnerTexts();
    }

    async addToCart() {
        await this.addToCartButton.scrollIntoViewIfNeeded();
        await this.addToCartButton.click();
    }

    async viewCart() {
        await this.viewToCartButton.click();
    }
}