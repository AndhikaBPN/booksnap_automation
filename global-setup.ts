import fs from 'fs';

async function globalSetup() {
    console.log('Running global setup...');

    if (fs.existsSync('allure-results')) {
        fs.rmSync('allure-results', { recursive: true, force: true });
        console.log('Old allure-results removed');
    }

    console.log('Global setup completed');
}

export default globalSetup;
