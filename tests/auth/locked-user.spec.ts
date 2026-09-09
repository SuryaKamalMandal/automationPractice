import { test, expect } from '../../fixture/test.fixture';
import { users } from '../../testdata/users';

test.describe('Authentication and Session Management', () => {
  test('Locked-out account cannot authenticate', async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    await expect(loginPage.errorMessage).toContainText('locked out');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('.inventory_list')).toHaveCount(0);
  });
});