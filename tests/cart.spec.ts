import { test, expect } from "../fixtures/fixtures";
import { verifyIfMessageIsDisplayed } from "../test-helpers/assert-utils";

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status != 'passed') {
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', {
        body: screenshot,
        contentType: 'image/png',
        });
    }
    page.close();
});

test.describe('Add to Cart tests', () => {
    test('User can successfully add a product to the cart', async ({
        homePage,
        productSuggestionsPage,
        productSelectionPage,
        cartPage
    }) => {
        // Arrange
        let product = '';
        let height = '';
        await test.step('Search for "Christmas Tree" using the search bar', async () => {
            await homePage.goto();
            await homePage.searchItem('Christmas Tree');
        });
        await test.step('Select the third product suggestion', async () => {
            product = await productSuggestionsPage.selectProductByPosition(3);
        });

        // Act
        await test.step('Customize product then add to cart', async () => {
            const heights = await productSelectionPage.getAvailableHeights();
            if (heights.length > 0) {
                height = heights[0];
                await productSelectionPage.selectHeight(height);
            }
            await productSelectionPage.addToCart();
        });
        
        // Assert
        await test.step('Verify if the product details displayed are correct', async () => {
            await productSelectionPage.viewCart();
            const productInfo = product.split("$");
            const productName = productInfo[0];
            const productPrice = productInfo[1];
            const itemDetailsList = await cartPage.getItems();
            expect(itemDetailsList[0]).toContain(productName);
            expect(itemDetailsList[0]).toContain(`$${productPrice}`);
        });
    });

    test('User can successfully remove a product from the cart', async ({
        homePage,
        productSuggestionsPage,
        productSelectionPage,
        cartPage,
        page
    }) => {
        // Arrange
        let product = '';
        let productName = '';
        await test.step('Search for "Christmas Tree" using the search bar', async () => {
            await homePage.goto();
            await homePage.searchItem('Christmas Tree');
        });
        await test.step('Select the third product suggestion and add to cart', async () => {
            product = await productSuggestionsPage.selectProductByPosition(3);
            await productSelectionPage.addToCart();
        });

        // Act
        await test.step('Remove product from the cart', async () => {
            await productSelectionPage.viewCart();
            const productInfo = product.split("$");
            productName = productInfo[0];
            await cartPage.removeProductFromCart(productName);
        });
        
        // Assert
        await test.step('Verify if "<Item> has been removed" message is displayed', async () => {
            await verifyIfMessageIsDisplayed(page, `${productName} has been removed.`);
            //await expect(page.getByText(`${productName} has been removed.`)).toBeVisible();
        });
    });
});