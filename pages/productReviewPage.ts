import { expect, Locator, Page } from "@playwright/test";

export class ProductReviewPage {
  // Locators for elements related to reviews
  reviewsTab: Locator;
  reviewsButton: Locator;
  addReviewButton: Locator;
  nicknameField: Locator;
  summaryField: Locator;
  reviewField: Locator;
  reviewHeader: Locator;
  submitReviewButton: Locator;
  successMessage: Locator;


  constructor(page: Page) {
    // Locate elements related to reviews
    this.reviewsTab = page.locator('a[href="#reviews"]');
    this.reviewHeader = page.locator('span:has-text("You\'re reviewing:")');
    this.reviewsButton = page.locator('button', { hasText: 'Reviews' });
    this.addReviewButton = page.locator('a.action.add');

    // Form fields for review submission
    this.nicknameField = page.locator('input[name="nickname"]');
    this.summaryField = page.locator('input[name="summary"]');
    this.reviewField = page.locator('textarea[name="review"]');
    this.submitReviewButton = page.locator('button', { hasText: 'Submit Review' });

    this.successMessage = page.locator('.success-message'); 
  }

  // Methods for interacting with the page
  async goToReviewsTab() {
    await this.reviewsTab.click(); // Click the "Reviews" tab
  }

  async goToAddReview() {
    await this.addReviewButton.click(); // Click "Add Your Review" button
  }

  // Select the rating dynamically
  async selectRating(rating: number) {
    if (rating < 1 || rating > 5) {
      throw new Error('Please select one of the ratings between 1 and 5.');
    }
    // Dynamically locate and click the rating input based on the rating number
    const ratingInput = this.reviewHeader.locator(`#Rating_${rating}`);
    await ratingInput.click();
  }

  // Submit the review with nickname, summary, review, and rating
  async submitReview(nickname: string, summary: string, review: string, rating: number) {
    // Fill in the fields
    await this.nicknameField.fill(nickname);
    await this.summaryField.fill(summary);
    await this.reviewField.fill(review);

    // Select the rating if it's provided
    if (rating) {
      await this.selectRating(rating);
    }

    // Click the submit button
    await this.submitReviewButton.click();
  }

  async verifySuccessMessage() {
    await this.successMessage.waitFor({ state: 'visible' });
    return await this.successMessage.textContent();
  }
}