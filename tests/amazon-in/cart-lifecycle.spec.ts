import { test, expect } from '@playwright/test';

// spec: specs/amazon-in-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Guest Shopping Journeys', () => {
  test('Add an item to cart, update quantity, and remove it', async ({ page }) => {
    // 1. Start in a fresh guest session with an empty cart and open an available product.
    await page.goto('https://www.amazon.in/dp/B0F7Y67F6C');
    const cartBadge = page.locator('#nav-cart-count');
    await expect(cartBadge).toHaveText('0');

    // 2. Set quantity to 1 and select Add to cart.
    await page.locator('#quantity').selectOption('1');
    await page.locator('#add-to-cart-button').click();
    await expect(page).toHaveTitle(/Amazon\.in Shopping Cart/);
    await expect(cartBadge).toHaveText('1');

    // 3. Open the full cart and increase the item quantity to 2.
    await page.goto('https://www.amazon.in/gp/cart/view.html');
    const item = page.locator('#sc-active-cart');
    await expect(item).toContainText(/boAt Rockerz 113/i);
    await item.locator('button[aria-label^="Increase quantity by one"]').click();
    await expect(item.locator('button[aria-label^="Increase quantity by one"]')).toHaveAttribute('aria-label', /Quantity is 2/);
    await expect(cartBadge).toHaveText('2');
    await expect(page.getByRole('heading', { name: /Subtotal \(2 items\):/ })).toBeVisible();

    // 4. Delete the item from the cart.
    await item.locator('input[aria-label^="Delete boAt Rockerz 113"]').click();
    await expect(cartBadge).toHaveText('0');
    await expect(item.locator('input[aria-label^="Delete boAt Rockerz 113"]')).toHaveCount(0);
  });
});
