import { Page, Locator} from '@playwright/test';

export class ExplorePage {

    readonly page: Page;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('input[placeholder="Find your favorite book..."]');
    }

    getEnabledCategories(category: string): Locator {
        return this.page.getByRole('button', { name: category });
    }

    async inputSearch(value: string): Promise<void> {
        await this.searchInput.fill(value);
        console.log('Search input filled with: ' + value);
    }

    async clickCategoryButton(category: string): Promise<void> {
        const categoryButton = this.getEnabledCategories(category);
        await categoryButton.click();
        console.log(`${category} category button clicked`);
    }

}