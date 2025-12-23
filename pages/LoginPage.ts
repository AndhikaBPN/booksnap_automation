import { Page, Locator, expect, defineConfig } from '@playwright/test';

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
    }

    async skipIntro(): Promise<void> {
        await this.skipButton.click();
    }

    async login(email?: string, password?: string): Promise<void> {
        const finalEmail = email || process.env.USER_EMAIL;
        const finalPassword = password || process.env.USER_PASSWORD;
        if (!finalEmail || !finalPassword) {
            throw new Error('Email or password is not provided');
        }

        await this.emailInput.fill(finalEmail);
        await this.passwordInput.fill(finalPassword);
    }

    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }

    async navigateToSignUpPage(): Promise<void> {
        const signUpLink = this.page.getByRole('button', { name: 'Sign up' });
        await signUpLink.click();
    }

    async assertLoginSuccess(): Promise<void> {
        await expect(this.forYouButton).toBeVisible();
    }

    async togglePasswordVisibility(): Promise<void> {
        await this.togglePasswordButton.click();
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
    }

    get ForYouButton(): Locator {
        return this.forYouButton;
    }
}
