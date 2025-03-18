import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 120000,
  retries: process.env.CI ? 1 : 1,
  workers: process.env.CI ? 1 : undefined,
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
  },

  expect: {
    timeout: 120000,
  },

  projects: [
    {
      name: 'Chrome',
      use: { browserName: 'chromium' },
    },
    // {
    //   name: 'Firefox',
    //   use: { browserName: 'firefox' },
    // },
    // {
    //   name: 'WebKit',
    //   use: { browserName: 'webkit' },
    // },
  ],
};

export default config;