import { expect, test } from '@playwright/test';
import {
  ALAI_BASE_URL,
  ALAI_LOGIN_URL,
} from './fixtures/url';

// run tests in headful mode so you can see the browser
test.use({ headless: false });
test.describe.configure({ mode: 'parallel' });

test.describe("Netflix Tests", () => {
  test("Netflix Login - Check Login Input Errors and SHOW/HIDE Password", async ({ page }) => {
    // navigate to the login page
    await page.goto(ALAI_LOGIN_URL);

    // after the url is correct, assert page title appears
    await page.waitForURL(ALAI_BASE_URL);
  });
});
