import { test } from "@playwright/test";
import { InboxPageFlow } from "../../../flows/page/InboxPageFlow";
import { LoginFlow } from "../../../flows/auth/LoginFlow";

test.describe("Inbox Page", () => {
    let inboxPageFlow: InboxPageFlow;
    let loginFlow: LoginFlow;

    test.beforeEach("Navigate to inbox page", async ({ page }) => {
        inboxPageFlow = new InboxPageFlow(page);
        loginFlow = new LoginFlow(page);

        await loginFlow.LoginWithInputCorrectEmail('putrisyiffa01@gmail.com', 'admin123');
    });

    test('Open inbox page', async () => {
        await inboxPageFlow.openInboxPage();
    });

    test('Mark all notifications as read', async () => {
        await inboxPageFlow.openInboxPage();
        await inboxPageFlow.markAllNotificationsAsRead();
    });

    test('Filter notifications', async () => {
        await inboxPageFlow.openInboxPage();
        await inboxPageFlow.filterNotifications();
    });

    test('View all notifications', async () => {
        await inboxPageFlow.openInboxPage();
        await inboxPageFlow.viewAllNotifications();
    });

    test('View comments notifications', async () => {
        await inboxPageFlow.openInboxPage();
        await inboxPageFlow.viewCommentsNotifications();
    });

    test('View likes notifications', async () => {
        await inboxPageFlow.openInboxPage();
        await inboxPageFlow.viewLikesNotifications();
    });

    test('View systems notifications', async () => {
        await inboxPageFlow.openInboxPage();
        await inboxPageFlow.viewSystemsNotifications();
    });

    test('No notifications available', async () => {
        await inboxPageFlow.openInboxPage();
        await inboxPageFlow.noNotificationsAvailable();
    });

    test.skip('Open a notification', async () => {
        await inboxPageFlow.openInboxPage();
        await inboxPageFlow.openNotification();
    });
});