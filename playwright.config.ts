import dotenv from 'dotenv';
import {defineConfig} from '@playwright/test';
import fs from 'fs';

dotenv.config();

// default reporter
const useAllure = process.env.USE_ALLURE === 'true';

// clean allure-results
const allureResultsDir = './allure-results';
if (process.env.useAllure === 'true') {
    if (fs.existsSync(allureResultsDir)) {
        fs.rmSync(allureResultsDir, {recursive: true, force: true});
    }
}

export default defineConfig({
    retries: process.env.CI ? 2 : 0,
    reporter: useAllure ? [['allure-playwright']] : [['html', {open: 'never'}]],
    use: {
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        baseURL: process.env.BASE_URL,
        headless: true,
    },
})