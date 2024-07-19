// import { Locator, Page } from '@playwright/test';
// import { BasePage } from './BasePage';
// import { RegistrationPage } from './RegistrationPage';

// export class HomePage extends BasePage {
// 	protected readonly _header: Locator;
// 	protected readonly _signInBtn: Locator;
// 	protected readonly _registrationBtn: Locator;

// 	constructor(page: Page) {
// 		super(page, '/');
// 		this._header = this._page.locator('.header');
// 		this._signInBtn = this._header.getByRole('button', { name: 'Sign In' });
// 		this._registrationBtn = this._page.getByRole('button', { name: 'Registration' });
// 	}

// 	async registrationClick() {
// 		await this._signInBtn.click();
// 		await this._registrationBtn.click();
// 		return new RegistrationPage(this._page);
// 	}
// }

import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { GaragePage } from './GaragePage';
import { LogInPopUp } from '../components/LogInPopUp';

export class HomePage extends BasePage {
	protected readonly _header: Locator;
	protected readonly _guestLogInBtn: Locator;
	protected readonly _signInBtn: Locator;
	protected readonly _logInPopUp: LogInPopUp;

	constructor(page: Page) {
		super(page, '/');
		this._header = this._page.locator('.header');
		this._guestLogInBtn = this._header.getByRole('button', { name: 'Guest log in' });
		this._signInBtn = this._header.getByRole('button', { name: 'Sign in' });
		this._logInPopUp = new LogInPopUp(this._page);
	}

	async loginAsGuest() {
		await this._guestLogInBtn.click();
		return new GaragePage(this._page);
	}

	async loaginAsUser(login: string, pass: string) {
		await this._signInBtn.click();
		await this._logInPopUp.login(login, pass);
	}

	get header() {
		return this._header;
	}
}
