import { test, chromium, expect } from "@playwright/test";

var productTitleText;
var productPriceText;
var productUrl;

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

  //wait before new page loads
  const pagePromise = context.waitForEvent("page");

  //Select the product
  await page
    .locator(
      "//span[text()='Motorola Edge 40 Neo (Soothing Sea, 128 GB) (8 GB RAM)']"
    )
    .click();

  //handle new tab in the window
  const newPage = await pagePromise;

  // Wait for the product page to load
  await newPage.waitForSelector("//input[@id='buy-now-button']");

  // Get the text content of the productTitle span element
  productTitleText = await newPage.textContent(
    '//span[@id="productTitle"]'
  );

  productPriceText = await newPage.textContent(
    '//*[@id="corePriceDisplay_desktop_feature_div"]/div[1]/span[3]/span[2]/span[2]'
  );

  productUrl = await newPage.url()

  console.log(productTitleText?.trim(), productPriceText, productUrl);
  
  await browser.close();
}
