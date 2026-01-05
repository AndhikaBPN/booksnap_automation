import {expect, Page} from '@playwright/test';
import {LoginPage, OnboardingPage} from '../../../pages';

export class OnboardingFlow {
    readonly page: Page;
    readonly loginPage: LoginPage;
    readonly onboardingPage: OnboardingPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.onboardingPage = new OnboardingPage(page);
    }

    // Skip onboarding screen
    async skipOnboardingScreen(): Promise<void> {
        await this.onboardingPage.clickSkipButton();
        await expect(this.page).toHaveTitle('Sign In - BookSnap');
    }

    // View all onboarding screens
    async viewAllOnboardingScreens(): Promise<void> {
        expect(await this.page.locator('text=Welcome To').isVisible());
        await this.onboardingPage.clickGetStartedButton();

        expect(await this.page.locator('text=Bite-Sized Knowledge').isVisible());
        await this.onboardingPage.clickGetStartedButton();

        expect(await this.page.locator('text=Ready to Dive In?').isVisible());
        await this.onboardingPage.clickGetStartedButton();
        
        await expect(this.page).toHaveTitle('Sign In - BookSnap');
    }
}