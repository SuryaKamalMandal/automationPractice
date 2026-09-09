import { test, expect } from '../../fixture/test.fixture';
import { loginAsStandardUser } from '../../utils/login';

test.describe('Catalog and Product Interaction', () => {
  test('Add, remove, and persist cart contents', async ({ page, loginPage, inventoryPage, cartPage }) => {
    await loginAsStandardUser(page, loginPage, inventoryPage);
    await inventoryPage.addProduct('Sauce Labs Backpack');
    await inventoryPage.addProduct('Sauce Labs Bike Light');
    await expect(inventoryPage.product('Sauce Labs Backpack').getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(inventoryPage.product('Sauce Labs Bike Light').getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    await expect(cartPage.item('Sauce Labs Backpack')).toHaveCount(1);
    await expect(cartPage.item('Sauce Labs Bike Light')).toHaveCount(1);

    await cartPage.item('Sauce Labs Backpack').getByRole('button', { name: 'Remove' }).click();
    await cartPage.continueShopping.click();
    await inventoryPage.expectLoaded();
    await inventoryPage.openCart();
    await expect(cartPage.item('Sauce Labs Backpack')).toHaveCount(0);
    await expect(cartPage.item('Sauce Labs Bike Light')).toHaveCount(1);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await cartPage.item('Sauce Labs Bike Light').getByRole('button', { name: 'Remove' }).click();
    await expect(cartPage.items).toHaveCount(0);
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });
});