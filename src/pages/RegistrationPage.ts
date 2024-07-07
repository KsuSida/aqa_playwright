import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HomePage } from './HomePage';

export class RegistrationPage extends BasePage {
	protected readonly _nameField: Locator;
	protected readonly _lastNameField: Locator;
	protected readonly _emailField: Locator;
	protected readonly _passwordField: Locator;
	protected readonly _repasswordField: Locator;
	protected readonly _registerBtn: Locator;
	protected readonly _errorMess: Locator;

	constructor(page: Page) {
		super(page, '/');
		this._nameField = this._page.locator(`#signupName`);
		this._lastNameField = this._page.locator(`#signupLastName`);
		this._emailField = this._page.locator(`#signupEmail`);
		this._passwordField = this._page.locator(`#signupPassword`);
		this._repasswordField = this._page.locator(`#signupRepeatPassword`);
		this._registerBtn = this._page.getByRole('button', { name: 'Register' });
		this._errorMess = page.locator(`div.invalid-feedback`);
	}

	async registrationFill(name?: string, lastName?: string, email?: string, password?: string, repassword?: string) {
		if (name !== undefined) {
			await this._nameField.fill(name.trim());
		} else {
			await this._nameField.fill('');
		}
		if (lastName !== undefined) {
			await this._lastNameField.fill(lastName.trim());
		} else {
			await this._lastNameField.fill('');
		}
		if (email !== undefined) {
			await this._emailField.fill(email);
		} else {
			await this._emailField.fill('');
		}
		if (password !== undefined) {
			await this._passwordField.fill(password);
		} else {
			await this._passwordField.fill('');
		}
		if (repassword !== undefined) {
			await this._repasswordField.fill(repassword);
		} else {
			await this._repasswordField.fill('');
		}
	}

	async nameFill(name: string, lastName?: string) {
		await this._nameField.fill(name.trim());
		if (lastName !== undefined) {
			await this._lastNameField.fill(lastName.trim());
		} else {
			await this._lastNameField.fill('');
		}
	}

	async surnameFill(lastName: string, email?: string) {
		await this._lastNameField.fill(lastName.trim());
		if (email !== undefined) {
			await this._emailField.fill(email);
		} else {
			await this._emailField.fill('');
		}
	}

	async passwordFill(password: string, repassword?: string) {
		await this._passwordField.fill(password);
		if (repassword !== undefined) {
			await this._repasswordField.fill(repassword);
		} else {
			await this._repasswordField.fill('');
		}
	}

	async passwordReFill(password: string, repassword: string) {
		await this._passwordField.fill(password);
		await this._repasswordField.fill(repassword);
		await this._passwordField.click();
	}

	async registrationClick() {
		await this._registerBtn.click();
	}
}
