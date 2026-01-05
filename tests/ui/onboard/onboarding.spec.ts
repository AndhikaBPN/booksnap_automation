import {test, expect} from '@playwright/test';
import {LoginPage} from '../../../pages';
import {OnboardingFlow} from '../../flows/onboard/OnboardingFlow';

test.describe('Onboarding Page', () => {
    let loginPage: LoginPage;
    let onboardingFlow: OnboardingFlow;

    test.beforeEach('Navigate to onboarding page', async ({page}) => {
        loginPage = new LoginPage(page);
        onboardingFlow = new OnboardingFlow(page);

        await loginPage.goto();
    });

    test('Skip onboarding screen', async ({page}) => {
        await onboardingFlow.skipOnboardingScreen();
    });

    test('View all onboarding screens', async ({page}) => {
        await onboardingFlow.viewAllOnboardingScreens();
    });
});