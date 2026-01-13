import {Page, Locator} from '@playwright/test';

export class InboxPage {

    readonly page: Page;
    readonly header: Locator;
    readonly filterButton: Locator;
    readonly inboxContainer: Locator;
    readonly markAllAsReadButton: Locator;
    readonly unreadNotification: Locator;
    readonly headerContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.getByRole('heading', { name: 'Notifications' });
        this.filterButton = page.locator('button:has(img[src="/filter.png"])');
        this.headerContainer = page.locator('div[class="px-5"]').nth(0);
        this.inboxContainer = page.locator('div[class="px-5"]').nth(1);
        this.markAllAsReadButton = page.getByRole('button', { name: 'Mark all as read' });
        this.unreadNotification = this.inboxContainer.locator('div[class="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"]');
    }

    getFilterCategory(category: string): Locator {
        return this.filterButton.getByRole('button', { name: category });
    }

    getInboxCategory(category: string): Locator {
        return this.headerContainer.getByRole('heading', { name: category });
    }

    async clickFilterButton(): Promise<void> {
        await this.filterButton.click();
        console.log('Filter button clicked');
    }

    async selectFilterCategory(category: string): Promise<void> {
        const categoryButton = this.getFilterCategory(category);
        await categoryButton.click();
        console.log(`${category} filter category selected`);
    }

    async clickMarkAllAsReadButton(): Promise<void> {
        await this.markAllAsReadButton.click();
        console.log('Mark all as read button clicked');
    }

}