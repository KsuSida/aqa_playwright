import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './tests',
	/* Run tests in files in parallel */
	fullyParallel: false,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

	// testIgnore: '**.skip.spec.ts',
	testMatch: '**.spec.ts',
	// grep: new RegExp('has title'),

	outputDir: 'test-results',
	timeout: 50_000,
	// globalSetup: 'global-setup.ts',
	// globalTeardown: 'global-teardown.ts',

	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		// baseURL: 'http://127.0.0.1:3000',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
		// screenshot: 'on',
		// video: 'on',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'automation',
			// testDir: '',
			testMatch: '**.spec.ts',
			use: {
				headless: false,
				baseURL: 'https://qauto.forstudy.space/',
				httpCredentials: {
					username: 'guest',
					password: 'welcome2qauto',
				},
				// ...devices['Desktop Chrome']
			},
		},
	],

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   url: 'http://127.0.0.1:3000',
	//   reuseExistingServer: !process.env.CI,
	// },
});
