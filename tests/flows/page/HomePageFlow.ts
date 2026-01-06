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
        console.log(`Source before scrolling: ${srcBefore}`);

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
        console.log(`Source after scrolling: ${srcAfter}`);

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
        console.log('Play audio button clicked in Home Page Flow');

        const timeBefore = await this.audio.getCurrTimeBefore();
        console.log(`Current time before waiting: ${timeBefore}`);

        await this.homePage.clickPlayButton();
        console.log('Play button clicked in Home Page Flow');
        await this.page.waitForTimeout(5000); // Wait for 5 seconds

        const timeAfter = await this.audio.getCurrTimeAfter();
        console.log(`Current time after waiting: ${timeAfter}`);

        expect(timeAfter).toBeGreaterThan(timeBefore);
    }

    // Pause the audio
    async pauseTheAudio(): Promise<void> {
        await this.homePage.clickPlayAudioButton();
        console.log('Play audio button clicked in Home Page Flow');

        await this.homePage.clickPlayButton();
        console.log('Play button clicked in Home Page Flow');
        await this.page.waitForTimeout(5000); // Wait for 5 seconds

        await this.homePage.clickPauseButton();
        console.log('Pause button clicked in Home Page Flow');

        const timeBefore = await this.audio.getCurrTimeBefore();
        console.log(`Current time before waiting: ${timeBefore}`);
        await this.page.waitForTimeout(5000); // Wait for 5 seconds

        const timeAfter = await this.audio.getCurrTimeAfter();
        console.log(`Current time after waiting: ${timeAfter}`);

        expect(timeAfter).toBe(timeBefore);
    }

    // Fast forward 10 seconds
    async fastForward10Seconds(): Promise<void> {
        const timeBefore = await this.audio.getCurrTimeBefore();
        console.log(`Current time before fast forward: ${timeBefore}`);
    }
}