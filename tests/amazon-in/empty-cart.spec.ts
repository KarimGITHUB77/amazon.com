import { test, expect } from '@playwright/test';

// spec: specs/amazon-in-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Guest Shopping Journeys', () => {
  test('Verify empty cart behavior', async ({ page }) => {
    // 1. Start in a fresh guest session with no cart items and open the cart.
    await page.goto('https://www.amazon.in/gp/cart/view.html');
    const cartBadge = page.locator('#nav-cart-count');
    const cart = page.locator('#sc-active-cart');
    await expect(cartBadge).toHaveText('0');
    await expect(cart).toContainText('Your Amazon Cart is empty');
    await expect(cart.locator('[aria-label^="Delete"]')).toHaveCount(0);

    // 2. Use the storefront home link to return to shopping.
    await page.goto('https://www.amazon.in');
    await expect(page).toHaveTitle(/Amazon\.in/);
    await expect(page.locator('#twotabsearchtextbox')).toBeVisible();
    await expect(cartBadge).toHaveText('0');
  });
});
