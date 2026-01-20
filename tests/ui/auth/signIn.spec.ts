import {test, expect} from '@playwright/test';
import {LoginPage, ForgotPasswordPage} from '../../../pages';
import { LoginFlow } from '../../../flows/auth/LoginFlow';

test.describe('Sign In', () => {
    test('Navigate to sign up page', async ({page}) => {
        const loginFlow = new LoginFlow(page);

        await loginFlow.NavigateToSignUpPageFlow();
    });

    test('Login with input correct email', async ({page}) => {
        const loginFlow = new LoginFlow(page);

        await loginFlow.LoginWithInputCorrectEmail('fildzaharistaaa@gmail.com', 'Yoshiki29!');
    });

    test('Login with input incorrect email', async ({page}) => {
        const loginFlow = new LoginFlow(page);

        await loginFlow.LoginWithInputIncorrectEmail('fildzaharistaa2902@gmail.com', 'fildzah@com');
    });

    test('Login with input correct password', async ({page}) => {
        const loginFlow = new LoginFlow(page);

        await loginFlow.LoginWithInputCorrectPassword('fildzaharistaaa@gmail.com', 'Yoshiki29!');
    });

    test('Login with input incorrect password', async ({page}) => {
        const loginFlow = new LoginFlow(page);

        await loginFlow.LoginWithInputIncorrectPassword('fildzaharistaaa@gmail.com', 'Yoshi2902?');
    });

    test('Show or hide password', async ({page}) => {
        const loginFlow = new LoginFlow(page);

        await loginFlow.ShowOrHidePassword('fildzaharistaaa@gmail.com', 'Yoshiki29!');
    });
});

test.describe.skip('Forgot Password', () => {
    test('Click forgot password', async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.skipIntro();
        await loginPage.clickForgotPassword();

        await expect(page.locator('span', {hasText: 'Forgot'})).toBeVisible();
    });

    test('Input registered email for reset link', async ({page}) => {
        const loginPage = new LoginPage(page);
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await loginPage.goto();
        await loginPage.skipIntro();
        await loginPage.clickForgotPassword();
        await page.waitForSelector('input[id=email]', {timeout: 5000, state: 'visible'})
        await forgotPasswordPage.inputEmail('putrisyiffa01@gmail.com');
        await forgotPasswordPage.clickSendButton();

        await expect(page.getByRole('heading', {name: 'Email Sent!'})).toBeVisible();
        await expect(forgotPasswordPage.assertOTPPage).toBeVisible();
    });

    test('Input unregistered email for reset link', async ({page}) => {
        const loginPage = new LoginPage(page);
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await loginPage.goto();
        await loginPage.skipIntro();
        await loginPage.clickForgotPassword();
        await page.waitForSelector('input[id=email]', {timeout: 5000, state: 'visible'})
        await forgotPasswordPage.inputEmail('safira.ramadhani2004@gmail.com');
        await forgotPasswordPage.clickSendButton();

        await expect(page.getByRole('heading', {name: 'Error!'})).toBeVisible();
    })

    test('Input valid OTP', async ({page}) => {
        const loginPage = new LoginPage(page);
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await loginPage.goto();
        await loginPage.skipIntro();
        await loginPage.clickForgotPassword();
        await page.waitForSelector('input[id=email]', {timeout: 5000, state: 'visible'})
        await forgotPasswordPage.inputEmail('putrisyiffa01@gmail.com');
        await forgotPasswordPage.clickSendButton();
        await forgotPasswordPage.inputOTP('123456');
        await forgotPasswordPage.clickContinueButton();

        await expect(loginPage.ForYouButton).toBeVisible();
    })

    test('Input invalid OTP', async ({page}) => {
        const loginPage = new LoginPage(page);
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await loginPage.goto();
        await loginPage.skipIntro();
        await loginPage.clickForgotPassword();
        await page.waitForSelector('input[id=email]', {timeout: 5000, state: 'visible'})
        await forgotPasswordPage.inputEmail('putrisyiffa01@gmail.com');
        await forgotPasswordPage.clickSendButton();
        await forgotPasswordPage.inputOTP('111111');
        await forgotPasswordPage.clickContinueButton();

        await expect(page.getByRole('heading', {name: 'OTP Verification Failed'})).toBeVisible();
    })

    test('Resend OTP', async ({page}) => {
        const loginPage = new LoginPage(page);
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await loginPage.goto();
        await loginPage.skipIntro();
        await loginPage.clickForgotPassword();
        await forgotPasswordPage.inputEmail('putrisyiffa01@gmail.com');
        await forgotPasswordPage.clickSendButton();
        await forgotPasswordPage.clickResendButton();

        await expect(page.getByRole('heading', {name: 'OTP Resent'})).toBeVisible();
    })

    test('Click "Continue" after setting new password', async ({page}) => {
        const loginPage = new LoginPage(page);
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await loginPage.goto();
        await loginPage.skipIntro();
        await loginPage.clickForgotPassword();
        await page.waitForSelector('input[id=email]', {timeout: 5000, state: 'visible'})
        await forgotPasswordPage.inputEmail('putrisyiffa01@gmail.com');
        await forgotPasswordPage.clickSendButton();
        await forgotPasswordPage.inputOTP('123456');
        await forgotPasswordPage.clickContinueButton();

        await expect(loginPage.ForYouButton).toBeVisible();
    })
});