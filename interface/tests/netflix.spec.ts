import { expect, test } from '@playwright/test';
import {
  ALAI_BASE_URL,
  ALAI_LOGIN_URL,
} from './fixtures/url';


// run tests in headful mode so you can see the browser
test.use({ headless: false, slowMo: 1000 });
test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }) => {
  // go to Netflix.com
  await page.goto(NETFLIX_BASE_URL);
});

test.describe("Netflix Tests", () => {
  test("my first test", async ({ page }) => {
    // assert page title appears
    await expect(getByTestId(page, 'nmhp-card-hero-text-title')).toHaveText(
      "Unlimited movies, TV shows, and more."
    );
  });

  test("Netflix Login - Check Login Input Errors and SHOW/HIDE Password", async ({ page }) => {
    // navigate to the login page
    await getByTestId(page, 'header-login-link').click();

    // after the url is correct, assert page title appears
    await page.waitForURL(NETFLIX_LOGIN_URL);
    await expect(getByTestId(page, 'login-page-title')).toHaveText("Sign In");

    // assert Remember Me checkbox is checked
    await expect(getByTestId(page, 'rememberMe')).toBeChecked();

    await test.step("Check Login Input Errors", async () => {
      // select email field, select password field, and click reCaptcha Learn more link button
      await getByTestId(page, 'login-field').focus();
      await getByTestId(page, 'password-field').focus();
      await getByTestId(page, 'recaptcha-learn-more-button').click();

      // assert email and password input error messages display
      // assert reCaptcha disclosure message displays
      await expect(getByTestId(page, 'login-field+error')).toBeVisible();
      await expect(getByTestId(page, 'login-field+error')).toHaveText(EMAIL_INPUT_ERROR_MSG);
      await expect(getByTestId(page, 'password-field+error')).toBeVisible();
      await expect(getByTestId(page, 'password-field+error')).toHaveText(PASSWORD_INPUT_ERROR_MSG);
      await expect(getByTestId(page, 'recaptcha-disclosure')).toBeVisible();
      await expect(getByTestId(page, 'recaptcha-disclosure')).toContainText(RECAPTCHA_DISCLOSURE_TEXT);
    });

    // assert email and password fields are blank
    await expect(getByTestId(page, 'login-field')).toBeEmpty();
    await expect(getByTestId(page, 'password-field')).toBeEmpty();

    // fill in valid email and invalid password
    await getByTestId(page, 'login-field').fill(TestUser.TestEmail);
    await getByTestId(page, 'password-field').fill(TestUser.InvalidPassword);

    // assert password field type is password
    await expect(getByTestId(page, 'password-field')).toHaveAttribute('type', 'password');

    // click SHOW (password) and assert that password field type is text
    await expect(getByTestId(page, 'password-visibility-toggle')).toBeVisible();
    await getByTestId(page, 'password-visibility-toggle').click();
    await expect(getByTestId(page, 'password-field')).toHaveAttribute('type', 'text');

    // click HIDE (password) and assert that password field type is password
    await getByTestId(page, 'password-visibility-toggle').click();
    await expect(getByTestId(page, 'password-field')).toHaveAttribute('type', 'password');

    // assert email and password input error messages are not displayed
    await expect(getByTestId(page, 'login-field+error')).toBeHidden();
    await expect(getByTestId(page, 'password-field+error')).toBeHidden();
  });

  test("Netflix Login - Invalid Password ", async ({ page }) => {
    // navigate to the login page
    await getByTestId(page, 'header-login-link').click();

    // after the url is correct, assert page title appears
    await page.waitForURL(NETFLIX_LOGIN_URL);
    await expect(getByTestId(page, 'login-page-title')).toHaveText("Sign In");

    // assert email and password fields are blank
    await expect(getByTestId(page, 'login-field')).toBeEmpty();
    await expect(getByTestId(page, 'password-field')).toBeEmpty();

    // fill in invalid email and invalid password, and click Sign In
    await getByTestId(page, 'login-field').fill(TestUser.Test
      import { expect, test } from '@playwright/test';
      import { getByTestId, loginUser } from '../support/login';
      import {
        NETFLIX_BASE_URL,
        NETFLIX_LOGIN_URL,
      } from '../fixtures/url';
      import {
        TestUser,
        EMAIL_INPUT_ERROR_MSG,
        PASSWORD_INPUT_ERROR_MSG,
        INVALID_PASSWORD_TEXT,
        INVALID_EMAIL_TEXT,
        INVALID_PHONE_NUMBER_MSG,
        RECAPTCHA_DISCLOSURE_TEXT,
      } from '../fixtures/login';
      
      // run tests in headful mode so you can see the browser
      test.use({ headless: false, slowMo: 1000 });
      test.describe.configure({ mode: 'parallel' });
      
      test.beforeEach(async ({ page }) => {
        // go to Netflix.com
        await page.goto(NETFLIX_BASE_URL);
      });
      
      test.describe("Netflix Tests", () => {
        test("my first test", async ({ page }) => {
          // assert page title appears
          await expect(getByTestId(page, 'nmhp-card-hero-text-title')).toHaveText(
            "Unlimited movies, TV shows, and more."
          );
        });
      
        test("Netflix Login - Check Login Input Errors and SHOW/HIDE Password", async ({ page }) => {
          // navigate to the login page
          await getByTestId(page, 'header-login-link').click();
      
          // after the url is correct, assert page title appears
          await page.waitForURL(NETFLIX_LOGIN_URL);
          await expect(getByTestId(page, 'login-page-title')).toHaveText("Sign In");
      
          // assert Remember Me checkbox is checked
          await expect(getByTestId(page, 'rememberMe')).toBeChecked();
      
          await test.step("Check Login Input Errors", async () => {
            // select email field, select password field, and click reCaptcha Learn more link button
            await getByTestId(page, 'login-field').focus();
            await getByTestId(page, 'password-field').focus();
            await getByTestId(page, 'recaptcha-learn-more-button').click();
      
            // assert email and password input error messages display
            // assert reCaptcha disclosure message displays
            await expect(getByTestId(page, 'login-field+error')).toBeVisible();
            await expect(getByTestId(page, 'login-field+error')).toHaveText(EMAIL_INPUT_ERROR_MSG);
            await expect(getByTestId(page, 'password-field+error')).toBeVisible();
            await expect(getByTestId(page, 'password-field+error')).toHaveText(PASSWORD_INPUT_ERROR_MSG);
            await expect(getByTestId(page, 'recaptcha-disclosure')).toBeVisible();
            await expect(getByTestId(page, 'recaptcha-disclosure')).toContainText(RECAPTCHA_DISCLOSURE_TEXT);
          });
      
          // assert email and password fields are blank
          await expect(getByTestId(page, 'login-field')).toBeEmpty();
          await expect(getByTestId(page, 'password-field')).toBeEmpty();
      
          // fill in valid email and invalid password
          await getByTestId(page, 'login-field').fill(TestUser.TestEmail);
          await getByTestId(page, 'password-field').fill(TestUser.InvalidPassword);
      
          // assert password field type is password
          await expect(getByTestId(page, 'password-field')).toHaveAttribute('type', 'password');
      
          // click SHOW (password) and assert that password field type is text
          await expect(getByTestId(page, 'password-visibility-toggle')).toBeVisible();
          await getByTestId(page, 'password-visibility-toggle').click();
          await expect(getByTestId(page, 'password-field')).toHaveAttribute('type', 'text');
      
          // click HIDE (password) and assert that password field type is password
          await getByTestId(page, 'password-visibility-toggle').click();
          await expect(getByTestId(page, 'password-field')).toHaveAttribute('type', 'password');
      
          // assert email and password input error messages are not displayed
          await expect(getByTestId(page, 'login-field+error')).toBeHidden();
          await expect(getByTestId(page, 'password-field+error')).toBeHidden();
        });
      
        test("Netflix Login - Invalid Password ", async ({ page }) => {
          // navigate to the login page
          await getByTestId(page, 'header-login-link').click();
      
          // after the url is correct, assert page title appears
          await page.waitForURL(NETFLIX_LOGIN_URL);
          await expect(getByTestId(page, 'login-page-title')).toHaveText("Sign In");
      
          // assert email and password fields are blank
          await expect(getByTestId(page, 'login-field')).toBeEmpty();
          await expect(getByTestId(page, 'password-field')).toBeEmpty();
      
          // fill in invalid email and invalid password, and click Sign In
          await getByTestId(page, 'login-field').fill(TestUser.Test
      