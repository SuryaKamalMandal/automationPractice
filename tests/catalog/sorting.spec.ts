import { test, expect } from '../../fixture/test.fixture';
import { loginAsStandardUser } from '../../utils/login';

function prices(values: string[]): number[] {
  return values.map((value) => Number(value.replace('$', '')));
}

test.describe('Catalog and Product Interaction', () => {
  test('All inventory sort modes', async ({ page, loginPage, inventoryPage }) => {
    await loginAsStandardUser(page, loginPage, inventoryPage);
    await expect(inventoryPage.sortDropdown).toHaveValue('az');

    const originalNames = await inventoryPage.productNames.allTextContents();
    await inventoryPage.sortDropdown.selectOption('za');
    await expect(inventoryPage.productNames).toHaveText([...originalNames].sort().reverse());

    await inventoryPage.sortDropdown.selectOption('lohi');
    const lowToHigh = prices(await inventoryPage.productPrices.allTextContents());
    expect(lowToHigh).toEqual([...lowToHigh].sort((left, right) => left - right));

    await inventoryPage.sortDropdown.selectOption('hilo');
    const highToLow = prices(await inventoryPage.productPrices.allTextContents());
    expect(highToLow).toEqual([...highToLow].sort((left, right) => right - left));

    await inventoryPage.sortDropdown.selectOption('az');
    await expect(inventoryPage.productNames).toHaveText(originalNames);
  });
});