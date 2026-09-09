import { expect, Page } from '@playwright/test';

export class MenuPage {
  readonly allItems = this.page.getByRole('link', { name: 'All Items' });
  readonly about = this.page.getByRole('link', { name: 'About' });
  readonly logout = this.page.getByRole('link', { name: 'Logout' });
  readonly resetAppState = this.page.getByRole('link', { name: 'Reset App State' });
  readonly closeMenu = this.page.getByRole('button', { name: 'Close Menu' });

  constructor(private readonly page: Page) {}

  async expectOpen(): Promise<void> {
    await expect(this.allItems).toBeVisible();
    await expect(this.logout).toBeVisible();
  }
}