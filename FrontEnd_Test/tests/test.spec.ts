import { test } from "@playwright/test";
import { amazon } from "./amazon.spec";
import { flipkart } from "./flipkart.spec";

test("Search Phone", async ({ page }) => {
  await amazon();
  //await flipkart();
});
