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
   cd playwright-framework
2. Install dependencies:
  npm install
  npm playwright install
  npm install cross-env --save-dev
3. Install the Allure CLI (optional, for generating Allure reports):
   npm install -g allure-commandline --save-dev
4. Configuration
   The Playwright configuration is located in playwright.config.js
5. Environment Management
Test data is stored in the .env file. 
6. Scripts
   Run Tests: Execute test with these commands
   npm run test   # script to run all tests.
   npm run test:ci  # script used to run all tests in CI/CD.
   npm run test:headed # script to run all tests in headed mode.
   npm run allure:generate  # script generate allure report after running a test in CLI.
   npm run allure:open      # script to open allure the generated allure report.
   npm run test:allure      # script to run all test in CLI and generate allure report after running a test.
   report
7. Continuous Integration (CI)
   The framework is designed to be integrated with CI tools like Github Actions. The playwright.config.js is configured to support CI environments, ensuring tests run reliably on CI/CD pipelines.
8. Version Control
   The project uses Git for version control. Please make sure that all changes are committed and pushed to the repository to keep the CI/CD pipeline up-to-date.

Best Practices
Keep Tests Modular: Use the Page Object Model to separate concerns and make tests easier to maintain.
Use Environment-Specific Data:
Regularly Update Dependencies: Keep your project dependencies up-to-date to ensure compatibility with Playwright and other tools.
Continuous Integration: Integrate with CI tools to automate the execution of tests on each code push.

   
