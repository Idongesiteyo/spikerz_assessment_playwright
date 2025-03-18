const fs = require('fs');
const path = require('path');

const resultsPath = path.join(__dirname, 'allure-results');

if (fs.existsSync(resultsPath)) {
  fs.rmdirSync(resultsPath, { recursive: true });
  console.log('Deleted allure-results folder');
} else {
  console.log('No allure-results folder found');
}