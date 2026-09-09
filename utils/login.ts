import { expect, Page } from '@playwright/test';
import { users } from '../testdata/users';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';

export async function loginAsStandardUser(page: Page, loginPage: LoginPage, inventoryPage: InventoryPage): Promise<void> {
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();
  await expect(page.locator('.inventory_item')).toHaveCount(6);
}