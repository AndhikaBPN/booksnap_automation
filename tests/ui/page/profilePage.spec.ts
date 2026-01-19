import { test } from "@playwright/test";
import { Navbar } from "../../../pages";
import { ProfilePageFlow } from "../../flows/page/ProfilePageFlow";
import { LoginFlow } from "../../flows/auth/LoginFlow";
import path from "path";

test.describe("Profile Page", () => {
    let profilePageFlow: ProfilePageFlow;
    let loginFlow: LoginFlow;
    let navbar: Navbar;

    test.beforeEach("Navigate to profile page", async ({ page }) => {
        profilePageFlow = new ProfilePageFlow(page);
        loginFlow = new LoginFlow(page);
        navbar = new Navbar(page);

        await loginFlow.LoginWithInputCorrectEmail('putrisyiffa01@gmail.com', 'admin123');
        await navbar.navigateToProfile();
    });

    test('Click user profile', async () => {
        await profilePageFlow.clickUserProfile();
    });

    test('Click edit profile', async () => {
        await profilePageFlow.clickEditProfile();
    });

    test('Edit the profile picture', async () => {
        const filePath = path.join(process.cwd(), 'assets', 'img', 'profilePic.png');
        await profilePageFlow.editTheProfilePicture(filePath);
    });

    test('Edit the name', async () => {
        await profilePageFlow.editTheName('Putri Syiffa');
    });

    test('Edit the email', async () => {
        await profilePageFlow.editTheEmail();
    });

    test.skip('Edit the country code', async () => {
        // await profilePageFlow.editTheCountryCode('+62');
    });

    test('Edit the phone number', async () => {
        await profilePageFlow.editThePhoneNumber('81234567890');
    });

    test('Edit the phone number with invalid format', async () => {
        await profilePageFlow.editThePhoneNumberWithInvalidFormat('1111111111111111');
    });

    test('Click manage subscription', async () => {
        await profilePageFlow.clickManageSubscription();
    });

    test.skip('Click monthly section', async () => {
        // await profilePageFlow.clickMonthlySection();
    });

    test.skip('Click yearly section', async () => {
        // await profilePageFlow.clickYearlySection();
    });

    test.skip('Change plan', async () => {
        // await profilePageFlow.changePlan('Yearly');
    });

    test('Click explore plans', async () => {
        await profilePageFlow.clickExplorePlans();
    });

    test('Click manage followed categories', async () => {
        await profilePageFlow.clickManageFollowedCategories();
    });

    test('Edit selected categories', async () => {
        await profilePageFlow.editSelectedCategories(['Fiction', 'Fantasy/Myth']);
    });

    test('Click language preference', async () => {
        await profilePageFlow.clickLanguagePreference();
    });

    test.skip('Change the language', async () => {
        await profilePageFlow.changeTheLanguage('Indonesia');
    });

    test('Click post you\'ve liked', async () => {
        await profilePageFlow.clickBookYouLiked();
    });

    test('Click sign out button', async () => {
        await profilePageFlow.clickSignOutButton();
    });

});