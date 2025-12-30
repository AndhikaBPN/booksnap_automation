import {test, expect} from '@playwright/test';
import {LoginPage, SignUpPage} from '../../../pages';
import {Generator} from '../../helper/Generator';

test.describe('Sign up page', () => {
    test.beforeEach('Navigate to sign up page', async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.skipIntro();
        await loginPage.navigateToSignUpPage();
        await expect(page.locator('span', {hasText: 'Sign Up Now'})).toBeVisible();
    });

    test('Navigate to login page', async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigateToLoginPage();
        await expect(page).toHaveTitle('Sign In - BookSnap');
    })

    test('Input name', async ({page}) => {
        const signUpPage = new SignUpPage(page);

        await signUpPage.inputName('Cikiii');
        await expect(signUpPage.nameInput).toHaveValue('Cikiii');
    });

    test('Input valid email', async ({page}) => {
        const signUpPage = new SignUpPage(page);

        await signUpPage.inputEmail('fildzaharistaaa@gmail.com');
        await expect(signUpPage.emailInput).toHaveValue('fildzaharistaaa@gmail.com');
    });

    test('Input invalid email', async ({page}) => {
        const signUpPage = new SignUpPage(page);

        await signUpPage.inputEmail('fildzah@com');
        await expect(signUpPage.emailInput).toHaveValue('fildzah@com');
    });

    test('Input phone number', async ({page}) => {
        const signUpPage = new SignUpPage(page);

        await signUpPage.inputPhoneNumber('089610431828');
        await expect(signUpPage.phoneNumberInput).toHaveValue('089610431828');
    });

    test('Input invalid phone number', async ({page}) => {
        const signUpPage = new SignUpPage(page);

        await signUpPage.inputPhoneNumber('08961043182');
        await expect(signUpPage.phoneNumberInput).toHaveValue('08961043182');
    });

    test('Input valid password', async ({page}) => {
        const signUpPage = new SignUpPage(page);

        await signUpPage.inputPassword('Yoshiki29!');
        await expect(signUpPage.passwordInput).toHaveValue('Yoshiki29!');
    });

    test('Input invalid password', async ({page}) => {
        const signUpPage = new SignUpPage(page);

        await signUpPage.inputPassword('yoshiki, 12345678');
        await expect(signUpPage.passwordInput).toHaveValue('yoshiki, 12345678');
    });

});