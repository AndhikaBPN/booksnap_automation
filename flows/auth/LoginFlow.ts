import {expect, Page} from "@playwright/test";
import {LoginPage} from "../../pages";

export class LoginFlow {

    readonly loginPage: LoginPage;

    constructor(private readonly page: Page) {
        this.loginPage = new LoginPage(page);
    }

    // navigate to signuppage
    async NavigateToSignUpPageFlow(): Promise<void> {
        await this.loginPage.goto();
        await this.loginPage.skipIntro();
        await this.loginPage.navigateToSignUpPage();

        await expect(this.page.locator('span', {hasText: 'Sign Up Now'})).toBeVisible();
    }

    // login with input correct email
    async LoginWithInputCorrectEmail(email?: string, password?: string): Promise<void> {
        await this.loginPage.goto();
        await this.loginPage.skipIntro();
        await this.login(email, password);
        await this.loginPage.clickLogin();

        await expect(this.loginPage.ForYouButton).toBeVisible();
    }

    // login with input incorrect email
    async LoginWithInputIncorrectEmail(email?: string, password?: string): Promise<void> {
        await this.loginPage.goto();
        await this.loginPage.skipIntro();
        await this.login(email, password);
        await this.loginPage.clickLogin();

        await expect(this.page.getByRole('heading', {name: 'Login Failed'})).toBeVisible();
    }

    // login with input correct password
    async LoginWithInputCorrectPassword(email?: string, password?: string): Promise<void> {
        await this.loginPage.goto();
        await this.loginPage.skipIntro();
        await this.login(email, password);
        await this.loginPage.clickLogin();

        await expect(this.loginPage.ForYouButton).toBeVisible();
    }

    // login with input incorrect password
    async LoginWithInputIncorrectPassword(email?: string, password?: string): Promise<void> {
        await this.loginPage.goto();
        await this.loginPage.skipIntro();
        await this.login(email, password);
        await this.loginPage.clickLogin();

        await expect(this.page.getByRole('heading', {name: 'Login Failed'})).toBeVisible();
    }

    // show or hide password
    async ShowOrHidePassword(email?: string, password?: string): Promise<void> {
        await this.loginPage.goto();
        await this.loginPage.skipIntro();
        await this.login(email, password);
        await this.loginPage.assertPasswordHidden()
        await this.loginPage.togglePasswordVisibility();
        await this.loginPage.assertPasswordVisible()
    }

    async login(email?: string, password?: string): Promise<void> {
        const finalEmail = email || process.env.USER_EMAIL;
        const finalPassword = password || process.env.USER_PASSWORD;
        if (!finalEmail || !finalPassword) {
            throw new Error('Email or password is not provided');
        }

        await this.loginPage.inputEmail(finalEmail);
        await this.loginPage.inputPassword(finalPassword);
    }
}