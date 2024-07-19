import { Page, test } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';

export const loggedPageTest = test.extend<{ adminPage: Page; guestPage: Page; storagePage: Page }>({
	adminPage: async ({ page }, use) => {
		const USER = process.env.APP_USER_EMAIL!;
		const PASS = process.env.APP_USER_PASS!;

		const homePage = new HomePage(page);
		await homePage.navigate();
		await homePage.loaginAsUser(USER!, PASS!);
		await page.getByRole('button', { name: 'Add car' }).waitFor();
		await use(page);
	},
	guestPage: async ({ page }, use) => {
		const homePage = new HomePage(page);
		await homePage.navigate();
		await homePage.loginAsGuest();
		await page.getByRole('button', { name: 'Add car' }).waitFor();
		await use(page);
	},
	storagePage: async ({ browser }, use) => {
		const pageStorage = await browser.newPage({ storageState: 'session-storage.json' });
		await use(pageStorage);
	},
});
