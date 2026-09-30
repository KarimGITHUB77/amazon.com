import { test, expect } from '@playwright/test';

// spec: specs/amazon-in-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Guest Shopping Journeys', () => {
  test('Search for a product and review results', async ({ page }) => {
    // 1. From a fresh guest session, enter wireless headphones in Amazon.in search and submit.
    await page.goto('https://www.amazon.in');
    const searchBox = page.locator('#twotabsearchtextbox');
    await searchBox.fill('wireless headphones');
    await searchBox.press('Enter');
    await expect(page).toHaveURL(/\/s\?k=wireless\+headphones/);
    await expect(searchBox).toHaveValue('wireless headphones');
    await expect(page.locator('h2').filter({ hasText: /results for.*wireless headphones/i })).toBeVisible();

    // 2. Inspect the first several product cards.
    const results = page.locator('[data-component-type="s-search-result"]');
    await expect(results.first()).toBeVisible();
    await expect(results).not.toHaveCount(0);
    const firstCards = await results.all();
    for (const result of firstCards.slice(0, 3)) {
      await expect(result.locator('h2')).toBeVisible();
      await expect(result.locator('a.s-line-clamp-3')).toHaveAttribute('href', /.+/);
      await expect(result.locator('.a-price').first()).toBeVisible();
    }

    // 3. Open a product from the results.
    const productLink = results.nth(2).locator('a.s-line-clamp-3');
    const productPagePromise = page.waitForEvent('popup');
    await productLink.click();
    const productPage = await productPagePromise;
    await expect(productPage.locator('#productTitle')).toBeVisible();
    await expect(productPage.locator('.a-price').first()).toBeVisible();
    await expect(productPage.locator('#deliveryBlockMessage')).toBeVisible();
  });
});
