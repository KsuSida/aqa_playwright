import { loggedGaragePageTest as test } from '../../fixtures/userGaragePage';

test.only('user can add a car', async ({ userGaragePage }) => {
	await userGaragePage.goto('/');
	await userGaragePage.getByRole('button', { name: 'Add car' }).click();
	await userGaragePage.locator('#addCarBrand').selectOption('Porsche');
	await userGaragePage.locator('#addCarModel').selectOption('911');
	await userGaragePage.locator('input[formcontrolname="mileage"]').fill('123456');
	await userGaragePage.getByRole('button', { name: 'Add' }).click();
});
