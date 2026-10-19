import { expect, test } from "@playwright/test";

test("loads overview and deep link to components", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Overview", level: 2 })).toBeVisible();
  await page.goto("/#components");
  await expect(page.getByRole("heading", { name: "Components", level: 2 })).toBeVisible({ timeout: 15_000 });
});
