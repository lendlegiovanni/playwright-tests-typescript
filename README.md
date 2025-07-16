# playwright-tests-typescript

This repository primarily contains the playwright tests including the Balsam Hill tests, page objects and helper classes
 
### Playwright Setup
 
1. **Install Playwright**
 
   Run the following command to install Playwright as a development dependency:
   'npm i --save-dev @playwright/test'
 
   Additionally, you may need to install the required browsers. This can be done with the command:
   'npx playwright install chromium firefox webkit'
 
2. **Install VSCode Extensions**
 
   Install the following extensions in VSCode:
   - **Playwright Test for VSCode**
   - **Playwright Trace Viewer for VSCode**
 
   Ensure both are updated to the latest version.
 
3. **Load Tests in VSCode**
 
   The 'Testing' tab should be available on the left side of VSCode, and all tests should be loaded automatically.
 
   - If some projects do not appear in the testing tab, check the Playwright configuration section below the testing tab. 
     Here, you can toggle the visibility of project configuration files and select testing profiles as needed.
 
### Main Project Folder Structure
 
- **Tests**: All tests are stored under `tests/`.
- **Pages and Components**: These are stored under `tests/pages`.
- **Data and Routes**: Data and routes for tests are stored in `tests/test-helpers`.

### Testing
 
For our tests, a `.env` file must be created at the root folder with the following data:

BALSAMHILL_URL=https://www.balsamhill.com
