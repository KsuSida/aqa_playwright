import { Page, test } from '@playwright/test';

export const loggedGaragePageTest = test.extend<{ userGaragePage: Page }>({
	userGaragePage: async ({ browser }, use) => {
		const pageStorage = await browser.newPage({ storageState: 'session-storage.json' });
		await use(pageStorage);
	},
});
