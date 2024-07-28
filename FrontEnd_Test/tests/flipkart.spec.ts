import { chromium, expect } from "@playwright/test";

//declaring variable
var fkt_productTitleText;
var fkt_productPriceText;
var fkt_productUrl;

export async function flipkart() {
  //create broswer
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://flipkart.com");

  //expect a title of the page
  await expect(page).toHaveTitle(
    "Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!"
  );

  //Search a product
  await page
    .locator("//input[@placeholder='Search for Products, Brands and More']")
    .fill("motorola edge 40 neo");
  await page.locator("//button[@type='submit']").click();

  // Wait for the results page to load and display the results
  await page.waitForSelector("//div[@class='DOjaWF YJG4Cf']");

  //wait before new page loads
  const pagePromise = context.waitForEvent("page");

  //Select the product
  await page.getByText("Motorola Edge 40 Neo (Soothing Sea, 128 GB)").click();

  //handle new tab in the window
  const newPage = await pagePromise;

  // Wait for the product page to load
  await newPage.waitForSelector("//button[normalize-space()='Buy Now']");

  // Get product text content
  fkt_productTitleText = await newPage.textContent("//span[@class='VU-ZEz']");

  //Get product price
  fkt_productPriceText = await newPage.textContent(
    '//*[@id="container"]/div/div[3]/div[1]/div[2]/div[2]/div/div[4]/div[1]/div/div[1]'
  );

  //Get product Url
  fkt_productUrl = await newPage.url();

  console.log(
    fkt_productTitleText?.trim(),
    fkt_productPriceText,
    fkt_productUrl
  );

  //Navigate to add to cart
  await newPage
    .locator(
      ""
    )
    .dblclick();

  await newPage.waitForTimeout(5000);
  //Navigate to buy now
  //   await newPage.getByText("Place Order").dblclick();

  //Navigate to payment
  //For this process I need to sign in to my account, but as I cant share my personal details here I am skipping this step as it is just a click away.

  await browser.close();
}
