# Project structure
`pages`
    POM for different pages
`tests`
   `api_tests`
    API tests
   `web_tests`
    Web tests
`playwright-report`
    HTML execution report    
`tests-data`
    test data that is used among the tests
`utils`           
    helper files
`playwright.config.js`
    main configuartion for Playwright ruuner
        
# Dependencies
npm  --> 6.14.7
node --> 14.21.0

# Clone Project

# Run from your project's root directory
npm install --save-dev

# Run tests
Check `package.json` file, section `scripts`. Every command shoumd be executed in the root folder under cli.
Command: `npm run tests:api`
 - Will run api tests from task API 1
Command: `npm run tests:api:testdriven`
 - Will run api tests from task API 2 
Command: `npm run tests:web`
 - Will run Playwright interactive mode, then we can pick and run test WEB suites/tests 
Command: `npm run tests:all`
 - Will run Playwright interactive mode, then we can pick and run test suites/tests
Command: `npm run tests`
 - Will run all tests in silent mode  