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
    const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, '-');

        
    const reportDir = `allure-report-${projectName}-${timestamp}`;
    const zipFile = `${reportDir}.zip`;

    console.log('Generating Allure report...');

    // Generate report
    try{
        execSync(
            `allure generate allure-results --clean -o ${reportDir}`,
            { stdio: 'inherit' }
        );
    } catch (error) {
        console.error('Failed to generate Allure report:', error);
        return;
    }

    // Zip report
    console.log('Zipping Allure report...');
    execSync(`zip -r ${zipFile} ${reportDir}`, {
        stdio: 'inherit',
    });

    // Auto open report (LOCAL ONLY)
    if (process.env.AUTO_OPEN_REPORT === 'true' && !process.env.CI) {
        console.log('Opening Allure report locally...');
        execSync(`allure open ${reportDir}`, { stdio: 'inherit' });
    }

    console.log('Allure results cleaned up.');
}

export default globalTeardown;