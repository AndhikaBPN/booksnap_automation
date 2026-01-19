import { expect, Page } from "@playwright/test";
import { ProfilePage, Navbar } from "../../../pages";

export class ProfilePageFlow {

    readonly page: Page;
    readonly navbar: Navbar;
    readonly profilePage: ProfilePage;

    constructor(page: Page) {
        this.page = page;
        this.navbar = new Navbar(page);
        this.profilePage = new ProfilePage(page);
    }

    // Click user profile
    async clickUserProfile(): Promise<void> {
        await this.profilePage.openUserProfile();
        await expect(this.page.getByRole('heading', { name: 'User Profile' })).toBeVisible();
    }

    // Click edit profile
    async clickEditProfile(): Promise<void> {
        await this.clickUserProfile();
        await this.profilePage.clickEditProfile();
        await expect(this.page.getByRole('heading', { name: 'Edit User Profile' })).toBeVisible();
    }

    // Edit the profile picture
    async editTheProfilePicture(filePath: string): Promise<void> {
        await this.clickUserProfile();
        await this.profilePage.clickEditProfile();
        await this.profilePage.changeProfilePicture(filePath);
        console.log('Change Profile Picture changed to: ' + filePath);

        await this.profilePage.clickSaveChanges();
        await expect(this.page.getByRole('heading', { name: 'Profile Updated!' })).toBeVisible();
    }

    // Edit the name
    async editTheName(name: string): Promise<void> {
        await this.clickUserProfile();
        await this.profilePage.clickEditProfile();
        await this.profilePage.nameInputFill(name);
        console.log('Name input filled with: ' + name);

        await this.profilePage.clickSaveChanges();
        await expect(this.page.getByRole('heading', { name: 'Profile Updated!' })).toBeVisible();
    }

    // Edit the email
    async editTheEmail(): Promise<void> {
        await this.clickUserProfile();
        await this.profilePage.clickEditProfile();
        const emailContainer = this.page.locator('label:text("Email")').locator('..');

        await expect(emailContainer.locator('input')).toHaveCount(0);
        console.log('Email input is not editable as expected');
    }

    // Edit the country code
    async editTheCountryCode(countryCode: string): Promise<void> {

    }

    // Edit the phone number
    async editThePhoneNumber(phone: string): Promise<void> {
        await this.clickUserProfile();
        await this.profilePage.clickEditProfile();
        await this.profilePage.phoneNumberInputFill(phone);
        console.log('Phone Number input filled with: ' + phone);

        await this.profilePage.clickSaveChanges();
        await expect(this.page.getByRole('heading', { name: 'Profile Updated!' })).toBeVisible();
    }

    // Edit the phone number with invalid format
    async editThePhoneNumberWithInvalidFormat(phone: string): Promise<void> {
        await this.clickUserProfile();
        await this.profilePage.clickEditProfile();
        await this.profilePage.phoneNumberInputFill(phone);

        const classValue = await this.profilePage.phoneNumberInput.locator('..').getAttribute('class');
        expect(classValue).toContain('border-red-500');
    }

    // Click manage subscription
    async clickManageSubscription(): Promise<void> {
        await this.profilePage.openManageSubscription();
        await expect(this.page.getByRole('heading', { name: 'Manage Subscription' })).toBeVisible();
    }

    // Click explore plans
    async clickExplorePlans(): Promise<void> {
        await this.profilePage.openManageSubscription();
        await this.profilePage.clickExplorePlans();
        await expect(this.page.getByRole('button', { name: 'Monthly' })).toBeVisible();
    }

    // Click manage followed categories
    async clickManageFollowedCategories(): Promise<void> {
        await this.profilePage.openManageFollowedCategories();
        await expect(this.page.getByRole('heading', { name: 'Followed Categories' })).toBeVisible();
    }

    // Edit selected categories
    async editSelectedCategories(categories: string[]): Promise<void> {
        await this.profilePage.openManageFollowedCategories();
        await this.profilePage.clickEditCategories();

        for (const category of categories) {
            await this.profilePage.selectCategory(category);
            console.log('Selected categories edited to: ' + categories);
        }
    }

    // Click language preference
    async clickLanguagePreference(): Promise<void> {
        await this.profilePage.openLanguagePreference();
        await expect(this.page.getByRole('heading', { name: 'Language Preference' })).toBeVisible();
    }

    // Change the language
    async changeTheLanguage(language: string): Promise<void> {
        await this.profilePage.openLanguagePreference();
        await this.profilePage.clickChangeLanguage();
        await this.profilePage.selectLanguage(language);
        console.log('Language changed to: ' + language);
    }

    // Click post you've liked
    async clickBookYouLiked(): Promise<void> {
        await this.profilePage.openBookYouLiked();
        await expect(this.page.getByRole('heading', { name: 'Books You\'ve Liked' })).toBeVisible();
    }

    // Click sign out button
    async clickSignOutButton(): Promise<void> {
        await this.profilePage.clickSignOutButton();
        await this.page.getByRole('button', { name: 'Yes, sign out' }).click();
        await expect(this.page.getByRole('button', { name: 'Log In' })).toBeVisible();
    }

}