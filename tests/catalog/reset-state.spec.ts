import { test, expect } from '../../fixture/test.fixture';
import { loginAsStandardUser } from '../../utils/login';

test.describe('Catalog and Product Interaction', () => {
  test('Reset App State clears cart contents', async ({ page, loginPage, inventoryPage, menuPage }) => {
    await loginAsStandardUser(page, loginPage, inventoryPage);
    await inventoryPage.addProduct('Sauce Labs Backpack');
    await inventoryPage.addProduct('Sauce Labs Bike Light');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    await inventoryPage.openMenu();
    await menuPage.resetAppState.click();
    await page.reload();
    await inventoryPage.expectLoaded();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    await expect(inventoryPage.product('Sauce Labs Backpack').getByRole('button', { name: 'Add to cart' })).toBeVisible();
    await expect(inventoryPage.product('Sauce Labs Bike Light').getByRole('button', { name: 'Add to cart' })).toBeVisible();
  });
});