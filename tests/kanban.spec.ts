import { test, expect } from "fixtures/base-fixtures";
import { getBackgroundColor } from "helpers/misc";

test.describe("Kanban Board", () => {
  test.beforeEach(async ({ page }) => {
    await test.step("1a - Navigate to the Kanban app", async () => {
      await page.goto("/");
    });

    await test.step("1b - Ensure a board exists", async () => {
      await expect(
        page.getByText(/ALL BOARDS \(\d+\)/),
        "No boards found"
      ).toBeVisible();
    });
  });

  test.skip("Edit a Kanban Card", async ({ page, kanbanBoard }) => {
    await test.step("2 - Choose a card with subtasks that are not completed and that is not in the first column", async () => {
      // implement
    });

    await test.step("3 - Complete one subtask", async () => {
      // implement
    });

    await test.step("4 - Move task to the first column", async () => {
      // implement
    });

    await test.step("5 - Verify that the subtask is striked through", async () => {
      // implement
    });

    await test.step("6 - Verify that the card is in the first column", async () => {
      // implement
    });

    await test.step("7 - Close the card edit page", async () => {
      // implement
    });

    await test.step("8 - Verify that the number of completed subtasks is correct", async () => {
      // implement
    });

    await test.step("9 - Verify that the card moved to the correct column", async () => {
      // implement
    });
  });

  test("Delete a Kanban card", async ({ page, kanbanBoard }) => {
    const targetColumnIndex = 0;
    let initialCount: number;

    await test.step("2 - Get current number of cards in the column", async () => {
      await expect(async () => {
        await page.reload();
        initialCount = await kanbanBoard.getColumnTaskCount(targetColumnIndex);
        console.log("Initial count:", initialCount);
        expect(initialCount).toBeGreaterThan(0);
      }).toPass({ timeout: 5000 });
    });

    const cardTitle =
      await test.step("3 - Select a random card from the board", async () => {
        const title = await kanbanBoard.getRandomCardTitle(targetColumnIndex);
        console.log("Selected card title:", title);
        await expect(
          page.locator(`section article h3:has-text("${title}")`),
          "Card not found"
        ).toBeVisible();
        return title;
      });

    await test.step("4 - Delete a Kanban card", async () => {
      await kanbanBoard.deleteCard();
    });

    await test.step("5 - Verify that the card is no longer present", async () => {
      await expect(async () => {
        const isVisible = await kanbanBoard.isCardVisible(cardTitle);
        expect(isVisible).toBe(false);
      }).toPass({ timeout: 5000 });
    });

    await test.step("6 - Verify that the number of cards in the relevant column is updated", async () => {
      const updatedCount = await kanbanBoard.getColumnTaskCount(
        targetColumnIndex
      );
      expect(updatedCount).toBe(initialCount - 1);
    });
  });

  test("Toggle dark mode", async ({ page, kanbanBoard }) => {
    const initialBackgroundColor =
      await test.step("2 - Ensure sidebar is visible and that light mode is enabled", async () => {
        await kanbanBoard.ensureSidebarVisible();
        const initialBackgroundColor = await getBackgroundColor(
          page,
          kanbanBoard.mainBackground
        );
        expect(initialBackgroundColor).toBe("rgb(244, 247, 253)");
        console.log("Initial background color:", initialBackgroundColor);
        return initialBackgroundColor;
      });

    await test.step("3 - Toggle dark mode and assert the background color changes", async () => {
      // Click the dark mode toggle
      await kanbanBoard.toggleDarkMode();
      await expect(async () => {
        const currentBackgroundColor = await getBackgroundColor(
          page,
          kanbanBoard.mainBackground
        );
        expect(currentBackgroundColor).not.toBe(initialBackgroundColor);
      }).toPass({ timeout: 5000 });
    });
  });
});
