import { loggedPageTest as test } from '../../fixtures/loggedPage';

test('log as user', async ({ adminPage }) => {
	await adminPage;
});

test('log as guest', async ({ guestPage }) => {
	await guestPage;
});

test('log from storageState', async ({ storagePage }) => {
	await storagePage.goto('/');
	await storagePage;
});
