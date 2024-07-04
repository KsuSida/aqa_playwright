import { test, expect } from '@playwright/test';

test('positve scenario-1', { tag: '@smoke' }, async ({ page }) => {
	await page.goto('/');
	// click Registration button
	const header = page.locator('.header');
	await header.getByRole('button', { name: 'Sign In' }).click();
	await page.getByRole('button', { name: 'Registration' }).click();

	// fill Name
	let userName = ' Tom ';
	let userNameTrimmed = userName.trim();
	await page.locator(`#signupName`).fill(userNameTrimmed);

	// fill Last Name
	let lastName = ' Jerry';
	let lastNameTrimmed = lastName.trim();
	await page.locator(`#signupLastName`).fill(lastNameTrimmed);

	// fill e-mail
	let email = 'si-tom@gmail.com';
	await page.locator(`#signupEmail`).fill(email);

	//fill password
	let password = 'Tom89012Jerry';
	await page.locator(`#signupPassword`).fill(password);
	await page.locator(`#signupRepeatPassword`).fill(password);

	//click Register
	await page.getByRole('button', { name: 'Register' }).click();
});

test('negative-1: Name is invalid', { tag: '@smoke' }, async ({ page }) => {
	await page.goto('/');
	// click Registration button
	const header = page.locator('.header');
	await header.getByRole('button', { name: 'Sign In' }).click();
	await page.getByRole('button', { name: 'Registration' }).click();

	// fill Name
	let userName = ' Dr. Tom ';
	let userNameTrimmed = userName.trim();
	await page.locator(`#signupName`).fill(userNameTrimmed);

	let lastName = ' Jerry';
	let lastNameTrimmed = lastName.trim();
	await page.locator(`#signupLastName`).fill(lastNameTrimmed);

	await expect(page.locator(`div.invalid-feedback`)).toHaveText(`Name is invalid`);
});

test('negative-2: name is required', { tag: '@smoke' }, async ({ page }) => {
	await page.goto('/');
	// click Registration button
	const header = page.locator('.header');
	await header.getByRole('button', { name: 'Sign In' }).click();
	await page.getByRole('button', { name: 'Registration' }).click();

	await page.locator(`#signupName`).click();
	await page.locator(`#signupLastName`).click();

	await expect(page.locator(`div.invalid-feedback`)).toHaveText(`Name required`);
});

test('negative-3: last name -wrong length', { tag: '@smoke' }, async ({ page }) => {
	await page.goto('/');
	// click Registration button
	const header = page.locator('.header');
	await header.getByRole('button', { name: 'Sign In' }).click();
	await page.getByRole('button', { name: 'Registration' }).click();

	// fill Last Name
	let lastName = 'O';
	await page.locator(`#signupLastName`).fill(lastName);

	await page.locator(`#signupEmail`).click();
	await expect(page.locator(`div.invalid-feedback`)).toHaveText(`Last name has to be from 2 to 20 characters long`);
});

test('negative-4: wrong data for password', { tag: '@smoke' }, async ({ page }) => {
	await page.goto('/');
	// click Registration button
	const header = page.locator('.header');
	await header.getByRole('button', { name: 'Sign In' }).click();
	await page.getByRole('button', { name: 'Registration' }).click();

	let password = '123';
	await page.locator(`#signupPassword`).fill(password);
	await page.locator(`#signupRepeatPassword`).click();

	await expect(page.locator(`div.invalid-feedback`)).toHaveText(
		`Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter`
	);
});

test('negative-5: password do not match', { tag: '@smoke' }, async ({ page }) => {
	await page.goto('/');
	// click Registration button
	const header = page.locator('.header');
	await header.getByRole('button', { name: 'Sign In' }).click();
	await page.getByRole('button', { name: 'Registration' }).click();

	let password = 'Tom89012Jerry';
	let passwordRe = 'Tom89012Jerr';
	await page.locator(`#signupPassword`).fill(password);
	await page.locator(`#signupRepeatPassword`).fill(passwordRe);
	await page.locator(`#signupPassword`).click();

	await expect(page.locator(`div.invalid-feedback`)).toHaveText(`Passwords do not match`);
});
