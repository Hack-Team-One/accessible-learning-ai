import { Page, Locator } from "@playwright/test";

export function getByTestId(page: Page, TestId: string): Locator {
  return page.locator(`[data-uia="${TestId}"]`)
}

export async function clearTextFieldByTestId(page: Page, TestId: string) {
  await getByTestId(page, TestId).click();
  await page.keyboard.press('Meta+A');
  await page.keyboard.press('Backspace');
}
