import dotenv from 'dotenv';
import { defineConfig } from '@playwright/test';

dotenv.config();

// default reporter
const reporters: any[] = [
    ['html', { open: 'never' }]
];

// allure-report
if(process.env.USE_ALLURE === 'true') {
    reporters.push(['allure-playwright']);
}

export default defineConfig({
    retries: process.env.CI ? 2 : 0,
    reporter: reporters,
    use: {
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        baseURL: process.env.BASE_URL,
        headless: true,
    },
})