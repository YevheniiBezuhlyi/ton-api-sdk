import axios, { AxiosInstance } from 'axios';
import {
	V2TokenData,
	V2AddressInformation,
	V2ApiResponse, V2ExtendedAddressInformation, V2Transaction, V2WalletInformation,
	V3AccountState, V3Action, V3AddressBook, V3Block, V3Event, V3JettonBurn,
	V3JettonMaster, V3JettonTransfer, V3Message, V3NftCollection, V3NftItem,
	V3NftTransfer, V3TopAccount, V3Transaction, V3WalletState, V2DetectedAddress, V3JettonWalletsResponse
} from './types';

class TonCenterApiSdkBase {
	protected axiosInstance: AxiosInstance;

	constructor(baseURL: string, apiKey: string) {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		};
		if (apiKey) {
			headers['X-Api-Key'] = apiKey;
		}
		this.axiosInstance = axios.create({
			baseURL,
			headers,
		});
	}

	protected async request<T>(method: string, url: string, params?: any): Promise<T> {
		try {
			const response = await this.axiosInstance.request<T>({
				method,
				url,
				params,
			});
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				throw new Error(`API Error: ${error.response.status} - ${error.response.data.error}`);
			}
			throw error;
		}
	}
}

class TonCenterApiSdkV2 extends TonCenterApiSdkBase {
	constructor(baseURL: string, apiKey: string) {
		super(baseURL, apiKey);
	}

	async getAddressInformation(address: string): Promise<V2ApiResponse<V2AddressInformation>> {
		return this.request<V2ApiResponse<V2AddressInformation>>('GET', '/api/v2/getAddressInformation', { address });
	}

	async getExtendedAddressInformation(address: string): Promise<V2ApiResponse<V2ExtendedAddressInformation>> {
		return this.request<V2ApiResponse<V2ExtendedAddressInformation>>('GET', '/api/v2/getExtendedAddressInformation', { address });
	}

	async getWalletInformation(address: string): Promise<V2ApiResponse<V2WalletInformation>> {
		return this.request<V2ApiResponse<V2WalletInformation>>('GET', '/api/v2/getWalletInformation', {address});
	}

	async getTransactions(
		address: string,
		limit?: number,
		lt?: number,
		hash?: string,
		to_lt?: number,
		archival?: boolean
	): Promise<V2ApiResponse<V2Transaction[]>> {
		const params: any = { address };
		if (limit) params.limit = limit;
		if (lt) params.lt = lt;
		if (hash) params.hash = hash;
		if (to_lt) params.to_lt = to_lt;
		if (archival) params.archival = archival;

		return this.request<V2ApiResponse<V2Transaction[]>>('GET', '/api/v2/getTransactions', params);
	}

	async getAddressBalance(address: string): Promise<V2ApiResponse<string>> {
		return this.request<V2ApiResponse<string>>('GET', '/api/v2/getAddressBalance', { address });
	}

	async getAddressState(address: string): Promise<V2ApiResponse<string>> {
		return this.request<V2ApiResponse<string>>('GET', '/api/v2/getAddressState', { address });
	}

	/**
	 * Converts a raw address to a user-friendly format.
	 * @param address The raw address (e.g., "0:83DFD552E63729B472FCBCC8C45EBCC6691702558B68EC7527E1BA403A0F31A8")
	 * @returns A promise that resolves to the packed (user-friendly) address
	 */
	async packAddress(address: string): Promise<V2ApiResponse<string>> {
		return this.request<V2ApiResponse<string>>('GET', '/api/v2/packAddress', { address });
	}

	/**
	 * Converts a user-friendly address to its raw format.
	 * @param address The user-friendly address (e.g., "EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N")
	 * @returns A promise that resolves to the unpacked (raw) address
	 */
	async unpackAddress(address: string): Promise<V2ApiResponse<string>> {
		return this.request<V2ApiResponse<string>>('GET', '/api/v2/unpackAddress', { address });
	}

	/**
	 * Get NFT or Jetton information.
	 * @param address Address of NFT collection/item or Jetton master/wallet smart contract
	 * @returns A promise that resolves to the token data or an error if the contract is not a valid token.
	 */
	async getTokenData(address: string): Promise<V2ApiResponse<V2TokenData>> {
		try {
			const response = await this.request<V2ApiResponse<V2TokenData>>('GET', '/api/v2/getTokenData', { address });
			return response;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 503) {
				throw new Error("Smart contract is not Jetton or NFT");
			}
			throw error;
		}
	}

	/**
	 * Get all possible address forms for a given TON account identifier.
	 * @param address Identifier of target TON account in any form.
	 * @returns A promise that resolves to the detected address information
	 */
	async detectAddress(address: string): Promise<V2ApiResponse<V2DetectedAddress>> {
		return this.request<V2ApiResponse<V2DetectedAddress>>('GET', '/api/v2/detectAddress', { address });
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
		return this.request<V2ApiResponse<string>>('POST', '/runGetMethod', params);
	}

	async sendBoc(boc: string): Promise<V2ApiResponse<string>> {
		return this.request<V2ApiResponse<string>>('POST', '/sendBoc', { boc });
	}

	async sendBocReturnHash(boc: string): Promise<V2ApiResponse<string>> {
		return this.request<V2ApiResponse<string>>('POST', '/sendBocReturnHash', { boc });
	}

	async sendQuery(params: {
		address: string;
		body: string;
		init_code?: string;
		init_data?: string;
	}): Promise<V2ApiResponse<string>> {
		return this.request<V2ApiResponse<string>>('POST', '/sendQuery', params);
	}

	async estimateFee(params: {
		address: string;
		body: string;
		init_code?: string;
		init_data?: string;
		ignore_chksig?: boolean;
	}): Promise<V2ApiResponse<string>> {
		return this.request<V2ApiResponse<string>>('POST', '/estimateFee', params);
	}

	async jsonRpc(params: {
		method: string;
		params: any;
		id: string;
		jsonrpc: string;
	}): Promise<any> {
		return this.request('POST', '/jsonRPC', params);
	}
}

class TonCenterApiSdkV3 extends TonCenterApiSdkBase {
	constructor(baseURL: string, apiKey: string) {
		super(baseURL, apiKey);
	}

	// Accounts
	async getAccountStates(addresses: string[], includeBoc: boolean = true): Promise<{
		accounts: V3AccountState[],
		address_book: V3AddressBook
	}> {
		return this.request('GET', '/api/v3/accountStates', { address: addresses, include_boc: includeBoc });
	}

	async getAddressBook(addresses: string[]): Promise<V3AddressBook> {
		return this.request('GET', '/api/v3/addressBook', { address: addresses });
	}

	async getWalletStates(addresses: string[]): Promise<{ wallets: V3WalletState[], address_book: V3AddressBook }> {
		return this.request('GET', '/api/v3/walletStates', { address: addresses });
	}

	// Events
	async getActions(actionIds?: string[], traceIds?: string[]): Promise<{
		actions: V3Action[],
		address_book: V3AddressBook
	}> {
		return this.request('GET', '/api/v3/actions', { action_id: actionIds, trace_id: traceIds });
	}

	async getEvents(params: {
		account?: string;
		txHash?: string[];
		msgHash?: string[];
		mcSeqno?: number;
		startUtime?: number;
		endUtime?: number;
		startLt?: number;
		endLt?: number;
		limit?: number;
		offset?: number;
		sort?: 'asc' | 'desc';
	}): Promise<{ events: V3Event[], address_book: V3AddressBook }> {
		return this.request('GET', '/api/v3/events', params);
	}

	// Blockchain
	async getBlocks(params: {
		workchain?: number;
		shard?: string;
		seqno?: number;
		mcSeqno?: number;
		startUtime?: number;
		endUtime?: number;
		startLt?: number;
		endLt?: number;
		limit?: number;
		offset?: number;
		sort?: 'asc' | 'desc';
	}): Promise<{ blocks: V3Block[] }> {
		return this.request('GET', '/api/v3/blocks', params);
	}

	async getTransactions(params: {
		workchain?: number;
		shard?: string;
		seqno?: number;
		mcSeqno?: number;
		account?: string[];
		excludeAccount?: string[];
		hash?: string;
		lt?: number;
		startUtime?: number;
		endUtime?: number;
		startLt?: number;
		endLt?: number;
		limit?: number;
		offset?: number;
		sort?: 'asc' | 'desc';
	}): Promise<{ transactions: V3Transaction[], address_book: V3AddressBook }> {
		return this.request('GET', '/api/v3/transactions', params);
	}

	// Add other V3 methods as needed...

	// Jettons
	async getJettonBurns(params: {
		address?: string[];
		jettonWallet?: string[];
		jettonMaster?: string;
		startUtime?: number;
		endUtime?: number;
		startLt?: number;
		endLt?: number;
		limit?: number;
		offset?: number;
		sort?: 'asc' | 'desc';
	}): Promise<{ jetton_burns: V3JettonBurn[], address_book: V3AddressBook }> {
		return this.request('GET', '/api/v3/jetton/burns', params);
	}

	async getJettonMasters(params: {
		address?: string[];
		adminAddress?: string[];
		limit?: number;
		offset?: number;
	}): Promise<{ jetton_masters: V3JettonMaster[], address_book: V3AddressBook }> {
		return this.request('GET', '/api/v3/jetton/masters', params);
	}

	async getJettonTransfers(params: {
		ownerAddress?: string[];
		jettonWallet?: string[];
		jettonMaster?: string;
		direction?: 'in' | 'out' | '--';
		startUtime?: number;
		endUtime?: number;
		startLt?: number;
		endLt?: number;
		limit?: number;
		offset?: number;
		sort?: 'asc' | 'desc';
	}): Promise<{ jetton_transfers: V3JettonTransfer[], address_book: V3AddressBook }> {
		return this.request('GET', '/api/v3/jetton/transfers', params);
	}

	async getJettonWallets(params: {
		address?: string[];
		owner_address?: string[];
		jetton_address?: string;
		exclude_zero_balance?: boolean;
		limit?: number;
		offset?: number;
		sort?: 'asc' | 'desc';
	}): Promise<V3JettonWalletsResponse> {
		return this.request<V3JettonWalletsResponse>('GET', '/api/v3/jetton/wallets', params);
	}

	// NFTs
	async getNftCollections(params: {
		collectionAddress?: string[];
		ownerAddress?: string[];
		limit?: number;
		offset?: number;
	}): Promise<{ nft_collections: V3NftCollection[], address_book: V3AddressBook }> {
		return this.request('GET', '/api/v3/nft/collections', params);
	}

	async getNftItems(params: {
		address?: string[];
		ownerAddress?: string[];
		collectionAddress?: string;
		index?: string[];
		limit?: number;
		offset?: number;
	}): Promise<{ nft_items: V3NftItem[], address_book: V3AddressBook }> {
		return this.request('GET', '/api/v3/nft/items', params);
	}

	async getNftTransfers(params: {
		ownerAddress?: string[];
		itemAddress?: string[];
		collectionAddress?: string;
		direction?: 'in' | 'out' | '--';
		startUtime?: number;
		endUtime?: number;
		startLt?: number;
		endLt?: number;
		limit?: number;
		offset?: number;
		sort?: 'asc' | 'desc';
	}): Promise<{ nft_transfers: V3NftTransfer[], address_book: V3AddressBook }> {
		return this.request('GET', '/api/v3/nft/transfers', params);
	}

	// Stats
	async getTopAccountsByBalance(limit?: number, offset?: number): Promise<V3TopAccount[]> {
		return this.request('GET', '/api/v3/topAccountsByBalance', { limit, offset });
	}
}

export { TonCenterApiSdkV2, TonCenterApiSdkV3 };