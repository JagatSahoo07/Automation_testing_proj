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

  //Select the product
  await page
    .locator(
      "//span[text()='Motorola Edge 40 Neo (Soothing Sea, 128 GB) (8 GB RAM)']"
    )
    .click();

  // Capture product details
  const productDetails = await page.evaluate(() => {
    const firstProduct = document.querySelector(".s-main-slot .s-result-item");
    console.log(firstProduct);

    // const productName = firstProduct.querySelector("h2 a span").innerText;
    // const productPrice = firstProduct.querySelector(".a-price-whole")
    //   ? firstProduct.querySelector(".a-price-whole").innerText
    //   : "Price not available";
    // const productLink = firstProduct.querySelector("h2 a").href;
    // return { productName, productPrice, productLink };
  });
  console.log("Amazon Product Details:", productDetails);
  await page.waitForTimeout(5000);
}
