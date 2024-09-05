import { Page, expect, Locator } from "@playwright/test";

export class KanbanBoard {
  private readonly page: Page;

  // Selectors
  private readonly hideSidebarText: Locator;
  private readonly showSidebarButton: Locator;
  private readonly darkModeToggle: Locator;
  public readonly mainBackground: Locator;
  private readonly columnHeaders: Locator;
  private readonly cardElements: Locator;
  private readonly deleteTaskButton: Locator;
  private readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hideSidebarText = page.getByText("Hide Sidebar");
    this.showSidebarButton = page
      .locator("div.fixed.bottom-8.left-0:has(svg)")
      .first();
    this.darkModeToggle = page.locator("label div");
    this.mainBackground = page.locator('//*[@id="app"]/main/div[1]/div[2]');
    this.columnHeaders = page.locator("section h2");
    this.cardElements = page.locator("section article");
    this.deleteTaskButton = page.getByText("Delete Task");
    this.confirmDeleteButton = page.getByRole("button", {
      name: "Delete",
      exact: true,
    });
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

  async getColumnTaskCount(columnIndex: number): Promise<number> {
    const headerText = await this.columnHeaders.nth(columnIndex).innerText();
    const match = headerText.match(/\( (\d+) \)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async getRandomCardTitle(columnIndex: number): Promise<string> {
    const count = await this.getColumnTaskCount(columnIndex);
    const randomIndex = Math.floor(Math.random() * count);
    const cardElement = this.cardElements.nth(randomIndex);
    const cardTitle = await cardElement.locator("h3").innerText();
    await cardElement.click();
    return cardTitle;
  }

  async deleteCard() {
    await this.page
      .locator('h4 + [class="group cursor-pointer relative"]')
      .click();
    await this.deleteTaskButton.click();
    await this.confirmDeleteButton.click();
  }

  async isCardVisible(cardTitle: string): Promise<boolean> {
    // Use a more specific selector to avoid ambiguity
    return await this.page
      .locator(`section article h3:has-text("${cardTitle}")`)
      .isVisible();
  }
}
