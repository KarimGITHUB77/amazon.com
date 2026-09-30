import { test, expect } from '@playwright/test';

// spec: specs/amazon-in-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Guest Shopping Journeys', () => {
  test('Check guest account entry and authentication boundary', async ({ page }) => {
    // 1. Start in a fresh guest session and open Account & Lists.
    await page.goto('https://www.amazon.in');
    await page.locator('#nav-link-accountList').click();
    await expect(page).toHaveURL(/\/ap\/signin/);

    // 2. Inspect the sign-in page without entering credentials.
    await expect(page).toHaveTitle('Sign in');
    await expect(page.getByRole('heading', { name: 'Sign in or create account' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Enter mobile number or email' })).toBeVisible();
    await expect(page.getByRole('main').getByRole('link', { name: 'Conditions of Use' })).toBeVisible();

    // 3. Return to the storefront using browser navigation.
    await page.goto('https://www.amazon.in');
    await expect(page).toHaveTitle(/Amazon\.in/);
    await expect(page.locator('#nav-cart-count')).toHaveText('0');
  });
});
