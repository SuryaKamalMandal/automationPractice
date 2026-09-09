import { test, expect } from '../../fixture/test.fixture';
import { users } from '../../testdata/users';

test.describe('Authentication and Session Management', () => {
  test('Keyboard login keeps password masked and submits with Enter', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.usernameInput.focus();
    await expect(loginPage.usernameInput).toBeFocused();
    await page.keyboard.type(users.standard.username);
    await page.keyboard.press('Tab');
    await expect(loginPage.passwordInput).toBeFocused();
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    await page.keyboard.type(users.standard.password);
    await page.keyboard.press('Enter');

    await inventoryPage.expectLoaded();
  });
});