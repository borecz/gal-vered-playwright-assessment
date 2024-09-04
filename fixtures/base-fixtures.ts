import { test as base } from "@playwright/test";
import { KanbanBoard } from "page-objects/kanban-board.page";

// Extend basic test by providing a "todoPage" fixture.
export const test = base.extend<{ kanbanBoard: KanbanBoard }>({
  kanbanBoard: async ({ page }, use) => {
    const kanbanBoard = new KanbanBoard(page);
    await use(kanbanBoard);
  },
});

export { expect } from "@playwright/test";
