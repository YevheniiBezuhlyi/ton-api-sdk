import {
	V2AddressInformation,
	V2ApiResponse,
	V2DetectedAddress,
	V2ExtendedAddressInformation,
	V2TokenData,
	V2Transaction,
	V2WalletInformation
} from "./v2.types";

import {TonCenterApiSdkBase} from "../base";


export class TonCenterApiSdkV2 extends TonCenterApiSdkBase {
	constructor(baseURL: string, apiKey?: string) {
		super(baseURL, apiKey);
	}

	async getAddressInformation(address: string): Promise<V2ApiResponse<V2AddressInformation>> {
		return super.request<V2ApiResponse<V2AddressInformation>>('GET', '/api/v2/getAddressInformation', {address});
	}

	async getExtendedAddressInformation(address: string): Promise<V2ApiResponse<V2ExtendedAddressInformation>> {
		return super.request<V2ApiResponse<V2ExtendedAddressInformation>>('GET', '/api/v2/getExtendedAddressInformation', {address});
	}

	async getWalletInformation(address: string): Promise<V2ApiResponse<V2WalletInformation>> {
		return super.request<V2ApiResponse<V2WalletInformation>>('GET', '/api/v2/getWalletInformation', {address});
	}

	async getTransactions(
		address: string,
		limit?: number,
		lt?: number,
		hash?: string,
		to_lt?: number,
		archival?: boolean
	): Promise<V2ApiResponse<V2Transaction[]>> {
		const params: any = {address};
		if (limit) params.limit = limit;
		if (lt) params.lt = lt;
		if (hash) params.hash = hash;
		if (to_lt) params.to_lt = to_lt;
		if (archival) params.archival = archival;

		return super.request<V2ApiResponse<V2Transaction[]>>('GET', '/api/v2/getTransactions', params);
	}

	async getAddressBalance(address: string): Promise<V2ApiResponse<string>> {
		return super.request<V2ApiResponse<string>>('GET', '/api/v2/getAddressBalance', {address});
	}

	async getAddressState(address: string): Promise<V2ApiResponse<string>> {
		return super.request<V2ApiResponse<string>>('GET', '/api/v2/getAddressState', {address});
	}

	/**
	 * Converts a raw address to a user-friendly format.
	 * @param address The raw address (e.g., "0:83DFD552E63729B472FCBCC8C45EBCC6691702558B68EC7527E1BA403A0F31A8")
	 * @returns A promise that resolves to the packed (user-friendly) address
	 */
	async packAddress(address: string): Promise<V2ApiResponse<string>> {
		return super.request<V2ApiResponse<string>>('GET', '/api/v2/packAddress', {address});
	}

	/**
	 * Converts a user-friendly address to its raw format.
	 * @param address The user-friendly address (e.g., "EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N")
	 * @returns A promise that resolves to the unpacked (raw) address
	 */
	async unpackAddress(address: string): Promise<V2ApiResponse<string>> {
		return super.request<V2ApiResponse<string>>('GET', '/api/v2/unpackAddress', {address});
	}

	/**
	 * Get NFT or Jetton information.
	 * @param address Address of NFT collection/item or Jetton master/wallet smart contract
	 * @returns A promise that resolves to the token data or an error if the contract is not a valid token.
	 */
	async getTokenData(address: string): Promise<V2ApiResponse<V2TokenData>> {
		try {
			const response = await super.request<V2ApiResponse<V2TokenData>>('GET', '/api/v2/getTokenData', {address});
			return response;
		} catch (error) {
			// If the contract is not a valid token, the API returns a 503 error.
			throw error;
		}
	}

	/**
	 * Get all possible address forms for a given TON account identifier.
	 * @param address Identifier of target TON account in any form.
	 * @returns A promise that resolves to the detected address information
	 */
	async detectAddress(address: string): Promise<V2ApiResponse<V2DetectedAddress>> {
		return super.request<V2ApiResponse<V2DetectedAddress>>('GET', '/api/v2/detectAddress', {address});
	}


	//****************************************
	//************ POST methods **************
	//****************************************

	async runGetMethod(params: {
		address: string;
		method: string;
		stack: Array<Array<string>>;
		seqno?: number;
	}): Promise<V2ApiResponse<string>> {
		return super.request<V2ApiResponse<string>>('POST', '/runGetMethod', params);
	}

	async sendBoc(boc: string): Promise<V2ApiResponse<string>> {
		return super.request<V2ApiResponse<string>>('POST', '/sendBoc', {boc});
	}

	async sendBocReturnHash(boc: string): Promise<V2ApiResponse<string>> {
		return super.request<V2ApiResponse<string>>('POST', '/sendBocReturnHash', {boc});
	}

	async sendQuery(params: {
		address: string;
		body: string;
		init_code?: string;
		init_data?: string;
	}): Promise<V2ApiResponse<string>> {
		return super.request<V2ApiResponse<string>>('POST', '/sendQuery', params);
	}

	async estimateFee(params: {
		address: string;
		body: string;
		init_code?: string;
		init_data?: string;
		ignore_chksig?: boolean;
	}): Promise<V2ApiResponse<string>> {
		return super.request<V2ApiResponse<string>>('POST', '/estimateFee', params);
	}

	async jsonRpc(params: {
		method: string;
		params: any;
		id: string;
		jsonrpc: string;
	}): Promise<any> {
		return super.request('POST', '/jsonRPC', params);
	}
}
