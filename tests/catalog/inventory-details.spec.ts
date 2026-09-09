import { test, expect } from '../../fixture/test.fixture';
import { loginAsStandardUser } from '../../utils/login';

test.describe('Catalog and Product Interaction', () => {
  test('Inventory content and product details', async ({ page, loginPage, inventoryPage, productPage }) => {
    await loginAsStandardUser(page, loginPage, inventoryPage);
    await expect(inventoryPage.productNames).toHaveCount(6);
    await expect(inventoryPage.products.first().getByRole('img')).toBeVisible();
    await expect(inventoryPage.products.first().getByRole('button', { name: 'Add to cart' })).toBeVisible();

    await inventoryPage.openProduct('Sauce Labs Backpack');
    await productPage.expectProduct('Sauce Labs Backpack');

    await productPage.backToProducts.click();
    await inventoryPage.expectLoaded();
  });
});