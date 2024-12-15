import { test, expect } from "@playwright/test";
import { ProductReviewPage } from "../pages/productReviewPage";  // Assuming ProductPage.ts is in the same directory

test.describe("Product Review Tests", () => {
  test('Submit a review by filling in all input fields', async ({ page }) => {
    const productPage = new ProductReviewPage(page);
    await page.goto("https://magento.softwaretestingboard.com/push-it-messenger-bag.html");
    
    await productPage.goToAddReview();
    await page.waitForTimeout(2000);
    await productPage.submitReview('Ayu', 'Great Product!', 'I really liked this product.', 5);

    const successMessage = await productPage.verifySuccessMessage();
    expect(successMessage).toContain("You submitted your review");
  });
});
