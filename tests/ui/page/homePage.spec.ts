import {test} from '@playwright/test';
import { HomePageFlow } from '../../flows/page/HomePageFlow';
import { LoginFlow } from '../../flows/auth/LoginFlow';
import { Generator } from '../../../utils/helper/Generator';

test.describe('Home Page', () => {
    let homePageFlow: HomePageFlow;
    let loginFlow: LoginFlow;

    test.beforeEach('Navigate to home page', async ({page}) => {
        homePageFlow = new HomePageFlow(page);
        loginFlow = new LoginFlow(page);

        await loginFlow.LoginWithInputCorrectEmail('putrisyiffa01@gmail.com', 'admin123');
    });

    test('Scrolling on for you page', async ({page}) => {
        await homePageFlow.scrollOnForYouPage();
    });

    test('Play the audio', async ({page}) => {
        await homePageFlow.playTheAudio();
    });

    test('Pause the audio', async ({page}) => {
        await homePageFlow.pauseTheAudio();
    });

    test('Fast Forward 10 Seconds', async ({page}) => {
        await homePageFlow.fastForward10Seconds();
    });

    test('Go back 10 seconds', async ({page}) => {
        await homePageFlow.goBack10Seconds();
    });

    test('Click minimize/maximize', async ({page}) => {
        await homePageFlow.clickMinimizeMaximize();
    });

    test('Click like/love button', async ({page}) => {
        await homePageFlow.clickLikeLoveButton();
    });

    test('Click comment button', async ({page}) => {
        await homePageFlow.clickCommentButton();
    });

    test('Enter the comment', async ({page}) => {
        const comment = Generator.randomStringGenerator();
        await homePageFlow.enterComment(comment);
    });

    test('Like the comment', async ({page}) => {
        await homePageFlow.likeTheComment();
    });

    test('Dislike the comment', async ({page}) => {
        await homePageFlow.dislikeTheComment();
    });

    test.skip('Report the comment', async ({page}) => {
        // await homePageFlow.reportTheComment();
    });

    test.skip('Reply the comment', async ({page}) => {
        // await homePageFlow.replyTheComment();
    });

    test.skip('Like the reply comment', async ({page}) => {
        // await homePageFlow.likeTheReplyComment();
    });

    test.skip('Dislike the reply comment', async ({page}) => {
        // await homePageFlow.dislikeTheReplyComment();
    });

    test.skip('Report the reply comment', async ({page}) => {
        // await homePageFlow.reportTheReplyComment();
    });

    test.skip('Delete our own comment', async ({page}) => {
        // await homePageFlow.deleteOurOwnComment();
    });

    test.skip('Delete another user\'s comment', async ({page}) => {
        // await homePageFlow.deleteAnotherUserComment();
    })

    test('Share the book', async ({page}) => {
        await homePageFlow.shareTheBook();
    });

    test('Click save the book', async ({page}) => {
        await homePageFlow.clickSaveTheBook();
    });

    test('Click my library page', async ({page}) => {
        await homePageFlow.clickMyLibraryPage();
    });

    test('Search for saved books', async ({page}) => {
        await homePageFlow.searchForSavedBooks('Where the Crawdads Sing');
    });

    test.skip('Filter by recently added', async ({page}) => {
        await homePageFlow.filterByRecentlyAdded();
    });

    test('Click search button', async ({page}) => {
        await homePageFlow.clickSearchButton();
    });
});