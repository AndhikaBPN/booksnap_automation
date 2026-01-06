import { Page, Locator} from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly forYouButton: Locator;
    readonly myLibraryButton: Locator;
    readonly playAudioButton: Locator;
    readonly playButton: Locator;
    readonly pauseButton: Locator;
    readonly likeButton: Locator;
    readonly commentButton: Locator;
    readonly shareButton: Locator;
    readonly bookmarkButton: Locator;
    readonly container: Locator;
    readonly src: Locator;

    constructor(page: Page) {
        this.page = page;
        this.forYouButton = page.getByRole('button', { name: 'For You' });
        this.myLibraryButton = page.getByRole('button', { name: 'My Library' });
        this.playAudioButton = page.getByRole('button', { name: 'Play Play Audio' });
        this.playButton = page.locator('button:has(img[src="/book/play.png"])');
        this.pauseButton = page.locator('button:has(img[src="/book/pause.png"])');
        this.container = page.locator('div.flex.items-center.justify-around').nth(0);
        this.likeButton = this.container.locator('button[class="flex flex-col items-center gap-1"]').nth(0);
        this.commentButton = this.container.locator('button[class="flex flex-col items-center gap-1"]').nth(1);
        this.shareButton = this.container.locator('button[class="flex flex-col items-center gap-1"]').nth(2);
        this.bookmarkButton = this.container.locator('button[class="flex flex-col items-center gap-1"]').nth(3);
        this.src = page.locator('img[class="w-full h-full object-cover pointer-events-none select-none rounded-2xl"]');
    }

    async clickForYouButton(): Promise<void> {
        await this.forYouButton.click();
        console.log('For You button clicked');
    }

    async clickMyLibraryButton(): Promise<void> {
        await this.myLibraryButton.click();
        console.log('My Library button clicked');
    }

    async clickPlayAudioButton(): Promise<void> {
        await this.playAudioButton.click();
        console.log('Play Audio button clicked');
    }

    async clickPlayButton(): Promise<void> {
        await this.playButton.click();
        console.log('Play button clicked');
    }

    async clickPauseButton(): Promise<void> {
        await this.pauseButton.click();
        console.log('Pause button clicked');
    }

    async clickLikeButton(): Promise<void> {
        await this.likeButton.click();
        console.log('Like button clicked');
    }

    async clickCommentButton(): Promise<void> {
        await this.commentButton.click();
        console.log('Comment button clicked');
    }

    async clickShareButton(): Promise<void> {
        await this.shareButton.click();
        console.log('Share button clicked');
    }

    async clickBookmarkButton(): Promise<void> {
        await this.bookmarkButton.click();
        console.log('Bookmark button clicked');
    }

    async getLikeCount(): Promise<string> {
        const likeCount = await this.likeButton.locator('span').innerText();
        console.log('Like count retrieved: ' + likeCount);
        return likeCount || '';
    }

    async getCommentCount(): Promise<string> {
        const commentCount = await this.commentButton.locator('span').innerText();
        console.log('Comment count retrieved: ' + commentCount);
        return commentCount || '';
    }

    async getShareCount(): Promise<string> {
        const shareCount = await this.shareButton.locator('span').innerText();
        console.log('Share count retrieved: ' + shareCount);
        return shareCount || '';
    }

    async getBookmarkCount(): Promise<string> {
        const bookmarkCount = await this.bookmarkButton.locator('span').innerText();
        console.log('Bookmark count retrieved: ' + bookmarkCount);
        return bookmarkCount || '';
    }

    async getSrcValue(): Promise<string> {
        const srcValue = await this.src.getAttribute('src');
        console.log('Src attribute value retrieved: ' + srcValue);
        return srcValue || '';
    }

    async getSrcValueByIndex(index: number): Promise<string> {
        const srcValue = await this.src.nth(index).getAttribute('src');
        console.log(`Src attribute value at index ${index} retrieved: ` + srcValue);
        return srcValue || '';
    }

}