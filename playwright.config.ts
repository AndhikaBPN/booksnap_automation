import dotenv from 'dotenv';
import {defineConfig} from '@playwright/test';
import fs from 'fs';

// load env file from .env file
dotenv.config();

// default reporter
const useAllure = process.env.USE_ALLURE === 'true';
const runTest = process.env.RUN_TEST;

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
    testMatch: runTest ? [`**/${runTest}.spec.ts`] : [`**/*.spec.ts`],
    globalTeardown: './global-teardown',
    use: {
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        baseURL: process.env.BASE_URL,
        headless: true,
    },
})