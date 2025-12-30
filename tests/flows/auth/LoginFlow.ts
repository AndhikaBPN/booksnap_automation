import {Page} from "@playwright/test";
import {LoginPage} from "../../../pages";

export class LoginFlow {
    constructor(private page: Page) {}

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