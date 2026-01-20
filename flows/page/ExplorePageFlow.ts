import {expect, Page} from '@playwright/test';
import {ExplorePage, Navbar} from '../../../pages';

export class ExplorePageFlow {

    readonly page: Page;
    readonly navbar: Navbar;
    readonly explorePage: ExplorePage;

    constructor(page: Page) {
        this.page = page;
        this.navbar = new Navbar(page);
        this.explorePage = new ExplorePage(page);
    }

    // Navigate to explore page
    async navigateToExplorePage(): Promise<void> {
        await this.navbar.navigateToExplore();
    }

    // Searching by selected category
    async searchBySelectedCategory(category: string): Promise<void> {
        await this.explorePage.clickCategoryButton(category);
        const buttonClass = await this.explorePage.getEnabledCategories(category).getAttribute('class');
        await expect(buttonClass).not.toContain('bg-transparent');
    }

    // Searching by selected more than one category
    async searchBySelectedMoreThanOneCategory(category1: string): Promise<void> {
        for (let category of category1.split(',')) {
            await this.explorePage.clickCategoryButton(category);
            const buttonClass = await this.explorePage.getEnabledCategories(category).getAttribute('class');
            await expect(buttonClass).not.toContain('bg-transparent');
        }
    }

    // Searching by enter the title book
    async searchByEnterTheTitleBook(title: string): Promise<void> {
        for (let titles of title.split(',')) {
            await this.explorePage.inputSearch(titles);
            await expect(this.page.locator('p', { hasText: titles })).toBeVisible();
        }

    }

    // Searching by enter the author book
    async searchByEnterTheAuthorBook(author: string): Promise<void> {
        await this.explorePage.inputSearch(author);
        await expect(this.page.getByRole('paragraph', {name: author})).toBeVisible();
    }

}