import {test, expect} from '@playwright/test';
import { HomePageFlow } from '../../flows/page/HomePageFlow';
import { LoginFlow } from '../../flows/auth/LoginFlow';

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
});