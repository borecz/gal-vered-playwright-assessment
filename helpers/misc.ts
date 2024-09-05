import { Page, expect, Locator } from "@playwright/test";

export async function getBackgroundColor(page: Page, locator: Locator) {
  return locator.evaluate((el) => window.getComputedStyle(el).backgroundColor);
}
