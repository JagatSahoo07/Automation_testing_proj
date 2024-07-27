import { test, expect } from "@playwright/test";

test("Search Phone", async ({ page }) => {
  //Visit the amazon page
  await page.goto("https://amazon.in");

  //expect a title of the page
  await expect(page).toHaveTitle(
    "Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in"
  );

  //Search a product
  await page.locator('input[type="text"]').fill("motorola edge 40");
  await page.locator('input[type="submit"]').click();

  //Select the product
  await page
    .locator(
      "//span[text()='Motorola Edge 40 Neo (Soothing Sea, 128 GB) (8 GB RAM)']"
    )
    .click();

  await page.waitForTimeout(5000);
});
