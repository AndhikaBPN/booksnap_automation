import {expect, Locator, Page} from '@playwright/test';
import {HomePage, Navbar} from '../../../pages';
import { Audio } from '../../../tests/helper/Audio';

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
        const timeDifference = timeBefore - timeAfter;

        expect(timeDifference).toBeGreaterThanOrEqual(9.5);
    }

    // Click minimize/maximize
    async clickMinimizeMaximize(): Promise<void> {
        await this.homePage.clickPlayAudioButton();
        expect(this.homePage.maximizeButton).toBeVisible();
        await this.homePage.clickMinimizeButton();
        expect(this.homePage.minimizeButton).toBeVisible();
    }

    // Click like/love button
    async clickLikeLoveButton(): Promise<void> {
        expect(this.homePage.likeButton).toBeVisible();

        for(let i = 0; i < 2; i++) {
            if(await this.page.locator('button:has(img[src="/book/like.png"])').isVisible()){
                await this.homePage.clickLikeButton();
                expect(this.page.getByRole('heading', {name: 'Book liked!'})).toBeVisible();
            } else if(await this.page.locator('button:has(img[src="/book/love-active.png"])').isVisible()){
                await this.homePage.clickLikeButton();
                expect(this.page.getByRole('heading', {name: 'Book unliked'})).toBeVisible();
            }
        }
    }

    // Click comment button
    async clickCommentButton(): Promise<void> {
        expect(this.homePage.commentButton).toBeVisible();
        await this.homePage.clickCommentButton();

        expect(this.page.getByRole('heading', {name: 'Comments'})).toBeVisible();
    }
}