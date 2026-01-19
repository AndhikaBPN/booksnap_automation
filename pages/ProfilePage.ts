import {Page, Locator } from '@playwright/test';

export class ProfilePage {

    readonly page: Page;
    readonly userProfileButton: Locator
    readonly manageSubscriptionButton: Locator
    readonly manageFollowedCategoriesButton: Locator
    readonly languagePreferenceButton: Locator
    readonly notificationSettingsButton: Locator
    readonly bookYouLikedButton: Locator
    readonly signOutButton: Locator
    readonly changeProfilePictureButton: Locator
    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly phoneNumberInput: Locator
    readonly editProfileButton: Locator
    readonly saveChangesButton: Locator
    readonly explorePlansButton: Locator
    readonly editCategoriesButton: Locator
    readonly changeLanguageButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.userProfileButton = page.getByRole('button', { name: 'User Profile' });
        this.manageSubscriptionButton = page.getByRole('button', { name: 'Manage Subscription' });
        this.manageFollowedCategoriesButton = page.getByRole('button', { name: 'Manage Followed Categories' });
        this.languagePreferenceButton = page.getByRole('button', { name: 'Language Preference' });
        this.notificationSettingsButton = page.getByRole('button', { name: 'Notification Settings' });
        this.bookYouLikedButton = page.getByRole('button', { name: 'Book You\'ve Liked' });
        this.signOutButton = page.getByRole('button', { name: 'Sign Out' });
        this.changeProfilePictureButton = page.locator('input[type="file"]');
        this.nameInput = page.locator('input[name="fullName"]');
        this.emailInput = page.locator('input[name="email"]');
        this.phoneNumberInput = page.locator('input[name="phone"]');
        this.editProfileButton = page.getByRole('button', { name: 'Edit Profile' });
        this.saveChangesButton = page.getByRole('button', { name: 'Save Changes' });
        this.explorePlansButton = page.getByRole('button', { name: 'Explore Plans' });
        this.editCategoriesButton = page.getByRole('button', { name: 'Edit Categories' });
        this.changeLanguageButton = page.getByRole('button', { name: 'Change Language' });
    }

    getCategoryButton(category: string): Locator {
        return this.page.getByRole('button', { name: category });
    }

    getLanguageOption(language: string): Locator {
        return this.page.getByRole('button', { name: language });
    }

    async openUserProfile(): Promise<void> {
        await this.userProfileButton.click();
        console.log('User Profile opened');
    }

    async openManageSubscription(): Promise<void> {
        await this.manageSubscriptionButton.click();
        console.log('Manage Subscription opened');
    }

    async openManageFollowedCategories(): Promise<void> {
        await this.manageFollowedCategoriesButton.click();
        console.log('Manage Followed Categories opened');
    }

    async openLanguagePreference(): Promise<void> {
        await this.languagePreferenceButton.click();
        console.log('Language Preference opened');
    }

    async openNotificationSettings(): Promise<void> {
        await this.notificationSettingsButton.click();
        console.log('Notification Settings opened');
    }

    async openBookYouLiked(): Promise<void> {
        await this.bookYouLikedButton.click();
        console.log('Book You\'ve Liked opened');
    }

    async clickSignOutButton(): Promise<void> {
        await this.signOutButton.click();
        console.log('Signed out');
    }

    async clickEditProfile(): Promise<void> {
        await this.editProfileButton.click();
        console.log('Edit Profile clicked');
    }

    async clickChangeProfilePicture(): Promise<void> {
        await this.changeProfilePictureButton.click();
        console.log('Change Profile Picture clicked');
    }

    async changeProfilePicture(filePath: string): Promise<void> {
        await this.changeProfilePictureButton.setInputFiles(filePath);
        console.log('Profile picture changed to: ' + filePath);
    }

    async nameInputFill(name: string): Promise<void> {
        await this.nameInput.fill(name);
        console.log('Name input filled with: ' + name);
    }

    async emailInputFill(email: string): Promise<void> {
        await this.emailInput.fill(email);
        console.log('Email input filled with: ' + email);
    }

    async phoneNumberInputFill(phone: string): Promise<void> {
        await this.phoneNumberInput.fill(phone);
        console.log('Phone Number input filled with: ' + phone);
    }

    async clickSaveChanges(): Promise<void> {
        await this.saveChangesButton.click();
        console.log('Save Changes clicked');
    }

    async clickExplorePlans(): Promise<void> {
        await this.explorePlansButton.click();
        console.log('Explore Plans opened');
    }

    async openManageFollowedCategoriesPage(): Promise<void> {
        await this.manageFollowedCategoriesButton.click();
        console.log('Navigated to Manage Followed Categories page');
    }

    async selectLanguage(language: string): Promise<void> {
        const languageOption = this.getLanguageOption(language);
        await languageOption.click();
        console.log(`${language} selected as preferred language`);
    }

    async enableNotification(setting: string): Promise<void> {
        const settingOption = this.page.getByRole('button', { name: setting });
        await settingOption.click();
        console.log(`${setting} notification setting enabled`);
    }

    async disableNotification(setting: string): Promise<void> {
        const settingOption = this.page.getByRole('button', { name: setting });
        await settingOption.click();
        console.log(`${setting} notification setting disabled`);
    }

    async selectCategory(category: string): Promise<void> {
        const categoryButton = this.getCategoryButton(category);
        await categoryButton.click();
        console.log(`${category} category selected`);
    }

    async clickChangeLanguage(): Promise<void> {
        await this.changeLanguageButton.click();
        console.log('Change Language clicked');
    }

    async clickEditCategories(): Promise<void> {
        await this.editCategoriesButton.click();
        console.log('Edit Categories clicked');
    }

}