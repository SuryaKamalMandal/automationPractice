import { test, expect } from '../../fixture/test.fixture';
import { users } from '../../testdata/users';

test.describe('Authentication and Session Management', () => {
  test('Valid standard-user login', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.expectVisible();
    await loginPage.login(users.standard.username, users.standard.password);

    await inventoryPage.expectLoaded();
    await expect(inventoryPage.products).toHaveCount(6);
  });
});