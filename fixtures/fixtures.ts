import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { ProductSuggestionsPage } from '../pages/product-suggestions-page';
import { ProductSelectionPage } from '../pages/product-selection-page';
import { CartPage } from '../pages/cart-page';

type Fixtures = {
  homePage: HomePage;
  productSuggestionsPage: ProductSuggestionsPage;
  productSelectionPage: ProductSelectionPage;
  cartPage: CartPage;
};

// Extend base test by providing page objects
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<Fixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    productSuggestionsPage: async ({ page }, use) => {
        await use(new ProductSuggestionsPage(page));
    },
    productSelectionPage: async ({ page }, use) => {
        await use(new ProductSelectionPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
});

export { expect } from '@playwright/test';
