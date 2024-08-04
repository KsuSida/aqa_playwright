import { expect, Page } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { RESPONSE_PROFILE } from '../../src/constants';
import { loggedGaragePageTest as test } from '../../fixtures/userGaragePage';

test.describe('Test route api', () => {
	let homePage: HomePage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		page.route('**/api/users/profile', async (route) =>
			route.fulfill({
				status: 200,
				json: RESPONSE_PROFILE,
			})
		);
		await homePage.open();
	});

	test('check profile names', async ({ userGaragePage, page }) => {
		await page.goto('/panel/profile');
		await expect(
			page.getByText(`${process.env.CHANGE_PROFILE_NAME} ${process.env.CHANGE_ROFILE_LASTNAME}`)
		).toBeVisible();
	});
});
