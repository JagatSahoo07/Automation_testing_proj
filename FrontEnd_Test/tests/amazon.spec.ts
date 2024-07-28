import { test, chromium, expect } from "@playwright/test";

export async function amazon() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://amazon.in");

  //expect a title of the page
  await expect(page).toHaveTitle(
    "Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in"
  );

  //Search a product
  await page.locator('input[type="text"]').fill("motorola edge 40 neo");
  await page.locator('input[type="submit"]').click();

  // Wait for the results page to load and display the results
  await page.waitForSelector(".s-main-slot");

  //Select the product
  await page
    .locator(
      "//span[text()='Motorola Edge 40 Neo (Soothing Sea, 128 GB) (8 GB RAM)']"
    )
    .click();

  // // Wait for the product page to load
  // await page.waitForSelector(".centerColAlign", { timeout: 10000 });

  // Get the text content of the productTitle span element
  // const productTitleText = await page.textContent('//span[@id="productTitle"]');
  // console.log("Product Title:", productTitleText.trim()); // Trim to remove any extra whitespace

  // Capture product details

  // const productDetails = await page.evaluate(() => {
  const Product = await page.locator("span#productTitle");
  const firstProduct = Product.allInnerTexts();
  console.log(firstProduct);

  // });
  // console.log("Amazon Product Details:", productDetails);
  await page.waitForTimeout(5000);
}
