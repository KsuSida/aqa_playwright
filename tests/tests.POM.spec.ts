import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { RegistrationPage } from '../src/pages/RegistrationPage';

test.describe('Registration try', () => {
	let registrationPage: RegistrationPage;

	test.beforeEach(async ({ page }) => {
		const homePage = new HomePage(page);
		await homePage.navigate();
		registrationPage = await homePage.registrationClick();
	});

	test('positve scenario-1', { tag: '@smoke' }, async ({ page }) => {
		let userName = ' Tom ';
		let lastName = ' Jerry';
		let email = 'si-tom@gmail.com';
		let password = 'Tom89012Jerry';

		await registrationPage.registrationFill(userName, lastName, email, password, password);
		await registrationPage.registrationClick();
	});

	test('negative-1: Name is invalid', { tag: '@smoke' }, async ({ page }) => {
		let userName = ' Dr. Tom ';
		let lastName = ' Jerry';
		await registrationPage.nameFill(userName, lastName);
		await expect(page.locator(`div.invalid-feedback`)).toHaveText(`Name is invalid`);
	});

	test('negative-2: name is required', { tag: '@smoke' }, async ({ page }) => {
		let userName = '';
		let lastName = '';
		await registrationPage.nameFill(userName, lastName);
		await expect(page.locator(`div.invalid-feedback`)).toHaveText(`Name required`);
	});

	test('negative-3: last name -wrong length', { tag: '@smoke' }, async ({ page }) => {
		let lastName = 'O';
		await registrationPage.surnameFill(lastName);
		await expect(page.locator(`div.invalid-feedback`)).toHaveText(
			`Last name has to be from 2 to 20 characters long`
		);
	});

	test('negative-4: wrong data for password', { tag: '@smoke' }, async ({ page }) => {
		let password = '123';
		await registrationPage.passwordFill(password);
		await expect(page.locator(`div.invalid-feedback`)).toHaveText(
			`Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter`
		);
	});

	test('negative-5: password do not match', { tag: '@smoke' }, async ({ page }) => {
		let password = 'Tom89012Jerry';
		let passwordRe = 'Tom89012Jerr';
		await registrationPage.passwordReFill(password, passwordRe);
		await expect(page.locator(`div.invalid-feedback`)).toHaveText(`Passwords do not match`);
	});
});
