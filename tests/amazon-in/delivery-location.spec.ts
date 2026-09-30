import { test, expect } from '@playwright/test';

// spec: specs/amazon-in-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Guest Shopping Journeys', () => {
  test('Validate delivery pincode input', async ({ page }) => {
    // 1. Start in a fresh guest session and open Update location.
    await page.goto('https://www.amazon.in');
    const locationLink = page.locator('#nav-global-location-popover-link');
    const initialLocation = (await locationLink.innerText())
      .split('\n')[0]
      .replace(/^Delivering to\s*/, '')
      .trim();
    await locationLink.click();
    const locationDialog = page.locator('#a-popover-1');
    await expect(locationDialog).toContainText('Choose your location');
    await expect(page.locator('#GLUXZipUpdateInput')).toBeVisible();
    await expect(locationLink).toContainText(initialLocation);

    // 2. Enter a short invalid value and select Apply.
    await page.locator('#GLUXZipUpdateInput').fill('123');
    await page.locator('#a-popover-1 input[aria-labelledby="GLUXZipUpdate-announce"]').click();
    await expect(locationDialog).toContainText('Please enter a valid pincode');
    await expect(locationLink).toContainText(initialLocation);

    // 3. Close the dialog without changing the saved delivery location.
    await page.locator('#a-popover-1 button[aria-label="Close"]').click();
    await expect(locationDialog).toBeHidden();
    await expect(locationLink).toContainText(initialLocation);
  });
});
