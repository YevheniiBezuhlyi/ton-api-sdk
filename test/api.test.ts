import TonCenterApiSdk from '../src/index';
import { setTimeout } from 'timers/promises';

const sdk = new TonCenterApiSdk('https://toncenter.com');

// Simple rate limiter
const rateLimiter = {
	lastCallTime: 0,
	async limit() {
		const now = Date.now();
		const timeSinceLastCall = now - this.lastCallTime;
		if (timeSinceLastCall < 1000) {
			await setTimeout(1000 - timeSinceLastCall);
		}
		this.lastCallTime = Date.now();
	}
};

describe('TonCenter API Tests', () => {
	// V2 API Tests
	describe('V2 API', () => {
		test('getAddressInformation', async () => {
			await rateLimiter.limit();
			const result = await sdk.v2.getAddressInformation('EQCkR1cGmnsE45N4K0otPl5EnxnRakmGqeJUNua5fkWhales');
			expect(result.ok).toBe(true);
			expect(result.result).toBeDefined();
		});

		test('getTransactions', async () => {
			await rateLimiter.limit();
			const result = await sdk.v2.getTransactions('EQCkR1cGmnsE45N4K0otPl5EnxnRakmGqeJUNua5fkWhales', 5);
			expect(result.ok).toBe(true);
			expect(Array.isArray(result.result)).toBe(true);
		});
	});

	// V3 API Tests
	describe('V3 API', () => {
		test('getAccountStates', async () => {
			await rateLimiter.limit();
			const result = await sdk.v3.getAccountStates(['EQCkR1cGmnsE45N4K0otPl5EnxnRakmGqeJUNua5fkWhales']);
			expect(result.accounts).toBeDefined();
			expect(result.address_book).toBeDefined();
		});

		test('getTransactions', async () => {
			await rateLimiter.limit();
			const result = await sdk.v3.getTransactions({ account: ['EQCkR1cGmnsE45N4K0otPl5EnxnRakmGqeJUNua5fkWhales'], limit: 5 });
			expect(result.transactions).toBeDefined();
			expect(result.address_book).toBeDefined();
		});

		test('getJettonMasters', async () => {
			await rateLimiter.limit();
			const result = await sdk.v3.getJettonMasters({ limit: 5 });
			expect(result.jetton_masters).toBeDefined();
			expect(result.address_book).toBeDefined();
		});

		test('getNftItems', async () => {
			await rateLimiter.limit();
			const result = await sdk.v3.getNftItems({ limit: 5 });
			expect(result.nft_items).toBeDefined();
			expect(result.address_book).toBeDefined();
		});
	});
});