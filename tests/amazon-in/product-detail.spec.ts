import { test, expect } from '@playwright/test';

// spec: specs/amazon-in-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Guest Shopping Journeys', () => {
  test('Inspect product details and quantity selection', async ({ page }) => {
    // 1. Start in a fresh guest session and open a wireless headphones product.
    await page.goto('https://www.amazon.in/dp/B0F7Y67F6C');
    await expect(page.locator('span#productTitle')).toContainText(/boAt Rockerz 113/i);
    await expect(page.locator('.a-price').first()).toBeVisible();
    await expect(page.locator('#averageCustomerReviews_feature_div #acrPopover')).toBeVisible();
    await expect(page.locator('#deliveryBlockMessage')).toBeVisible();

    // 2. Inspect selectable variants and select quantity 2 if the product supports it.
    const quantity = page.locator('#quantity');
    await expect(quantity).toBeVisible();
    await quantity.selectOption('2');
    await expect(quantity).toHaveValue('2');

    // 3. Review Add to cart and Buy now controls without activating Buy now.
    await expect(page.locator('#add-to-cart-button')).toBeVisible();
    await expect(page.locator('#buy-now-button')).toBeVisible();
  });
});
