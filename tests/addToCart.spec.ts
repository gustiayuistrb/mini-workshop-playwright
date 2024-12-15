import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/cartPage";


test("Add a product to cart", async ({ page }) => {
  const cartPage = new CartPage(page); 

  await page.goto("https://magento.softwaretestingboard.com/push-it-messenger-bag.html");
  await page.waitForTimeout(2000); 
  await cartPage.addToCart(1); 

  const successMessage = await cartPage.verifySuccessMessage(); 
  expect(successMessage).toContain("You added");
});
