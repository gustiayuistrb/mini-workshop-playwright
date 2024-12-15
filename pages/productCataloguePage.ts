import { expect, Locator, Page } from "@playwright/test";

export class ProductCatalogPage {
  // Define locators
  searchBox: Locator;
  searchButton: Locator;
  productList: Locator;
  relatedSearchTerms: Locator;

  constructor(page: Page) {
    // Initialize locators
    this.searchBox = page.getByPlaceholder("Search entire store here...");
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.productList = page.locator("//li[@class='item product product-item']");
    this.relatedSearchTerms = page.getByText("Related search terms");
  }

  // Method to perform search
  async searchForProduct(keyword: string) {
    await this.searchBox.click();
    await this.searchBox.fill(keyword);
    await this.searchButton.click();
  }

  // Method to verify related search terms
  async verifyRelatedSearchTerms(keyword: string) {
    await expect(this.relatedSearchTerms).toHaveText(`Related search terms ${keyword},`);
  }

  // Method to get the product catalogue list
  async getProductCatalogue() {
    return await this.productList.all();
  }

  // Method to assert the presence of products in the catalogue
  async assertProductsDisplayed() {
    const productCatalogue = await this.getProductCatalogue();
    expect(productCatalogue.length).toBeGreaterThan(0);
    console.log("Number of products listed:", productCatalogue.length);
  }
}
