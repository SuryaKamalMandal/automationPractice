import { expect, Page } from '@playwright/test';

export class InventoryPage {
  readonly products = this.page.locator('.inventory_item');
  readonly productNames = this.page.locator('.inventory_item_name');
  readonly productPrices = this.page.locator('.inventory_item_price');
  readonly sortDropdown = this.page.locator('[data-test="product-sort-container"]');
  readonly cartLink = this.page.locator('.shopping_cart_link');
  readonly menuButton = this.page.getByRole('button', { name: 'Open Menu' });

  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.page.getByText('Products', { exact: true })).toBeVisible();
  }

  product(name: string) {
    return this.products.filter({ hasText: name });
  }

  async addProduct(name: string): Promise<void> {
    await this.product(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeProduct(name: string): Promise<void> {
    await this.product(name).getByRole('button', { name: 'Remove' }).click();
  }

  async openProduct(name: string): Promise<void> {
    await this.product(name).locator('.inventory_item_name').click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }
}