import test from '@playwright/test';
// import { HomePage } from '../../src/pages/HomePage';
import { GaragePage } from '../../src/pages/GaragePage';

// const USER = process.env.APP_USER_EMAIL!;
// const PASS = process.env.APP_USER_PASS!;

test.describe('Check storage', async () => {
	// test.beforeEach(async ({ page }) => {
	// 	const homePage = new HomePage(page);
	// 	await homePage.navigate();
	// 	await homePage.loaginAsUser(USER!, PASS!);
	// });

	test('create car', async ({ page }) => {
		const garagePage = new GaragePage(page);
		await garagePage.navigate();
		await garagePage.addCar('Porsche', '911', 12345);
		await page.pause();
	});
});
