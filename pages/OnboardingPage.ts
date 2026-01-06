import { Page, Locator} from '@playwright/test';

export class OnboardingPage {
    readonly page: Page;
    readonly skipButton: Locator;
    readonly getStartedButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.skipButton = page.getByRole('button', { name: 'Skip' });
        this.getStartedButton = page.getByRole('button', { name: 'Get Started' });
    }

    async clickSkipButton(): Promise<void> {
        await this.skipButton.click();
        console.log('Skip button clicked');
    }

    async clickGetStartedButton(): Promise<void> {
        await this.getStartedButton.click();
        console.log('Get Started button clicked');
    }
}