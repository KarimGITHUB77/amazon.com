# Amazon.in Exploratory Functional Test Plan

## Application Overview

Amazon.in is an India-focused retail storefront with global search, department/category navigation, delivery pincode selection, product detail pages, guest account entry, and a shopping cart. Exploration confirmed the homepage loads for a guest session; searching for “wireless headphones” returned over 50,000 results with brand/type filters; product detail pages expose quantity and Add to cart controls; adding an item updates the cart badge and the full cart offers quantity, Delete, Save for later, and checkout actions. Invalid short postcodes are rejected with “Please enter a valid pincode.” Tests should use a fresh guest browser state and stop before checkout or payment.

## Test Scenarios

### 1. Guest Shopping Journeys

**Seed:** `tests/seed.spec.ts`

#### 1.1. Open storefront and browse department navigation

**File:** `tests/amazon-in/navigation.spec.ts`

**Steps:**
  1. Start from a fresh guest session and open https://www.amazon.in.
    - expect: The Amazon.in homepage loads without a blocking error.
    - expect: The header exposes delivery location, search, account, cart, and category navigation.
  2. Open the All Categories menu.
    - expect: The navigation drawer opens and presents sections such as Trending, Digital Content and Devices, Shop by Category, Programs & Features, and Help & Settings.
  3. Close the drawer, then open a visible department link such as Electronics or Mobiles.
    - expect: The drawer closes.
    - expect: The selected department page loads and its page title and category content correspond to the selected department.

#### 1.2. Search for a product and review results

**File:** `tests/amazon-in/search-results.spec.ts`

**Steps:**
  1. From a fresh guest session, enter “wireless headphones” in the Amazon.in search field and submit.
    - expect: A search results page loads with the submitted query retained in the search field.
    - expect: The results heading reports a non-zero result count and product cards are visible.
  2. Inspect the first several product cards.
    - expect: Each visible product card has a product title and a usable product link.
    - expect: Available cards display price and rating information, and sponsored placements are distinguishable from organic listings.
  3. Open a product from the results.
    - expect: The product detail page matches the selected listing and exposes the product title, price, and delivery information.

#### 1.3. Handle a search with no matching products

**File:** `tests/amazon-in/search-no-results.spec.ts`

**Steps:**
  1. From a fresh guest session, search for a distinctive nonsense string such as “zzqv-no-such-item-948271”.
    - expect: The search page loads without a technical error.
    - expect: The page clearly communicates that there are no matching results or offers an explicit correction/recovery path.
    - expect: No unrelated products are presented as exact matches without clear labeling.
  2. Use the search field to replace the query with “wireless headphones” and submit again.
    - expect: The results page recovers and shows matching product listings.

#### 1.4. Refine search results and verify filter state

**File:** `tests/amazon-in/search-filters.spec.ts`

**Steps:**
  1. From a fresh guest session, search for “wireless headphones”.
    - expect: Results and available refinements are displayed, including relevant product types or brands when available.
  2. Select one visible brand refinement, such as boAt, and wait for the results to refresh.
    - expect: The selected refinement is visibly active or represented in the URL.
    - expect: The result set updates and the selected brand is reflected in visible listings or applied-filter state.
  3. Clear the brand refinement, then apply a price or delivery refinement if available.
    - expect: The original result set is restored after clearing the brand refinement.
    - expect: The second refinement applies without losing the search query, and clearing it restores the broader result set.

#### 1.5. Inspect product details and quantity selection

**File:** `tests/amazon-in/product-detail.spec.ts`

**Steps:**
  1. From a fresh guest session, search for “wireless headphones” and open a product result.
    - expect: The product detail page shows a matching title, price, rating/review information when available, and delivery estimate.
  2. Inspect selectable variants and the quantity selector; select quantity 2 if the product supports it.
    - expect: Available variants are clearly selectable and the selected variant is reflected in the page state.
    - expect: The quantity selector supports valid quantities and retains the selected value.
  3. Review Add to cart and Buy now controls without activating Buy now.
    - expect: Add to cart is available when the item can be purchased.
    - expect: The test does not enter checkout or provide personal or payment details.

#### 1.6. Add an item to cart, update quantity, and remove it

**File:** `tests/amazon-in/cart-lifecycle.spec.ts`

**Steps:**
  1. Start in a fresh guest session with an empty cart, search for “wireless headphones”, and open an available product.
    - expect: The cart badge is zero before adding the item.
  2. Set quantity to 1 and select Add to cart.
    - expect: Amazon displays an add-to-cart confirmation or cart view.
    - expect: The cart badge increases to 1 and the selected product is present in the cart.
  3. Open the full cart and increase the item quantity to 2.
    - expect: The cart quantity becomes 2 after the update completes.
    - expect: The cart subtotal reflects two units and remains consistent with the displayed unit price, subject to promotions or shipping.
  4. Delete the item from the cart.
    - expect: The item is removed, the cart badge returns to zero, and the empty-cart state is displayed.
    - expect: No checkout or payment flow is opened.

#### 1.7. Verify empty cart behavior

**File:** `tests/amazon-in/empty-cart.spec.ts`

**Steps:**
  1. Start in a fresh guest session with no cart items and open the cart.
    - expect: The cart shows an empty state and no active product line items.
    - expect: The cart badge is zero.
  2. Use the storefront search or home link to return to shopping.
    - expect: The shopper can return to the storefront and search without an error.
    - expect: The empty cart remains empty.

#### 1.8. Validate delivery pincode input

**File:** `tests/amazon-in/delivery-location.spec.ts`

**Steps:**
  1. Start in a fresh guest session and open Update location in the header.
    - expect: A location dialog appears with a delivery pincode field and an Apply action.
    - expect: The current delivery location, if present, is visible and is not changed merely by opening the dialog.
  2. Enter a short invalid value such as “123” and select Apply.
    - expect: The dialog reports “Please enter a valid pincode” or equivalent validation feedback.
    - expect: The delivery location remains unchanged and the dialog stays available for correction.
  3. Replace the invalid value with a valid six-digit Indian pincode and apply it in an isolated test session.
    - expect: The dialog accepts the valid-format pincode and the displayed delivery location updates or confirms the selected location.
    - expect: Availability and delivery estimates can refresh for the chosen location.
  4. Close the dialog without applying another location.
    - expect: The dialog closes and no unintended delivery-location change is made.

#### 1.9. Check guest account entry and authentication boundary

**File:** `tests/amazon-in/account-entry.spec.ts`

**Steps:**
  1. Start in a fresh guest session and open Account & Lists or the category drawer’s Hello, sign in entry.
    - expect: The account entry point is available to a guest and routes to or reveals the sign-in experience.
  2. Inspect the sign-in page without entering credentials.
    - expect: The page identifies the account sign-in step and presents required account input and a continue action.
    - expect: No authenticated account data is shown and no sign-in attempt is submitted.
  3. Return to the storefront using browser navigation.
    - expect: The guest storefront loads and the cart remains unchanged.
