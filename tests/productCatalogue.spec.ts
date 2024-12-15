import { test, expect } from "@playwright/test";
import { ProductCatalogPage } from "../pages/productCataloguePage";

test.describe("Product Catalogue Test Case", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://magento.softwaretestingboard.com");
    await expect(page.getByLabel("store logo")).toBeVisible();
  });

  test("User is able to see the product catalog when searching with a specific keyword without logging in", async ({ page }) => {
    const productCatalogPage = new ProductCatalogPage(page);
    const searchKeyword = "jacket";
    await productCatalogPage.searchForProduct(searchKeyword);
    await productCatalogPage.verifyRelatedSearchTerms(searchKeyword);
    await productCatalogPage.assertProductsDisplayed();
  });
});


