import { test, expect } from '@playwright/test';

// spec: specs/amazon-in-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Guest Shopping Journeys', () => {
  test('Open storefront and browse department navigation', async ({ page }) => {
    // 1. Start from a fresh guest session and open https://www.amazon.in.
    await page.goto('https://www.amazon.in');
    await expect(page).toHaveTitle(/Amazon\.in/);
    await expect(page.locator('#nav-global-location-popover-link')).toBeVisible();
    await expect(page.locator('#twotabsearchtextbox')).toBeVisible();
    await expect(page.locator('#nav-link-accountList')).toBeVisible();
    await expect(page.locator('#nav-cart')).toBeVisible();
    await expect(page.locator('#nav-hamburger-menu')).toBeVisible();

    // 2. Open a visible department link such as Electronics or Mobiles.
    await expect(page.locator('#nav-xshop a[href*="electronics"]')).toBeVisible();
    await page.locator('#nav-xshop a[href*="electronics"]').click();
    await expect(page).toHaveURL(/\/electronics\//);
    await expect(page).toHaveTitle(/Electronic Products/i);
  });
});
