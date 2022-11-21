import * as path from 'path';

import { ElectronApplication, Page, _electron as electron } from "playwright";
import { test } from "@playwright/test";
import config from '../src/config/AAD.json';

test.describe('Electron Auth Code AAD PPE Tests ', () => {
    let electronApp: ElectronApplication;
    let page: Page;

    test.beforeAll(async () => {
        electronApp = await electron.launch({
            args: [path.join(__dirname, "../dist/App.js"),
            '--enable-logging',
            '--skip-welcome',
            '--disable-telemetry',
            '--no-cached-data',
            ],
            env: {
                automation: "1",
                authConfig: JSON.stringify(config),
            }
        });
    });

    test.describe('Acquire token', () => {
        test.beforeEach(async () => {
            page = await electronApp.firstWindow();
        });

        test.afterEach(async () => {
            await page.close();
        });

        test('Acquire token by auth code', async () => {
            console.log("Success");
        });
    });
});
