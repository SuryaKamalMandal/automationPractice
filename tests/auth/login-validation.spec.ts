import { test, expect } from '../../fixture/test.fixture';
import { users } from '../../testdata/users';

test.describe('Authentication and Session Management', () => {
  test('Invalid and incomplete login validation', async ({ loginPage }) => {
    await loginPage.goto();

    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toContainText('Username is required');

    await loginPage.usernameInput.fill(users.standard.username);
    await loginPage.passwordInput.fill('');
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toContainText('Password is required');

    await loginPage.login('invalid_user', 'invalid_password');
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
    await expect(loginPage.usernameInput).toBeVisible();
  });
});