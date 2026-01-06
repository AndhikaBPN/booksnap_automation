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

    test.only('Pause the audio', async ({page}) => {
        await homePageFlow.pauseTheAudio();
    });
});