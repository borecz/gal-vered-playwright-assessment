import { test, expect } from "fixtures/base-fixtures";

test.describe("Kanban Board", () => {
  test.beforeEach(async ({ page }) => {
    test.step("1 - Navigate to the Kanban app", async () => {
      await page.goto("/");
    });
  });

  test("Edit a Kanban Card", async ({ page }) => {
    test.step("2 - Choose a card with subtasks that are not completed and that is not in the first column", async () => {
      // implement
    });

    test.step("3 - Complete one subtask", async () => {
      // implement
    });

    test.step("4 - Move task to the first column", async () => {
      // implement
    });

    test.step("5 - Verify that the subtask is striked through", async () => {
      // implement
    });

    test.step("6 - Verify that the card is in the first column", async () => {
      // implement
    });

    test.step("7 - Close the card edit page", async () => {
      // implement
    });

    test.step("8 - Verify that the number of completed subtasks is correct", async () => {
      // implement
    });

    test.step("9 - Verify that the card moved to the correct column", async () => {
      // implement
    });
  });

  test("Delete a Kanban card", async ({ page }) => {
    test.step("2 - Delete a Kanban card", async () => {
      // implement
    });

    test.step("3 - Verify that the card is no longer present", async () => {
      // implement
    });

    test.step("4 - Verify that the number of cards in the relevant column is updated", async () => {
      // implement
    });
  });

  test("Toggle dark mode", async ({ page }) => {
    test.step("2 - Toggle dark mode", async () => {
      // implement
    });

    test.step("3 - Verify that the dark mode has changed", async () => {
      // implement
    });
  });
});
