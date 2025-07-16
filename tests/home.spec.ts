import { test, expect } from "../fixtures/fixtures";

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

//Navigation links data
[
    { name: 'Artificial Christmas Trees' },
    { name: 'Wreaths' },
    { name: 'Garlands' },
    { name: 'Greenery & Flowers' },
    { name: 'Seasonal Décor' },
    { name: 'Storage' },
].forEach(({ name }) => {
    test.describe('Navigation tests', () => {
        test(`${name} navigation is displayed`, async ({
            homePage
        }) => {
            //Act
            await test.step('Go to Balsam Hill site', async () => {
                await homePage.goto();
            });
            
            //Assert
            await test.step(`Verify if the ${name} navigation is displayed`, async () => {
                const navigationLinks = await homePage.getNavigationLinks();
                expect(navigationLinks).toContain(name.toLocaleUpperCase());
            });
        });
    });
});