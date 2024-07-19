import { loggedPageTest as test } from '../../fixtures/loggedPage';

test('log as user', async ({ adminPage }) => {
	await adminPage.pause();
});

test('log as guest', async ({ guestPage }) => {
	await guestPage.pause();
});

test.only('log from storageState', async ({ storagePage }) => {
	await storagePage.goto('/');
	await storagePage.pause();
});
