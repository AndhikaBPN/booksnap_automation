import { Page, Locator, expect} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly skipButton: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly forYouButton: Locator;
    readonly togglePasswordButton: Locator;
    readonly forgotPasswordButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.skipButton = page.getByRole('button', { name: 'Skip' });
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Log In' });
        this.forYouButton = page.getByRole('button', { name: 'For You' });
        this.togglePasswordButton = this.passwordInput.locator('..').locator('..').locator('button');
        this.forgotPasswordButton = page.getByRole('button', { name: 'Forgot Password?' });
    }

    async goto(): Promise<void> {
        await this.page.goto('/');
        console.log('Navigated to login page');
    }

    async skipIntro(): Promise<void> {
        await this.skipButton.click();
        console.log('Skip button clicked');
    }

    async inputEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
        console.log('Email input filled with: ' + email);
    }

    async inputPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
        console.log('Password input filled with: ' + password);
    }

    async clickLogin(): Promise<void> {
        await this.loginButton.click();
        console.log('Login button clicked');
    }

    async navigateToSignUpPage(): Promise<void> {
        const signUpLink = this.page.getByRole('button', { name: 'Sign up' });
        await signUpLink.click();
        console.log('Navigated to sign up page');
    }

    async navigateToLoginPage(): Promise<void> {
        const loginLink = this.page.getByRole('button', { name: 'Log In' });
        await loginLink.click();
        console.log('Navigated to login page');
    }

    async assertLoginSuccess(): Promise<void> {
        await expect(this.forYouButton).toBeVisible();
    }

    async togglePasswordVisibility(): Promise<void> {
        await this.togglePasswordButton.click();
        console.log('Password visibility toggled');
    }

    async getPasswordType(): Promise<void> {
        const passwordType = await this.passwordInput.getAttribute('type');
        console.log('Password type:', passwordType)
    }

    async assertPasswordHidden(): Promise<void> {
        await this.getPasswordType()
        await expect(this.passwordInput).toHaveAttribute('type', 'password');
    }

    async assertPasswordVisible(): Promise<void> {
        await this.getPasswordType()
        await expect(this.passwordInput).toHaveAttribute('type', 'text');
    }

    async clickForgotPassword(): Promise<void> {
        await this.forgotPasswordButton.click()
        console.log('Forgot password button clicked')
    }

    get ForYouButton(): Locator {
        return this.forYouButton;
    }
}
