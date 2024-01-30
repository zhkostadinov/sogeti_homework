# Project structure
`pages` - POM for different pages

`tests`
   - `api_tests`
      API tests
   - `web_tests`
      Web tests

`playwright-report`- HTML execution report    

`tests-data`- test data that is used among the tests

`utils`- helper files

`playwright.config.js`- main configuartion for Playwright ruuner
        
# Dependencies
`npm v6.14.7`

`node v14.21.0`

# Clone Project SSH

`git clone git@github.com:zhkostadinov/sogeti_homework.git`

# Run from your project's root directory
`npm install --save-dev`

# Run tests
Check `package.json` file, section `scripts`. Every command should be executed in the project root folder under cli.

Command: `npm run tests:api` - Will run api suites/tests from task API

Command: `npm run tests:web` - Will run web suites/tests from task WEB 

Command: `npm run all` - Will run all tests with interactive mode  