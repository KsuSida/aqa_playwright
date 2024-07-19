import { test } from '@playwright/test';

export const userInfoTest = test.extend({
	userInfo: async ({ page }, use) => {
		const data = {
			email: 'Ksuniasida@gmail.com',
			pass: 'zHiqR52i.6iAXV',
		};
		console.log('FIXTURE BEFORE');
		await use(data);
		console.log('FIXTURE AFTER');
	},
});
