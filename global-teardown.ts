import { execSync } from 'child_process';
import fs from 'fs';
import dotenv from 'dotenv';

async function globalTeardown() {
    console.log('Running global teardown...');
    dotenv.config();

    if (process.env.USE_ALLURE !== 'true') {
        console.log('USE_ALLURE=false, skipping Allure report generation');
        return;
    }

    if (!fs.existsSync('allure-results')) {
        console.log('No allure-results found, skipping report generation');
        return;
    }

    const projectName = process.env.PROJECT_NAME || 'PROJECT';
    const formatter = new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })
    const timestamp = formatter.format(new Date())
        .replace(' ', 'T')
        .replace(/:/g, '-');

        
    const reportDir = `allure-report-${projectName}-${timestamp}`;
    const zipFile = `${reportDir}.zip`;

    console.log('Generating Allure report...');

    // Generate report
    try{
        execSync(
            `npx allure generate allure-results --clean -o ${reportDir}`,
            { stdio: 'inherit' }
        );
    } catch (error) {
        console.error('Failed to generate Allure report:', error);
        return;
    }

    // Zip report
    console.log('Zipping Allure report...');
    try {
        execSync(`zip -r ${zipFile} ${reportDir}`, {
            stdio: 'inherit',
        });
    } catch (error) {
        console.error('Failed to zip Allure report:', error);
    }

    console.log('Allure results cleaned up.');
}

export default globalTeardown;