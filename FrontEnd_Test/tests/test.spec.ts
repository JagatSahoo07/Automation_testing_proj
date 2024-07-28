import { test } from "@playwright/test";
import { amazon } from "./amazon.spec";
import { flipkart } from "./flipkart.spec";

test("Search Phone", async ({ page }) => {
  test.setTimeout(60 * 1000);
  await amazon();
  //await flipkart();
});
