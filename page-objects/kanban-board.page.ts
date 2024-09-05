import { Page, expect, Locator } from "@playwright/test";

export class KanbanBoard {
  private readonly page: Page;

  // Selectors
  private readonly hideSidebarText: Locator;
  private readonly showSidebarButton: Locator;
  private readonly darkModeToggle: Locator;
  public readonly mainBackground: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hideSidebarText = page.getByText("Hide Sidebar");
    this.showSidebarButton = page
      .locator("div.fixed.bottom-8.left-0:has(svg)")
      .first();
    this.darkModeToggle = page.locator("label div");
    this.mainBackground = page.locator('//*[@id="app"]/main/div[1]/div[2]');
  }

  // Methods
  async navigate() {
    await this.page.goto("/");
  }

  async ensureSidebarVisible() {
    if (!(await this.hideSidebarText.isVisible())) {
      await this.showSidebarButton.click();
      await expect(this.hideSidebarText).toBeInViewport();
    }
  }

  async toggleDarkMode() {
    await this.darkModeToggle.click();
    await this.page.waitForTimeout(1000);
  }
}
