import { expect, Page } from '@playwright/test';

export class CartPage {
  readonly items = this.page.locator('.cart_item');
  readonly continueShopping = this.page.getByRole('button', { name: 'Continue Shopping' });
  readonly checkout = this.page.getByRole('button', { name: 'Checkout' });

  constructor(private readonly page: Page) {}

  item(name: string) {
    return this.items.filter({ hasText: name });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.page.getByText('Your Cart', { exact: true })).toBeVisible();
  }
}