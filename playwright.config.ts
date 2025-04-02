import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 90000,
  retries: process.env.CI ? 1 : 1,
  workers: process.env.CI ? 1 : 1,
  fullyParallel: false,
  reporter: [
    ['list'],
    ['allure-playwright'], 
    ['json', { outputFile: 'reports/report.json' }],
    ['html', { outputFolder: 'reports/html', open: 'never' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://demo.spikerz.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    actionTimeout: 90000,
    navigationTimeout: 90000,
    headless: true,
    launchOptions: {
      args: [
        '--disable-blink-features=AutomationControlled',
        '--disable-features=IsolateOrigins,site-per-process',
        '--disable-site-isolation-trials',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins',
        '--disable-site-isolation-trials'
      ]
   },
  },

  expect: {
    timeout: 60000,
  },

  projects: [
    {
      name: 'Chrome',
      use: { browserName: 'chromium' },
    },
  ],


};

export default config;