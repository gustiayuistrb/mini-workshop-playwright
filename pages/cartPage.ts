import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  // Define locators
  quantityInput: Locator;
  addToCartButton: Locator;
  successMessage: Locator;

  constructor(page: Page) {
    this.addToCartButton = page.locator("#product-addtocart-button");
    this.quantityInput = page.locator("input[name='qty']");
    this.successMessage = page.locator("div.message-success");
  }

  async addToCart(quantity: number) {
    await this.quantityInput.fill(quantity.toString()); 
    await this.addToCartButton.click(); 
  }

  // Method to verify the success message
  async verifySuccessMessage(): Promise<string> {
    await this.successMessage.waitFor();  
    const messageText = await this.successMessage.textContent();  
    return messageText || '';
  }
}
