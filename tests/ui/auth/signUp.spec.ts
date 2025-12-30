import {test, expect} from '@playwright/test';
import {LoginPage, SignUpPage, ForgotPasswordPage} from '../../../pages';
import {Generator} from '../../helper/Generator';
import {sign} from "node:crypto";

test.describe('Sign up page', () => {
    let loginPage: LoginPage;
    let signUpPage: SignUpPage;
    let forgotPasswordPage: ForgotPasswordPage;

    test.beforeEach('Navigate to sign up page', async ({page}) => {
        loginPage = new LoginPage(page);
        signUpPage = new SignUpPage(page);
        forgotPasswordPage = new ForgotPasswordPage(page);

        await loginPage.goto();
        await loginPage.skipIntro();
        await loginPage.navigateToSignUpPage();
        await expect(page.locator('span', {hasText: 'Sign Up Now'})).toBeVisible();
    });

    test('Navigate to login page', async ({page}) => {
        await loginPage.navigateToLoginPage();
        await expect(page).toHaveTitle('Sign In - BookSnap');
    })

    test('Input name with all fields filled with valid data', async ({page}) => {
        const email = Generator.randomEmailGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();
        const password = Generator.randomPasswordGenerator();

        await signUpPage.inputName('Cikiii');
        await expect(signUpPage.nameInput).toHaveValue('Cikiii');
        await signUpPage.inputEmail(email)
        await signUpPage.inputPhoneNumber(phoneNumber);
        await signUpPage.inputPassword(password);
        await signUpPage.inputConfirmPassword(password);
        await signUpPage.clickSignUpButton();

        await expect(page.getByRole('heading', { name: 'Registration Successful!' })).toBeVisible();
    });

    test('Input name only', async ({page}) => {
        await signUpPage.inputName('Cikiii');

        await expect(signUpPage.nameInput).toHaveValue('Cikiii');
        await expect(signUpPage.signUpButton).toBeDisabled();
    });

    test('Input valid email with all fields filled with valid data', async ({page}) => {
        const name = Generator.randomNameGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();
        const password = Generator.randomPasswordGenerator();

        await signUpPage.inputName(name);
        await signUpPage.inputEmail('andhika.bagaskara2@gmail.com');
        await expect(signUpPage.emailInput).toHaveValue('andhika.bagaskara2@gmail.com');
        await signUpPage.inputPhoneNumber(phoneNumber);
        await signUpPage.inputPassword(password);
        await signUpPage.inputConfirmPassword(password);
        await signUpPage.clickSignUpButton();

        await expect(page.getByRole('heading', { name: 'Registration Successful!' })).toBeVisible();
    });

    test('Input invalid email', async ({page}) => {
        const name = Generator.randomNameGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();
        const password = Generator.randomPasswordGenerator();

        await signUpPage.inputName(name);
        await signUpPage.inputEmail('fildzah@com');
        await expect(signUpPage.emailInput).toHaveValue('fildzah@com');
        await signUpPage.inputPhoneNumber(phoneNumber);
        await signUpPage.inputPassword(password);
        await signUpPage.inputConfirmPassword(password);

        await expect(signUpPage.signUpButton).toBeDisabled();
        expect(await signUpPage.hasErrorBorder('email')).toBe(true);
    });

    test('input valid email only', async ({page}) => {
        await signUpPage.inputEmail('andhika.bagaskara3@gmail.com');

        await expect(signUpPage.emailInput).toHaveValue('andhika.bagaskara3@gmail.com');
        await expect(signUpPage.signUpButton).toBeDisabled();
    });

    test('Input phone number with all fields filled with valid data', async ({page}) => {
        const name = Generator.randomNameGenerator();
        const email = Generator.randomEmailGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();
        const password = Generator.randomPasswordGenerator();

        await signUpPage.inputName(name);
        await signUpPage.inputEmail(email);
        await signUpPage.inputPhoneNumber(phoneNumber);
        await expect(signUpPage.phoneNumberInput).toHaveValue(phoneNumber);
        await signUpPage.inputPassword(password);
        await signUpPage.inputConfirmPassword(password);
        await signUpPage.clickSignUpButton();

        await expect(page.getByRole('heading', { name: 'Registration Successful!' })).toBeVisible();
    });

    test('Input invalid phone number', async ({page}) => {
        const name = Generator.randomNameGenerator();
        const email = Generator.randomEmailGenerator();
        const password = Generator.randomPasswordGenerator();

        await signUpPage.inputName(name);
        await signUpPage.inputEmail(email);
        await signUpPage.inputPhoneNumber('11223344556677889900');
        await expect(signUpPage.phoneNumberInput).toHaveValue('11223344556677889900');
        await signUpPage.inputPassword(password);
        await signUpPage.inputConfirmPassword(password);

        await expect(signUpPage.signUpButton).toBeDisabled();
        expect(await signUpPage.hasErrorBorder('phoneNumber')).toBe(true);
    });

    test('Input valid phone number only', async ({page}) => {
        await signUpPage.inputPhoneNumber('8123456789');

        await expect(signUpPage.phoneNumberInput).toHaveValue('8123456789');
        await expect(signUpPage.signUpButton).toBeDisabled();
    });

    test('Input valid password', async ({page}) => {
        const name = Generator.randomNameGenerator();
        const email = Generator.randomEmailGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();

        await signUpPage.inputName(name);
        await signUpPage.inputEmail(email);
        await signUpPage.inputPhoneNumber(phoneNumber);
        await signUpPage.inputPassword('Yoshiki29!');
        await signUpPage.inputConfirmPassword('Yoshiki29!');
        await expect(signUpPage.passwordInput).toHaveValue('Yoshiki29!');
        await expect(signUpPage.confirmPasswordInput).toHaveValue('Yoshiki29!');
        await signUpPage.clickSignUpButton();

        await expect(page.getByRole('heading', { name: 'Registration Successful!' })).toBeVisible();
    });

    test('Input invalid password', async ({page}) => {
        const name = Generator.randomNameGenerator();
        const email = Generator.randomEmailGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();

        await signUpPage.inputName(name);
        await signUpPage.inputEmail(email);
        await signUpPage.inputPhoneNumber(phoneNumber);
        await signUpPage.inputPassword('yoshiki, 12345678');
        await signUpPage.inputConfirmPassword('yoshiki, 12345678');
        await expect(signUpPage.passwordInput).toHaveValue('yoshiki, 12345678');
        await expect(signUpPage.confirmPasswordInput).toHaveValue('yoshiki, 12345678');

        await expect(signUpPage.signUpButton).toBeDisabled();
        expect(await signUpPage.hasErrorBorder('password')).toBe(true);
    });

    test('Input valid password only', async ({page}) => {
        await signUpPage.inputPassword('Yoshiki29!');

        await expect(signUpPage.passwordInput).toHaveValue('Yoshiki29!');
        await expect(signUpPage.signUpButton).toBeDisabled();
    });

    test('Input matching confirm password', async ({page}) => {
        const name = Generator.randomNameGenerator();
        const email = Generator.randomEmailGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();

        await signUpPage.inputName(name);
        await signUpPage.inputEmail(email);
        await signUpPage.inputPhoneNumber(phoneNumber);
        await signUpPage.inputPassword('Yoshiki29!');
        await signUpPage.inputConfirmPassword('Yoshiki29!');
        await expect(signUpPage.passwordInput).toHaveValue('Yoshiki29!');
        await expect(signUpPage.confirmPasswordInput).toHaveValue('Yoshiki29!');
        await signUpPage.clickSignUpButton();

        await expect(page.getByRole('heading', { name: 'Registration Successful!' })).toBeVisible();
    });

    test('Input not matching confirm password', async ({page}) => {
        const name = Generator.randomNameGenerator();
        const email = Generator.randomEmailGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();

        await signUpPage.inputName(name);
        await signUpPage.inputEmail(email);
        await signUpPage.inputPhoneNumber(phoneNumber);
        await signUpPage.inputPassword('Yoshiki29!');
        await signUpPage.inputConfirmPassword('Yoshiki29!1');
        await expect(signUpPage.passwordInput).toHaveValue('Yoshiki29!');
        await expect(signUpPage.confirmPasswordInput).toHaveValue('Yoshiki29!1');

        await expect(signUpPage.signUpButton).toBeDisabled();
        expect(await signUpPage.hasErrorBorder('confirmPassword')).toBe(true);
    });

    test('Click sign up button', async ({page}) => {
        const name = Generator.randomNameGenerator();
        const email = Generator.randomEmailGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();
        const password = Generator.randomPasswordGenerator();

        await signUpPage.inputName(name);
        await signUpPage.inputEmail(email);
        await signUpPage.inputPhoneNumber(phoneNumber);
        await signUpPage.inputPassword(password);
        await signUpPage.inputConfirmPassword(password);
        await signUpPage.clickSignUpButton();

        await expect(page.getByRole('heading', { name: 'Registration Successful!' })).toBeVisible();
        await expect(page.locator('span', {hasText: 'Account'})).toBeVisible();
    });

    test.skip('Click sign up with Google button', async ({page}) => {
        await signUpPage.clickContinueWithGoogleButton();
    });

    test.skip('Input valid OTP', async ({page}) => {

    });

    test('Input invalid OTP', async ({page}) => {
        const name = Generator.randomNameGenerator();
        const email = Generator.randomEmailGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();
        const password = Generator.randomPasswordGenerator();

        await signUpPage.inputName(name);
        await signUpPage.inputEmail(email);
        await signUpPage.inputPhoneNumber(phoneNumber);
        await signUpPage.inputPassword(password);
        await signUpPage.inputConfirmPassword(password);
        await signUpPage.clickSignUpButton();

        await expect(page.getByRole('heading', { name: 'Registration Successful!' })).toBeVisible();

        await forgotPasswordPage.inputOTP('111111');
        await forgotPasswordPage.clickContinueButton();

        await expect(page.getByRole('heading', {name: 'OTP Verification Failed'})).toBeVisible();
    });

    test.skip('Resend OTP', async ({page}) => {
        const name = Generator.randomNameGenerator();
        const email = Generator.randomEmailGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();
        const password = Generator.randomPasswordGenerator();

        await signUpPage.inputName(name);
        await signUpPage.inputEmail(email);
        await signUpPage.inputPhoneNumber(phoneNumber);
        await signUpPage.inputPassword(password);
        await signUpPage.inputConfirmPassword(password);
        await signUpPage.clickSignUpButton();

        await expect(page.getByRole('heading', { name: 'Registration Successful!' })).toBeVisible();

        await forgotPasswordPage.clickResendButton();
        await expect(page.getByRole('heading', {name: 'OTP Resent'})).toBeVisible();
    });

    test('Sign up with registered email', async ({page}) => {
        await signUpPage.inputName('Cikiii');
        await signUpPage.inputEmail('fildzaharistaaa@gmail.com');
        await signUpPage.inputPhoneNumber('89610431828');
        await signUpPage.inputPassword('Yoshiki29!');
        await signUpPage.inputConfirmPassword('Yoshiki29!');
        await signUpPage.clickSignUpButton();

        await expect(page.getByRole('heading', { name: 'Registration Failed' })).toBeVisible();
    });

    test('Sign up with registered phone number', async ({page}) => {
        const email = Generator.randomEmailGenerator();

        await signUpPage.inputName('Cikiii');
        await signUpPage.inputEmail(email);
        await signUpPage.inputPhoneNumber('8123456789');
        await signUpPage.inputPassword('Yoshiki29!');
        await signUpPage.inputConfirmPassword('Yoshiki29!');
        await signUpPage.clickSignUpButton();

        await expect(page.getByRole('heading', { name: 'Registration Failed' })).toBeVisible();
    });
});