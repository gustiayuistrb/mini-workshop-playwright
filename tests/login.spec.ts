import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { LoginPage } from "../pages/loginPage";

test.describe("Create Account & Login Test Case", () => {
  let firstName = faker.person.firstName();
  let lastName = faker.person.lastName();

  let email = faker.internet.email({
    firstName: firstName,
    lastName: lastName,
  });
  let password = faker.internet.password();

  test("User is able to create an account", async ({ page }) => {
    console.log("Email:", email);
    console.log("Password:", password);

    const loginPage = new LoginPage(page);

    await page.goto("https://magento.softwaretestingboard.com/");
    await loginPage.createAccount(firstName, lastName, email, password);
    await loginPage.verifyAccountCreation(firstName, lastName, email);
  });
  test("User is able to login", async ({ page }) => {
    console.log("Email:", email);
    console.log("Password:", password);

    const loginPage = new LoginPage(page);

    await page.goto("https://magento.softwaretestingboard.com/");
    await loginPage.createAccount(firstName, lastName, email, password);
    await loginPage.verifyAccountCreation(firstName, lastName, email);

    await loginPage.signIn(email, password);
    await loginPage.verifySignIn(firstName, lastName, email);
  });
});
