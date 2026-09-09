# Allure Report Setup for this Playwright Project

This project is located at `c:\Users\Surya-LAPTOP\Desktop\playwrightCode\automationPractice` and follows the standard Playwright layout used by this repo:

- `playwright.config.ts` at the project root
- test files in `tests/`
- page objects in `pages/`
- fixtures in `fixture/`
- user data in `testdata/`
- browser automation in `utils/`

The current config already points to `./tests` and uses the SauceDemo base URL, so the main step is adding the Allure reporter and generating the report output.

## Prerequisites

- Node.js and npm are installed
- Playwright dependencies are already installed in the repo
- The Allure CLI is available on the `PATH`

Check the tools with:

```powershell
node --version
npm --version
npx playwright --version
allure --version
```

## 1) Open the project folder

```powershell
cd c:\Users\Surya-LAPTOP\Desktop\playwrightCode\automationPractice
```

## 2) Install Allure packages

Install the Playwright adapter:

```powershell
npm install --save-dev allure-playwright
```

Install the Allure command-line tool if it is not already present:

```powershell
npm install --global allure-commandline
```

## 3) Update Playwright config

The project config is in `playwright.config.ts` and currently uses the HTML reporter. Add the Allure reporter alongside it:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [
    ['html'],
    ['allure-playwright'],
  ],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

This will produce raw Allure results in the default output folder used by the adapter.

## 4) Add npm scripts

Update `package.json` with scripts similar to the following:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:allure": "playwright test",
    "allure:generate": "allure generate allure-results --clean -o allure-report",
    "allure:open": "allure open allure-report",
    "test:allure:report": "npm run test:allure && npm run allure:generate"
  }
}
```

## 5) Add generated folders to `.gitignore`

If `.gitignore` exists, add:

```text
/allure-results/
/allure-report/
```

## 6) Run the tests and generate the report

Run the full suite:

```powershell
npm run test:allure:report
```

This will:

1. Run all tests in `tests/`
2. Create raw Allure results from the test execution
3. Generate a static HTML report in `allure-report/`

To run the steps separately:

```powershell
npm run test:allure
npm run allure:generate
```

Open the generated report:

```powershell
npm run allure:open
```

The report entry point is:

```text
allure-report/index.html
```

## 7) Useful commands for this repo

Run only the auth tests:

```powershell
npx playwright test tests/auth
npm run allure:generate
npm run allure:open
```

List all discovered tests:

```powershell
npx playwright test --list
```

Regenerate the report from the latest results:

```powershell
npm run allure:generate
```

## 8) Troubleshooting

- `allure is not recognized`: install `allure-commandline` globally and restart the terminal.
- Empty report: make sure the tests ran and the `allure-results` folder was created.
- Stale HTML output: delete `allure-results` and `allure-report`, then rerun the generation step.
- Browser launch errors: install browsers with `npx playwright install`.

## Notes for this project structure

This repository uses the following relevant paths:

- Config: `playwright.config.ts`
- Tests: `tests/`
- Auth tests: `tests/auth/`
- Catalog tests: `tests/catalog/`
- Pages: `pages/`
- Fixtures: `fixture/`
- Users: `testdata/users.ts`
- Utilities: `utils/`

Those paths are the ones to use when running targeted tests or when troubleshooting failed test results.
