import { Page, test } from '@playwright/test';
import { GaragePage } from '../src/pages/GaragePage';

export const loggedGaragePageTest = test.extend<{ userGaragePage: GaragePage }>({
	userGaragePage: async ({ browser }, use) => {
		const page = await browser.newPage({ storageState: 'session-storage.json' });
		const garagePage = new GaragePage(page);
		await use(garagePage);
	},
});

// import { Page, test } from '@playwright/test';

// export const loggedGaragePageTest = test.extend<{ userGaragePage: Page }>({
// 	userGaragePage: async ({ browser }, use) => {
// 		const pageStorage = await browser.newPage({ storageState: 'session-storage.json' });
// 		await use(pageStorage);
// 	},
// });
