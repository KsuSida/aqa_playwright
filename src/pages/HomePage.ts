import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { RegistrationPage } from './RegistrationPage';

export class HomePage extends BasePage {
	protected readonly _header: Locator;
	protected readonly _signInBtn: Locator;
	protected readonly _registrationBtn: Locator;

	constructor(page: Page) {
		super(page, '/');
		this._header = this._page.locator('.header');
		this._signInBtn = this._header.getByRole('button', { name: 'Sign In' });
		this._registrationBtn = this._page.getByRole('button', { name: 'Registration' });
	}

	async registrationClick() {
		await this._signInBtn.click();
		await this._registrationBtn.click();
		return new RegistrationPage(this._page);
	}
}
