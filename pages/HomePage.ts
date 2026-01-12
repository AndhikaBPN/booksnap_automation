import { Page, Locator} from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly forYouButton: Locator;
    readonly myLibraryButton: Locator;
    readonly playAudioButton: Locator;
    readonly playButton: Locator;
    readonly pauseButton: Locator;
    readonly previousButton: Locator;
    readonly maximizeButton: Locator;
    readonly minimizeButton: Locator;
    readonly nextButton: Locator;
    readonly likeButton: Locator;
    readonly commentButton: Locator;
    readonly commentInput: Locator;
    readonly shareButton: Locator;
    readonly bookmarkButton: Locator;
    readonly container: Locator;
    readonly commentContainer: Locator;
    readonly src: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly filterButton: Locator;
    readonly recentlyAddedFilter: Locator;

    constructor(page: Page) {
        this.page = page;
        this.forYouButton = page.getByRole('button', { name: 'For You' });
        this.myLibraryButton = page.getByRole('button', { name: 'My Library' });
        this.playAudioButton = page.getByRole('button', { name: 'Play Play Audio' });
        this.playButton = page.locator('button:has(img[src="/book/play.png"])');
        this.pauseButton = page.locator('button:has(img[src="/book/pause.png"])');
        this.previousButton = page.locator('button:has(img[src="/book/back.png"])');
        this.maximizeButton = page.locator('button:has(img[src="/book/maximize.png"])');
        this.minimizeButton = page.locator('button:has(img[src="/book/minimize.png"])');
        this.nextButton = page.locator('button:has(img[src="/book/next.png"])');
        this.container = page.locator('div.flex.items-center.justify-around').nth(0);
        this.likeButton = this.container.locator('button[class="flex flex-col items-center gap-1"]').nth(0);
        this.commentButton = this.container.locator('button[class="flex flex-col items-center gap-1"]').nth(1);
        this.shareButton = this.container.locator('button[class="flex flex-col items-center gap-1"]').nth(2);
        this.bookmarkButton = this.container.locator('button[class="flex flex-col items-center gap-1"]').nth(3);
        this.src = page.locator('img[class="w-full h-full object-cover pointer-events-none select-none rounded-2xl"]');
        this.commentInput = page.locator('input[placeholder="Add a comment..."]');
        this.commentContainer = page.locator('div[class="flex-1 overflow-y-auto px-4 py-3"]');
        this.searchInput = page.locator('input[placeholder="Find your favorite book..."]');
        this.filterButton = page.locator('button:has(img[src="/filter.png"])');
        this.recentlyAddedFilter = page.getByRole('button', { name: 'Recently Added' });
        this.searchButton = page.locator('button:has(img[src="/search.png"])');
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
        await this.page.waitForSelector('p:has-text("Loading book...")', { state: 'detached' });
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

    async clickPreviousButton(): Promise<void> {
        await this.previousButton.click();
        console.log('Previous button clicked');
    }

    async clickNextButton(): Promise<void> {
        await this.nextButton.click();
        console.log('Next button clicked');
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

    async clickMinimizeButton(): Promise<void> {
        await this.minimizeButton.click();
        console.log('Minimize button clicked');
    }

    async clickMaximizeButton(): Promise<void> {
        await this.maximizeButton.click();
        console.log('Maximize button clicked');
    }

    async inputComment(comment: string): Promise<void> {
        await this.commentInput.fill(comment);
        console.log('Comment input filled with: ' + comment);
    }

    async inputSearch(search: string): Promise<void> {
        await this.searchInput.fill(search);
        console.log('Search input filled with: ' + search);
    }

    async clickFilterButton(): Promise<void> {
        await this.filterButton.click();
        console.log('Filter button clicked');
    }

    async clickRecentlyAddedFilter(): Promise<void> {
        await this.recentlyAddedFilter.click();
        console.log('Recently Added filter clicked');
    }

    async clickSearchButton(): Promise<void> {
        await this.searchButton.click();
        console.log('Search button clicked');
    }
}