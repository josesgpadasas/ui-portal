import { expect, test } from "@playwright/test";

test.describe("System Design Portal visuals", () => {
  test("overview and page templates", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Overview", level: 2 })).toBeVisible();
    await expect(page).toHaveScreenshot("overview.png", { fullPage: false });

    await page.goto("/#pages");
    await expect(page.getByRole("heading", { name: "Page templates", level: 2 })).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole("tab", { name: /App shell/i })).toBeVisible();
    await expect(page).toHaveScreenshot("page-templates.png", { fullPage: false });
  });
});
