import { Page } from "@playwright/test";

export class KanbanBoard {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto("/");
  }
}
