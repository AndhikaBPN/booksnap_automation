import { Page, Locator, expect, defineConfig } from '@playwright/test';

export class Navbar {
    readonly page: Page;
    readonly homeButton: Locator;
    readonly exploreButton: Locator;
    readonly askAiButton: Locator;
    readonly inboxButton: Locator;
    readonly profileButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeButton = page.getByRole('button', { name: 'Home' });
        this.exploreButton = page.getByRole('button', { name: 'Explore' });
        this.askAiButton = page.getByRole('button', { name: 'ASK.AI' });
        this.inboxButton = page.getByRole('button', { name: 'Inbox' });
        this.profileButton = page.getByRole('button', { name: 'Profile' });
    }

    async navigateToHome(): Promise<void> {
        await this.homeButton.click();
        console.log('Navigated to Home');
    }

    async navigateToExplore(): Promise<void> {
        await this.exploreButton.click();
        console.log('Navigated to Explore');
    }

    async navigateToAskAi(): Promise<void> {
        await this.askAiButton.click();
        console.log('Navigated to ASK.AI');
    }

    async navigateToInbox(): Promise<void> {
        await this.inboxButton.click();
        console.log('Navigated to Inbox');
    }

    async navigateToProfile(): Promise<void> {
        await this.profileButton.click();
        console.log('Navigated to Profile');
    }
}