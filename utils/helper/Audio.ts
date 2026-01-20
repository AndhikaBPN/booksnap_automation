import { Page } from '@playwright/test';

export class Audio {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async isPlaying(): Promise<boolean> {
        const playing = await this.page.evaluate(() => {
            // @ts-ignore
            const audio = document.querySelector('audio') as HTMLAudioElement;
            return !audio.paused;
        });
        console.log(`Audio playing state: ${playing}`);
        return playing;
    }

    async isPaused(): Promise<boolean> {
        const paused = await this.page.evaluate(() => {
            // @ts-ignore
            const audio = document.querySelector('audio') as HTMLAudioElement;
            return audio.paused;
        });
        console.log(`Audio paused state: ${paused}`);
        return paused;
    }

    async getCurrTimeBefore(): Promise<number | bigint> {
        const currTimeBefore = await this.page.evaluate(() => {
            // @ts-ignore
            const audio = document.querySelector('audio') as HTMLAudioElement;
            return audio.currentTime;
        });
        return currTimeBefore;
    }

    async getCurrTimeAfter(): Promise<number | bigint> {
        const currTimeAfter = await this.page.evaluate(() => {
            // @ts-ignore
            const audio = document.querySelector('audio') as HTMLAudioElement;
            return audio.currentTime;
        });
        return currTimeAfter;
    }
}