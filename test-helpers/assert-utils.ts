import { expect, Page } from "@playwright/test";

export async function verifyIfMessageIsDisplayed(page: Page, expectedText: string) {
  await expect(page.getByText(expectedText)).toBeVisible();
}