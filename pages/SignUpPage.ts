import { Page, Locator, expect, defineConfig } from '@playwright/test';

export class SignUpPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneNumberInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly signUpButton: Locator;
    readonly continueWithGoogleButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.getByLabel('Name');
        this.emailInput = page.getByLabel('Email');
        this.phoneNumberInput = page.getByLabel('Phone Number');
        this.passwordInput = page.getByLabel("Password");
        this.confirmPasswordInput = page.getByLabel('Confirm Password');
        this.signUpButton = page.getByRole('button', {name: 'Sign Up'});
        this.continueWithGoogleButton = page.locator('span', {hasText: 'Continue with Google'});
    }

    async inputName(name: string): Promise<void> {
        await this.nameInput.click();
        await this.nameInput.fill(name);
        console.log('Name input filled with: ' + name);
    }

    async inputEmail(email: string): Promise<void> {
        await this.emailInput.click();
        await this.emailInput.fill(email);
        console.log('Email input filled with: ' + email);
    }

    async inputPhoneNumber(phoneNumber: string): Promise<void> {
        await this.phoneNumberInput.click();
        await this.phoneNumberInput.fill(phoneNumber);
        console.log('Phone number input filled with: ' + phoneNumber);
    }

    async inputPassword(password: string): Promise<void> {
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        console.log('Password input filled with: ' + password);
    }

    async inputConfirmPassword(confirmPassword: string): Promise<void> {
        await this.confirmPasswordInput.click();
        await this.confirmPasswordInput.fill(confirmPassword);
        console.log('Confirm password input filled with: ' + confirmPassword);
    }

    async clickSignUpButton(): Promise<void> {
        await this.signUpButton.click();
        console.log('Sign Up button clicked');
    }

    async clickContinueWithGoogleButton(): Promise<void> {
        await this.continueWithGoogleButton.click();
        console.log('Continue with Google button clicked');
    }
}
