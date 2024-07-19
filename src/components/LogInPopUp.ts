import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class LogInPopUp extends BaseComponent {
	protected readonly _emailInput: Locator;
	protected readonly _passwordlInput: Locator;
	protected readonly _loginBtn: Locator;

	constructor(page: Page) {
		super(page, page.locator('app-signin-modal'));
		this._emailInput = this._container.locator('#signinEmail');
		this._passwordlInput = this._container.locator('#signinPassword');
		this._loginBtn = this._container.getByRole('button', { name: 'Login' });
	}
	async login(login: string, pass: string) {
		await this._emailInput.fill(login);
		await this._passwordlInput.fill(pass);
		await this._loginBtn.click();
	}
}
