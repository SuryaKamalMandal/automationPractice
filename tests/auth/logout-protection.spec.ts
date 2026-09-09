import { test, expect } from '../../fixture/test.fixture';
import { loginAsStandardUser } from '../../utils/login';

test.describe('Authentication and Session Management', () => {
  test('Logout protects inventory from browser navigation', async ({ page, loginPage, inventoryPage, menuPage }) => {
    await loginAsStandardUser(page, loginPage, inventoryPage);

    await inventoryPage.openMenu();
    await menuPage.logout.click();
    await loginPage.expectVisible();

    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await loginPage.expectVisible();
  });
});