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
    await test.step("2 - Select a random card from the board", async () => {
      // implement
    });

    await test.step("3 - Delete a Kanban card", async () => {
      // implement
    });

    await test.step("3 - Verify that the card is no longer present", async () => {
      // implement
    });

    await test.step("4 - Verify that the number of cards in the relevant column is updated", async () => {
      // implement
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
