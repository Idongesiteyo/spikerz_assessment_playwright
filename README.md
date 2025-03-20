# Playwright Test Automation Framework

## Overview
This repository contains a Playwright-based test automation framework implemented using the Page Object Model (POM) design pattern. The framework is designed to be scalable, maintainable, and easy to use for testing web applications across different environments.

## Features
- **Playwright**: Automates browser interactions and supports multiple browsers (Chromium, Firefox, WebKit).
- **Page Object Model (POM)**: Separates test logic from page interactions, making tests easier to maintain.
- **Test Data Management**: Supports reading test data from the .env file in the root folder.
- **Data Storage**: There's an options to integrate CSV and Excel files.
- **Allure Reporting**: Integrated Allure for detailed, visual test reports.
- **Continuous Integration (CI)**: Configured to work with GitHub for CI/CD pipeline integration.
- **Custom Scripts**: Includes scripts for running tests, generating reports, and managing environments.

# Project Structure
├── .github/ # For Github Action workflow files.
├── pages/ # Folder containing Page Object classes
├── tests/ # Folder containing all Test scripts
├── reports/ # Folder containing Test reports (JSON, Allure)
├── utils/ # Folder containing utility functions
├── .env/ # File containing test data
├── playwright.config.ts # Playwright configuration file
├── package.json # Project dependencies and scripts
└── README.md # Project documentation


## Framework Prerequisites
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

## Installation steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Idongesiteyo/spikerz_assessment_playwright.git
   cd Playwright-framework

2. Install dependencies: Ensure you have the correct Node.js version installed. Then, install all necessary dependencies by running these commands:
  npm install
  npm playwright install
  npm install cross-env --save-dev

3. Install the Allure CLI (optional, for generating Allure reports):
   npm install -g allure-commandline --save-dev

4. Configuration Overview
   The Playwright configuration is located in playwright.config.ts. Adjust the following settings as needed:
   retries (to handle flaky tests)
   timeout (customize action or test timeouts)

5. Verify Environment Variables: Ensure that the .env file exists in the root directory and is correctly configured:
   Test data is stored in the .env file. 
   BASE_URL=https://example.com
   BASIC_AUTH_USER=your_username
   BASIC_AUTH_PASS=your_password
   GOOGLE_EMAIL=your_email
   GOOGLE_PASSWORD=your_password


6. Scripts Overview: Use the following scripts to run and debug tests:
   Run Tests: Execute test with these commands
   npm run test   #  Run all tests.
   npm run test:ci  #  Run all tests in CI/CD.
   npm run test:headed # Run all tests in headed mode (with browser UI).
   npm run allure:generate  # script generate allure report after running a test in CLI.
   npm run allure:open      # script to open allure the generated allure report.
   npm run test:allure      # script to run all test in CLI and generate allure report after running a test.
   report

7. Continuous Integration (CI)
   The framework is designed to be integrated with CI tools like Github Actions. The playwright.config.ts is configured to support CI environments, ensuring tests run reliably on CI/CD pipelines.
   To integrate with CI, create a new file in the .github/workflows directory and add your .yml workflfow configurtion file.
   Example of a workflow file: .github/workflows/playwright.yml

8. Version Control
   The project uses Git for version control. Please make sure that all changes are committed and pushed to the repository to keep the CI/CD pipeline up-to-date.

9. Troubleshooting Guide:
   Missing Dependencies: Run npm install if dependencies are missing.
   Browser Not Found: Use npx playwright install to install browsers.
   .env File Missing: Create a .env file in the root directory and add the required environment variables.
   Google CAPTCHA Fails in Headless Mode: Run tests in headed mode to bypass CAPTCHA: npm run test:headed
   Allure Report Not Generating: Install Allure CLI globally, npm install -g allure-commandline.
   GitHub Actions Failing: 
    Check the playwright.config.ts file for proper CI/CD configuration.
    Verify that environment variables are set correctly in the GitHub Actions workflow.
    Use retries: process.env.CI ? 2 : 0 to handle flaky tests in CI.
   Debugging Tips: 
    Enable Traces: Use trace: 'on-first-retry' in playwright.config.ts to capture detailed test execution data.
    Capture Logs: Use page.on('console') to log console messages during test execution.
    Check Reports: Review screenshots, videos, or Allure reports for visual debugging.
    
10. Best Practices
   Keep Tests Modular: Use the Page Object Model to separate concerns and make tests easier to maintain.
   Use Environment-Specific Data:
   Regularly Update Dependencies: Keep your project dependencies up-to-date to ensure compatibility with Playwright and other tools.
   Continuous Integration: Integrate with CI tools to automate the execution of tests on each code push.

   
