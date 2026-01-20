import {expect, Locator, Page} from '@playwright/test';
import {HomePage, Navbar} from '../../pages';
import { Audio } from '../../utils/helper/Audio';
import { Generator } from '../../utils/helper/Generator';

export class HomePageFlow {

    readonly page: Page;
    readonly homePage: HomePage;
    readonly navbar: Navbar;
    readonly audio: Audio;
    readonly container: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(page);
        this.navbar = new Navbar(page);
        this.audio = new Audio(page);
        this.container = page.locator('div.book-card-container');
    }

    // Scrolling on for you page
    async scrollOnForYouPage(): Promise<void> {
        await this.page.waitForTimeout(2000); // Wait for 2 seconds to ensure the page is loaded

        const srcBefore = await this.homePage.getSrcValueByIndex(0);

        await this.container.evaluate((el) => {
            el.dispatchEvent(new WheelEvent('wheel', { 
                deltaY: 300,
                bubbles: true,
                cancelable: true
            }));
        })

        console.log('Scrolled on For You page');

        await this.page.waitForTimeout(5000); // Wait for 2 seconds
        const srcAfter = await this.homePage.getSrcValueByIndex(1);

        expect(srcBefore).not.toEqual(srcAfter);
    }

    // Swipe left the book (SKIPPED TEST CASE)
    async swipeLeftTheBook(): Promise<void> {
        await this.page.mouse.down();
        await this.page.mouse.move(-100, 0);
        await this.page.mouse.up();
        console.log('Swiped left the book');
    }

    // Swipe left to the last page (SKIPPED TEST CASE)
    async swipeLeftToTheLastPage(): Promise<void> {
        await this.page.mouse.down();
        await this.page.mouse.move(-100, 0);
        await this.page.mouse.up();
        console.log('Swiped left to the last page');
    }

    // Swipe left and then scroll down (SKIPPED TEST CASE)
    async swipeLeftAndScrollDown(): Promise<void> {
        await this.page.mouse.down();
        await this.page.mouse.move(-100, 0);
        await this.page.mouse.up();
        await this.page.mouse.wheel(0, 2000);
        console.log('Swiped left and scrolled down');
    }

    // Play the audio
    async playTheAudio(): Promise<void> {
        await this.homePage.clickPlayAudioButton();

        const timeBefore = await this.audio.getCurrTimeBefore();

        await this.homePage.clickPlayButton();
        await this.page.waitForTimeout(5000); // Wait for 5 seconds

        const timeAfter = await this.audio.getCurrTimeAfter();

        expect(timeAfter).toBeGreaterThan(timeBefore);
    }

    // Pause the audio
    async pauseTheAudio(): Promise<void> {
        await this.homePage.clickPlayAudioButton();

        await this.homePage.clickPlayButton();
        await this.page.waitForTimeout(5000); // Wait for 5 seconds

        await this.homePage.clickPauseButton();

        const timeBefore = await this.audio.getCurrTimeBefore();
        await this.page.waitForTimeout(5000); // Wait for 5 seconds

        const timeAfter = await this.audio.getCurrTimeAfter();

        expect(timeAfter).toBe(timeBefore);
    }

    // Fast forward 10 seconds
    async fastForward10Seconds(): Promise<void> {
        await this.homePage.clickPlayAudioButton();

        await this.homePage.clickPlayButton();
        await this.page.waitForTimeout(5000); // Wait for 5 seconds

        await this.homePage.clickPauseButton();
        await expect(this.audio.isPaused()).toBeTruthy();

        const timeBefore = Number(await this.audio.getCurrTimeBefore());

        await this.homePage.clickNextButton();

        const timeAfter = Number(await this.audio.getCurrTimeAfter());
        const timeDifference = timeAfter - timeBefore;

        expect(timeDifference).toBeGreaterThanOrEqual(9.5);
    }

    // Go back 10 seconds
    async goBack10Seconds(): Promise<void> {
        await this.homePage.clickPlayAudioButton();

        await this.homePage.clickPlayButton();
        await this.page.waitForTimeout(5000); // Wait for 5 seconds

        await this.homePage.clickPauseButton();
        expect(this.audio.isPaused()).toBeTruthy();

        const timeBefore = Number(await this.audio.getCurrTimeBefore());

        await this.homePage.clickPreviousButton();

        const timeAfter = Number(await this.audio.getCurrTimeAfter());

        if (timeBefore < 10) {
            expect(timeAfter).toBe(0);
            return;
        }

        const timeDifference = timeBefore - timeAfter;
        expect(timeDifference).toBeGreaterThanOrEqual(9.5);
    }

    // Click minimize/maximize
    async clickMinimizeMaximize(): Promise<void> {
        await this.homePage.clickPlayAudioButton();
        await expect(this.homePage.minimizeButton).toBeVisible();
        await this.homePage.clickMinimizeButton();
        await expect(this.homePage.maximizeButton).toBeVisible();
    }

    // Click like/love button
    async clickLikeLoveButton(): Promise<void> {
        await expect(this.homePage.likeButton).toBeVisible();

        for(let i = 0; i < 2; i++) {
            if(await this.page.locator('button:has(img[src="/book/like.png"])').isVisible()){
                await this.homePage.clickLikeButton();
                await expect(this.page.getByRole('heading', {name: 'Book liked!'})).toBeVisible();
            } else if(await this.page.locator('button:has(img[src="/book/love-active.png"])').isVisible()){
                await this.homePage.clickLikeButton();
                await expect(this.page.getByRole('heading', {name: 'Book unliked'})).toBeVisible();
            }
            await this.page.waitForTimeout(2000); // Wait for 2 seconds
        }
    }

    // Click comment button
    async clickCommentButton(): Promise<void> {
        await expect(this.homePage.commentButton).toBeVisible();
        await this.homePage.clickCommentButton();

        await expect(this.page.getByRole('heading', {name: 'Comments'})).toBeVisible();
    }

    // Enter the comment
    async enterComment(comment: string): Promise<void> {
        await this.clickCommentButton();
        await this.homePage.inputComment(comment);
        await this.page.keyboard.press('Enter');

        await expect(this.page.getByText(comment)).toBeVisible();
    }

    // Like the comment
    async likeTheComment(): Promise<void> {
        await this.clickCommentButton();

        const comment = Generator.randomStringGenerator();
        await this.enterComment(comment);

        await this.homePage.clickLikeCommentButton(comment);
        await expect(this.page.getByRole('heading', {name: 'Comment liked!'})).toBeVisible();

        const styleValue = await this.homePage.getLikedCommentButton(comment).locator('img').getAttribute('class');

        expect(styleValue).toContain('opacity-100');
    }

    // Dislike the comment
    async dislikeTheComment(): Promise<void> {
        await this.clickCommentButton();

        const comment = Generator.randomStringGenerator();
        await this.enterComment(comment);

        await this.homePage.clickLikeCommentButton(comment);
        await expect(this.page.getByRole('heading', {name: 'Comment liked!'})).toBeVisible();

        const styleValue = await this.homePage.getLikedCommentButton(comment).locator('img').getAttribute('class');

        expect(styleValue).toContain('opacity-100');
    }

    // Share the book
    async shareTheBook(): Promise<void> {
        const shareBefore = await this.homePage.getShareCount();
        await this.homePage.clickShareButton();
        await this.page.waitForTimeout(2000);
        const shareAfter = await this.homePage.getShareCount();

        expect(Number(shareAfter)).toBeGreaterThan(Number(shareBefore));
    }

    // Click save the book
    async clickSaveTheBook(): Promise<void> {
        let styleValue = await this.page.locator('button:has(img[src="/book/bookmark.png"])').getAttribute('style');

        for(let i = 0; i < 2; i++) {
            if(styleValue === '' || styleValue === null){
                await this.homePage.clickBookmarkButton();
                await expect(this.page.getByRole('heading', {name: 'Book bookmarked!'})).toBeVisible();
            } else if (styleValue !== '') {
                await this.homePage.clickBookmarkButton();
                await expect(this.page.getByRole('heading', {name: 'Bookmark removed'})).toBeVisible();
            }
            await this.page.waitForTimeout(2000); // Wait for 2 seconds
        }
    }

    // Click my library page
    async clickMyLibraryPage(): Promise<void> {
        await this.homePage.clickMyLibraryButton();
        const buttonClass = await this.homePage.myLibraryButton.getAttribute('class');
        expect(buttonClass).toContain('bg-[#379777]');
    }

    // Search for saved books
    async searchForSavedBooks(value: string): Promise<void> {
        await this.homePage.clickMyLibraryButton();
        await this.homePage.inputSearch(value);
        await expect(this.page.getByRole('heading', {name: value})).toBeVisible();
    }

    // Filter by recently added
    async filterByRecentlyAdded(): Promise<void> {
        await this.homePage.clickMyLibraryButton();
        await this.homePage.clickFilterButton();
        await this.homePage.clickRecentlyAddedFilter();
    }

    // Click search button
    async clickSearchButton(): Promise<void> {
        await this.homePage.clickSearchButton();
        await expect(this.page.locator('button:has(img[src="/menu/explore-active.png"])')).toBeVisible();
    }

}