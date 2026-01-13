import { test } from "@playwright/test";
import { ExplorePageFlow } from "../../flows/page/ExplorePageFlow";
import { LoginFlow } from "../../flows/auth/LoginFlow";

test.describe("Explore Page", () => {
    let explorePageFlow: ExplorePageFlow;
    let loginFlow: LoginFlow;

    test.beforeEach("Navigate to explore page", async ({ page }) => {
        explorePageFlow = new ExplorePageFlow(page);
        loginFlow = new LoginFlow(page);

        await loginFlow.LoginWithInputCorrectEmail('putrisyiffa01@gmail.com', 'admin123');
        await explorePageFlow.navigateToExplorePage();
    });

    test('Searching by selected category', async () => {
        await explorePageFlow.searchBySelectedCategory('Romance');
    });

    test('Searching by selected more than one category', async () => {
        await explorePageFlow.searchBySelectedMoreThanOneCategory('Biography,Fiction,Business Development');
    });

    test('Searching by enter the title book', async () => {
        await explorePageFlow.searchByEnterTheTitleBook('The Thursday Murder Club');
    });

    test.skip('Searching by enter the author book', async () => {
        await explorePageFlow.searchByEnterTheAuthorBook('F. Scott Fitzgerald');
    });
});