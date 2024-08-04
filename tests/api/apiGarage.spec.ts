import { test, expect, request } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test.describe('Garage API /cars', () => {
	let sid: string;

	test.beforeEach(async ({ request }) => {
		const authRequest = await request.post('api/auth/signin', {
			data: {
				email: process.env.APP_USER_EMAIL,
				password: process.env.APP_USER_PASS,
				remember: true,
			},
		});
		const cookies = authRequest.headers()['set-cookies'];
		if (cookies!) {
			const cookiesArray = cookies.split('/n');
			for (let cookie of cookiesArray) {
				if (cookie.trim().startsWith('sid=')) {
					sid = cookie.trim().split('=')[1].split(';')[0];
					break;
				}
			}
		}
	});

	test('Positive. Add car', async ({ request }) => {
		const response = await request.post('/api/cars', {
			headers: {
				Cookies: 'sid=${sid}',
			},
			data: {
				carBrandId: 1,
				carModelId: 1,
				mileage: 150,
			},
		});
		expect(response.status()).toBe(201);
	});

	test('Negative. Non-existing model', async ({ request }) => {
		const response = await request.post('/api/cars', {
			headers: {
				Cookies: 'sid=${sid}',
			},
			data: {
				carBrandId: 1,
				carModelId: 9,
				mileage: 150,
			},
		});
		expect(response.status()).toBe(404);
	});

	test('Negative. String as Mileage', async ({ request }) => {
		const response = await request.post('/api/cars', {
			headers: {
				Cookies: 'sid=${sid}',
			},
			data: {
				carBrandId: 1,
				carModelId: 9,
				mileage: 'lilia',
			},
		});
		expect(response.status()).toBe(400);
	});
});
