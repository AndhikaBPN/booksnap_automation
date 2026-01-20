import {expect, Page} from '@playwright/test';
import {LoginPage, SignUpPage, ForgotPasswordPage} from '../../pages';
import {Generator} from '../../utils/helper/Generator';

export class SignUpFlow {
    readonly loginPage: LoginPage;
    readonly signUpPage: SignUpPage;
    readonly forgotPasswordPage: ForgotPasswordPage;

    constructor(private readonly page: Page) {
        this.loginPage = new LoginPage(page);
        this.signUpPage = new SignUpPage(page);
        this.forgotPasswordPage = new ForgotPasswordPage(page);
    }

    // navigate to sign up page
    async NavigateToSignUpPageFlow(): Promise<void> {
        await this.loginPage.goto();
        await this.loginPage.skipIntro();
        await this.loginPage.navigateToSignUpPage();
        await expect(this.page.locator('span', {hasText: 'Sign Up Now'})).toBeVisible();
    }

    // navigate to login page
    async NavigateToLoginPageFlow(): Promise<void> {
        await this.loginPage.navigateToLoginPage();
        await expect(this.page).toHaveTitle('Sign In - BookSnap');
    }

    // input name with all fields filled with valid data
    async InputNameFlow(name: string): Promise<void> {
        const email = Generator.randomEmailGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();
        const password = Generator.randomPasswordGenerator();

        await this.signUpPage.inputName(name);
        await expect(this.signUpPage.nameInput).toHaveValue(name);
        await this.signUpPage.inputEmail(email)
        await this.signUpPage.inputPhoneNumber(phoneNumber);
        await this.signUpPage.inputPassword(password);
        await this.signUpPage.inputConfirmPassword(password);
        await this.signUpPage.clickSignUpButton();

        await expect(this.page.getByRole('heading', { name: 'Registration Successful!' })).toBeVisible();
    }

    // input name only
    async InputNameOnlyFlow(name: string): Promise<void> {
        await this.signUpPage.inputName(name);

        await expect(this.signUpPage.nameInput).toHaveValue(name);
        await expect(this.signUpPage.signUpButton).toBeDisabled();
    }

    // input valid email with all fields filled with valid data
    async InputEmailFlow(): Promise<void> {
        const name = Generator.randomNameGenerator();
        const email = Generator.randomEmailGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();
        const password = Generator.randomPasswordGenerator();

        await this.signUpPage.inputName(name);
        await this.signUpPage.inputEmail(email);
        await expect(this.signUpPage.emailInput).toHaveValue(email);
        await this.signUpPage.inputPhoneNumber(phoneNumber);
        await this.signUpPage.inputPassword(password);
        await this.signUpPage.inputConfirmPassword(password);
        await this.signUpPage.clickSignUpButton();

        await expect(this.page.getByRole('heading', { name: 'Registration Successful!' })).toBeVisible();
    }

    // input invalid email
    async InputInvalidEmailFlow(email: string): Promise<void> {
        const name = Generator.randomNameGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();
        const password = Generator.randomPasswordGenerator();

        await this.signUpPage.inputName(name);
        await this.signUpPage.inputEmail(email);
        await expect(this.signUpPage.emailInput).toHaveValue(email);
        await this.signUpPage.inputPhoneNumber(phoneNumber);
        await this.signUpPage.inputPassword(password);
        await this.signUpPage.inputConfirmPassword(password);

        await expect(this.signUpPage.signUpButton).toBeDisabled();
        expect(await this.signUpPage.hasErrorBorder('email')).toBe(true);
    }

    // input valid email only
    async InputEmailOnlyFlow(email: string): Promise<void> {
        await this.signUpPage.inputEmail(email);

        await expect(this.signUpPage.emailInput).toHaveValue(email);
        await expect(this.signUpPage.signUpButton).toBeDisabled();
    }

    // input phone number with all fields filled with valid data
    async InputPhoneNumberFlow(): Promise<void> {
        const name = Generator.randomNameGenerator();
        const email = Generator.randomEmailGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();
        const password = Generator.randomPasswordGenerator();

        await this.signUpPage.inputName(name);
        await this.signUpPage.inputEmail(email);
        await this.signUpPage.inputPhoneNumber(phoneNumber);
        await expect(this.signUpPage.phoneNumberInput).toHaveValue(phoneNumber);
        await this.signUpPage.inputPassword(password);
        await this.signUpPage.inputConfirmPassword(password);
        await this.signUpPage.clickSignUpButton();

        await expect(this.page.getByRole('heading', { name: 'Registration Successful!' })).toBeVisible();
    }

    // input invalid phone number
    async InputInvalidPhoneNumberFlow(phoneNumber: string): Promise<void> {
        const name = Generator.randomNameGenerator();
        const email = Generator.randomEmailGenerator();
        const password = Generator.randomPasswordGenerator();

        await this.signUpPage.inputName(name);
        await this.signUpPage.inputEmail(email);
        await this.signUpPage.inputPhoneNumber(phoneNumber);
        await expect(this.signUpPage.phoneNumberInput).toHaveValue(phoneNumber);
        await this.signUpPage.inputPassword(password);
        await this.signUpPage.inputConfirmPassword(password);

        await expect(this.signUpPage.signUpButton).toBeDisabled();
        expect(await this.signUpPage.hasErrorBorder('phoneNumber')).toBe(true);
    }

    // input valid phone number only
    async InputPhoneNumberOnlyFlow(phoneNumber: string): Promise<void> {
        await this.signUpPage.inputPhoneNumber(phoneNumber);

        await expect(this.signUpPage.phoneNumberInput).toHaveValue(phoneNumber);
        await expect(this.signUpPage.signUpButton).toBeDisabled();
    }

    // input valid password
    async InputPasswordFlow(password: string): Promise<void> {
        const name = Generator.randomNameGenerator();
        const email = Generator.randomEmailGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();

        await this.signUpPage.inputName(name);
        await this.signUpPage.inputEmail(email);
        await this.signUpPage.inputPhoneNumber(phoneNumber);
        await this.signUpPage.inputPassword(password);
        await this.signUpPage.inputConfirmPassword(password);
        await expect(this.signUpPage.passwordInput).toHaveValue(password);
        await expect(this.signUpPage.confirmPasswordInput).toHaveValue(password);
        await this.signUpPage.clickSignUpButton();

        await expect(this.page.getByRole('heading', { name: 'Registration Successful!' })).toBeVisible();
    }

    // input invalid password
    async InputInvalidPasswordFlow(password: string): Promise<void> {
        const name = Generator.randomNameGenerator();
        const email = Generator.randomEmailGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();

        await this.signUpPage.inputName(name);
        await this.signUpPage.inputEmail(email);
        await this.signUpPage.inputPhoneNumber(phoneNumber);
        await this.signUpPage.inputPassword(password);
        await this.signUpPage.inputConfirmPassword(password);
        await expect(this.signUpPage.passwordInput).toHaveValue(password);
        await expect(this.signUpPage.confirmPasswordInput).toHaveValue(password);

        await expect(this.signUpPage.signUpButton).toBeDisabled();
        expect(await this.signUpPage.hasErrorBorder('password')).toBe(true);
    }

    // input matching confirm password
    async InputMatchingConfirmPasswordFlow(password: string): Promise<void> {
        const name = Generator.randomNameGenerator();
        const email = Generator.randomEmailGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();

        await this.signUpPage.inputName(name);
        await this.signUpPage.inputEmail(email);
        await this.signUpPage.inputPhoneNumber(phoneNumber);
        await this.signUpPage.inputPassword(password);
        await this.signUpPage.inputConfirmPassword(password);
        await expect(this.signUpPage.passwordInput).toHaveValue(password);
        await expect(this.signUpPage.confirmPasswordInput).toHaveValue(password);
        await this.signUpPage.clickSignUpButton();

        await expect(this.page.getByRole('heading', { name: 'Registration Successful!' })).toBeVisible();
    }

    // input not matching confirm password
    async InputNotMatchingConfirmPasswordFlow(password: string, confrimPassword: string): Promise<void> {
        const name = Generator.randomNameGenerator();
        const email = Generator.randomEmailGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();

        await this.signUpPage.inputName(name);
        await this.signUpPage.inputEmail(email);
        await this.signUpPage.inputPhoneNumber(phoneNumber);
        await this.signUpPage.inputPassword(password);
        await this.signUpPage.inputConfirmPassword(confrimPassword);
        await expect(this.signUpPage.passwordInput).toHaveValue(password);
        await expect(this.signUpPage.confirmPasswordInput).toHaveValue(confrimPassword);

        await expect(this.signUpPage.signUpButton).toBeDisabled();
        expect(await this.signUpPage.hasErrorBorder('confirmPassword')).toBe(true);
    }
}