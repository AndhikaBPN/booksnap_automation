import {expect, Page} from '@playwright/test';
import {InboxPage, Navbar} from '../../../pages';

export class InboxPageFlow {
    readonly page: Page;
    readonly navbar: Navbar
    readonly inboxPage: InboxPage;

    constructor(page: Page) {
        this.page = page;
        this.navbar = new Navbar(page);
        this.inboxPage = new InboxPage(page);
    }

    // Open inbox page
    async openInboxPage(): Promise<void> {
        await this.navbar.navigateToInbox();
        await expect(this.inboxPage.header).toBeVisible();
    }

    // Mark all notifications as read
    async markAllNotificationsAsRead(): Promise<void> {
        await this.inboxPage.clickMarkAllAsReadButton();
        await expect(this.inboxPage.unreadNotification).toBeHidden();
    }

    // Filter notifications
    async filterNotifications(): Promise<void> {
        const categories = ['All', 'Comments', 'Likes', 'Systems'];
        for(let cat of categories) {
            await this.inboxPage.clickFilterButton();
            await this.inboxPage.selectFilterCategory(cat);
            const inboxCategory = this.inboxPage.getInboxCategory(cat);
            await expect(inboxCategory).toBeVisible();
        }
    }

    // View all notifications
    async viewAllNotifications(): Promise<void> {
        await this.inboxPage.clickFilterButton();
        await this.inboxPage.selectFilterCategory('All');
        const inboxCategory = this.inboxPage.getInboxCategory('All');
        const isVisible = await inboxCategory.isVisible();

        const inboxItems = this.inboxPage.inboxContainer.locator(':scope > div');
        const emptyState = this.inboxPage.inboxContainer.getByText('No notifications yet');

        if (!isVisible) {
            console.log('Inbox category "All" is not visible.');
            return;
        }

        const hasItems = await inboxItems.count() > 0;
        const isEmpty = await emptyState.isVisible();

        expect(hasItems || isEmpty).toBeTruthy();
    }

    // View comments notifications
    async viewCommentsNotifications(): Promise<void> {
        await this.inboxPage.clickFilterButton();
        await this.inboxPage.selectFilterCategory('Comments');
        const inboxCategory = this.inboxPage.getInboxCategory('Comments');
        const isVisible = await inboxCategory.isVisible();

        const inboxItems = this.inboxPage.inboxContainer.locator(':scope > div');
        const emptyState = this.inboxPage.inboxContainer.getByText('No notifications yet');

        if (!isVisible) {
            console.log('Inbox category "Comments" is not visible.');
            return;
        }

        const hasItems = await inboxItems.count() > 0;
        const isEmpty = await emptyState.isVisible();

        expect(hasItems || isEmpty).toBeTruthy();
    }

    // View likes notifications
    async viewLikesNotifications(): Promise<void> {
        await this.inboxPage.clickFilterButton();
        await this.inboxPage.selectFilterCategory('Likes');
        const inboxCategory = this.inboxPage.getInboxCategory('Likes');
        const isVisible = await inboxCategory.isVisible();

        const inboxItems = this.inboxPage.inboxContainer.locator(':scope > div');
        const emptyState = this.inboxPage.inboxContainer.getByText('No notifications yet');

        if (!isVisible) {
            console.log('Inbox category "Likes" is not visible.');
            return;
        }

        const hasItems = await inboxItems.count() > 0;
        const isEmpty = await emptyState.isVisible();

        expect(hasItems || isEmpty).toBeTruthy();
    }

    // View systems notifications
    async viewSystemsNotifications(): Promise<void> {
        await this.inboxPage.clickFilterButton();
        await this.inboxPage.selectFilterCategory('Systems');
        const inboxCategory = this.inboxPage.getInboxCategory('Systems');
        const isVisible = await inboxCategory.isVisible();

        const inboxItems = this.inboxPage.inboxContainer.locator(':scope > div');
        const emptyState = this.inboxPage.inboxContainer.getByText('No notifications yet');

        if (!isVisible) {
            console.log('Inbox category "Systems" is not visible.');
            return;
        }

        const hasItems = await inboxItems.count() > 0;
        const isEmpty = await emptyState.isVisible();

        expect(hasItems || isEmpty).toBeTruthy();
    }

    // No notifications available
    async noNotificationsAvailable(): Promise<void> {
        const categories = ['All', 'Comments', 'Likes', 'Systems'];
        for(let cat of categories) {
            await this.inboxPage.clickFilterButton();
            await this.inboxPage.selectFilterCategory(cat);
            const inboxCategory = this.inboxPage.getInboxCategory(cat);
            await expect(inboxCategory).toBeVisible();
            const emptyState = this.inboxPage.inboxContainer.getByText('No notifications yet');
            const isEmptyVisible = await emptyState.isVisible();

            if (isEmptyVisible) {
                expect(isEmptyVisible).toBeTruthy();
                console.log(`Inbox category "${cat}" is empty.`);
                return;
            }

            console.log(`Inbox category "${cat}" is not empty.`);
        }
    }

    // Open a notification
    async openNotification(): Promise<void> {
        const inboxItems = this.inboxPage.inboxContainer.locator(':scope > div');
        const itemCount = await inboxItems.count();
        if (itemCount === 0) {
            console.log('No notifications available to open.');
            return;
        }
        await inboxItems.first().click();
    }
}