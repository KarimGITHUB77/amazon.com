import { test, expect } from '@playwright/test';

// spec: specs/amazon-in-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Guest Shopping Journeys', () => {
  test('Refine search results and verify filter state', async ({ page }) => {
    // 1. From a fresh guest session, search for wireless headphones.
    await page.goto('https://www.amazon.in/s?k=wireless+headphones');
    const searchBox = page.locator('#twotabsearchtextbox');
    const results = page.locator('[data-component-type="s-search-result"]');
    await expect(searchBox).toHaveValue('wireless headphones');
    await expect(results.first()).toBeVisible();
    await expect(page.locator('#s-refinements')).toContainText('boAt');

    // 2. Select the visible boAt brand refinement.
    await page.locator('#s-refinements a:has-text("boAt")').click();
    await expect(page).toHaveURL(/rh=p_123%3A214020/);
    await expect(page).toHaveTitle(/Wireless Headphones.*214020/i);
    await expect(results.first()).toBeVisible();

    // 3. Clear the brand refinement, then apply the available Free Shipping refinement.
    await page.goto('https://www.amazon.in/s?k=wireless+headphones');
    await expect(searchBox).toHaveValue('wireless headphones');
    await page.locator('#s-refinements a:has-text("Free Shipping")').click();
    await expect(page).toHaveURL(/rh=p_n_free_shipping_eligible/);
    await expect(page).toHaveTitle(/Free Shipping/i);
    await expect(results.first()).toBeVisible();
  });
});
