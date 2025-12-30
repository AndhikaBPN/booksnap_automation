import {expect, Page} from "@playwright/test";
import {LoginPage} from "../../../pages";

export class LoginFlow {
    constructor(private page: Page) {}

    // navigate to signuppage
    async NavigateToSignUpPageFlow(): Promise<void> {
        const loginPage = new LoginPage(this.page);

        await loginPage.goto();
        await loginPage.skipIntro();
        await loginPage.navigateToSignUpPage();

        await expect(this.page.locator('span', {hasText: 'Sign Up Now'})).toBeVisible();
    }

    // login with input correct email
    async LoginWithInputCorrectEmail(email?: string, password?: string): Promise<void> {
        const loginPage = new LoginPage(this.page);

        await loginPage.goto();
        await loginPage.skipIntro();
        await this.login(email, password);
        await loginPage.clickLogin();

        await expect(loginPage.ForYouButton).toBeVisible();
    }

    // login with input incorrect email
    async LoginWithInputIncorrectEmail(email?: string, password?: string): Promise<void> {
        const loginPage = new LoginPage(this.page);

        await loginPage.goto();
        await loginPage.skipIntro();
        await this.login(email, password);
        await loginPage.clickLogin();

        await expect(this.page.getByRole('heading', {name: 'Login Failed'})).toBeVisible();
    }

    // login with input correct password
    async LoginWithInputCorrectPassword(email?: string, password?: string): Promise<void> {
        const loginPage = new LoginPage(this.page);

        await loginPage.goto();
        await loginPage.skipIntro();
        await this.login(email, password);
        await loginPage.clickLogin();

        await expect(loginPage.ForYouButton).toBeVisible();
    }

    // login with input incorrect password
    async LoginWithInputIncorrectPassword(email?: string, password?: string): Promise<void> {
        const loginPage = new LoginPage(this.page);

        await loginPage.goto();
        await loginPage.skipIntro();
        await this.login(email, password);
        await loginPage.clickLogin();

        await expect(this.page.getByRole('heading', {name: 'Login Failed'})).toBeVisible();
    }

    // show or hide password
    async ShowOrHidePassword(email?: string, password?: string): Promise<void> {
        const loginPage = new LoginPage(this.page);

        await loginPage.goto();
        await loginPage.skipIntro();
        await this.login(email, password);
        await loginPage.assertPasswordHidden()
        await loginPage.togglePasswordVisibility();
        await loginPage.assertPasswordVisible()
    }

    async login(email?: string, password?: string): Promise<void> {
        const loginPage = new LoginPage(this.page);

        const finalEmail = email || process.env.USER_EMAIL;
        const finalPassword = password || process.env.USER_PASSWORD;
        if (!finalEmail || !finalPassword) {
            throw new Error('Email or password is not provided');
        }

        await loginPage.inputEmail(finalEmail);
        await loginPage.inputPassword(finalPassword);
    }
}