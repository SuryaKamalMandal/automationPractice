import { expect, Page } from '@playwright/test';

export class ProductPage {
  readonly name = this.page.locator('.inventory_details_name');
  readonly description = this.page.locator('.inventory_details_desc');
  readonly price = this.page.locator('.inventory_details_price');
  readonly backToProducts = this.page.getByRole('button', { name: 'Back to products' });

  constructor(private readonly page: Page) {}

  async expectProduct(name: string): Promise<void> {
    await expect(this.name).toHaveText(name);
    await expect(this.description).toBeVisible();
    await expect(this.price).toBeVisible();
  }
}