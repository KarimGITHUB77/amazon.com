import { test, expect } from '@playwright/test';

// spec: specs/amazon-in-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Guest Shopping Journeys', () => {
  test('Handle a search with no matching products', async ({ page }) => {
    // 1. From fresh guest session search a distinctive nonsense query.
    await page.goto('https://www.amazon.in');
    const searchBox = page.locator('#twotabsearchtextbox');
    await searchBox.fill('zzqv-no-such-item-948271');
    await searchBox.press('Enter');
    await expect(page).toHaveURL(/zzqv-no-such-item-948271/);
    await expect(searchBox).toHaveValue('zzqv-no-such-item-948271');
    await expect(page.locator('#search')).toBeVisible();
    await expect(page.locator('[data-component-type="s-search-result"]')).toHaveCount(0);

    // 2. Replace the query with wireless headphones and submit again.
    await searchBox.fill('wireless headphones');
    await searchBox.press('Enter');
    await expect(page).toHaveURL(/wireless\+headphones/);
    await expect(searchBox).toHaveValue('wireless headphones');
    await expect(page.locator('[data-component-type="s-search-result"]').first()).toBeVisible();
  });
});
