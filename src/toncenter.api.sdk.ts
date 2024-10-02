// ton-api-sdk.ts

import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {
	AccountState,
	Action,
	AddressBook,
	Block,
	Event,
	JettonBurn,
	JettonMaster,
	JettonTransfer,
	Message,
	NftCollection,
	NftItem,
	NftTransfer,
	TopAccount,
	Transaction,
	WalletState
} from './types';

class ToncenterApiSdk {
	private axiosInstance: AxiosInstance;

	constructor(baseURL: string, apiKey: string) {
		this.axiosInstance = axios.create({
			baseURL,
			headers: {
				...(apiKey && { 'X-Api-Key': `${apiKey}` }),
				'Content-Type': 'application/json',
			},
		});
	}

	// Accounts
	async getAccountStates(addresses: string[], includeBoc: boolean = true): Promise<{
		accounts: AccountState[],
		address_book: AddressBook
	}> {
		return this.request({
			method: 'GET',
			url: '/api/v3/accountStates',
			params: {address: addresses, include_boc: includeBoc},
		});
	}

	async getAddressBook(addresses: string[]): Promise<AddressBook> {
		return this.request({
			method: 'GET',
			url: '/api/v3/addressBook',
			params: {address: addresses},
		});
	}

	async getWalletStates(addresses: string[]): Promise<{ wallets: WalletState[], address_book: AddressBook }> {
		return this.request({
			method: 'GET',
			url: '/api/v3/walletStates',
			params: {address: addresses},
		});
	}

	// Events
	async getActions(actionIds?: string[], traceIds?: string[]): Promise<{
		actions: Action[],
		address_book: AddressBook
	}> {
		return this.request({
			method: 'GET',
			url: '/api/v3/actions',
			params: {action_id: actionIds, trace_id: traceIds},
		});
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
	}): Promise<{ events: Event[], address_book: AddressBook }> {
		return this.request({
			method: 'GET',
			url: '/api/v3/events',
			params: {
				account: params.account,
				tx_hash: params.txHash,
				msg_hash: params.msgHash,
				mc_seqno: params.mcSeqno,
				start_utime: params.startUtime,
				end_utime: params.endUtime,
				start_lt: params.startLt,
				end_lt: params.endLt,
				limit: params.limit,
				offset: params.offset,
				sort: params.sort,
			},
		});
	}

	// API v2
	async getAddressInformation(address: string, useV2: boolean = true): Promise<AccountState> {
		return this.request({
			method: 'GET',
			url: '/api/v3/addressInformation',
			params: {address, use_v2: useV2},
		});
	}

	async estimateFee(params: {
		address: string;
		body: string;
		ignoreChksig?: boolean;
		initCode?: string;
		initData?: string;
	}): Promise<any> {
		return this.request({
			method: 'POST',
			url: '/api/v3/estimateFee',
			data: params,
		});
	}

	async sendMessage(boc: string): Promise<{ message_hash: string }> {
		return this.request({
			method: 'POST',
			url: '/api/v3/message',
			data: {boc},
		});
	}

	async runGetMethod(params: {
		address: string;
		method: string;
		stack: Array<{ type: string; value: string }>;
	}): Promise<any> {
		return this.request({
			method: 'POST',
			url: '/api/v3/runGetMethod',
			data: params,
		});
	}

	async getWalletInformation(address: string, useV2: boolean = true): Promise<WalletState> {
		return this.request({
			method: 'GET',
			url: '/api/v3/walletInformation',
			params: {address, use_v2: useV2},
		});
	}

	// Blockchain
	async getAdjacentTransactions(hash: string, direction: 'in' | 'out' | '--'): Promise<{
		transactions: Transaction[],
		address_book: AddressBook
	}> {
		return this.request({
			method: 'GET',
			url: '/api/v3/adjacentTransactions',
			params: {hash, direction},
		});
	}

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
	}): Promise<{ blocks: Block[] }> {
		return this.request({
			method: 'GET',
			url: '/api/v3/blocks',
			params: {
				workchain: params.workchain,
				shard: params.shard,
				seqno: params.seqno,
				mc_seqno: params.mcSeqno,
				start_utime: params.startUtime,
				end_utime: params.endUtime,
				start_lt: params.startLt,
				end_lt: params.endLt,
				limit: params.limit,
				offset: params.offset,
				sort: params.sort,
			},
		});
	}

	async getMasterchainBlockShardState(seqno: number): Promise<{
		transactions: Transaction[],
		address_book: AddressBook
	}> {
		return this.request({
			method: 'GET',
			url: '/api/v3/masterchainBlockShardState',
			params: {seqno},
		});
	}

	async getMasterchainBlockShards(seqno: number): Promise<{
		transactions: Transaction[],
		address_book: AddressBook
	}> {
		return this.request({
			method: 'GET',
			url: '/api/v3/masterchainBlockShards',
			params: {seqno},
		});
	}

	async getMasterchainInfo(): Promise<{ first: Block, last: Block }> {
		return this.request({
			method: 'GET',
			url: '/api/v3/masterchainInfo',
		});
	}

	async getMessages(params: {
		msgHash?: string[];
		bodyHash?: string;
		source?: string;
		destination?: string;
		opcode?: string;
		startUtime?: number;
		endUtime?: number;
		startLt?: number;
		endLt?: number;
		direction?: 'in' | 'out' | '--';
		limit?: number;
		offset?: number;
		sort?: 'asc' | 'desc';
	}): Promise<{ messages: Message[], address_book: AddressBook }> {
		return this.request({
			method: 'GET',
			url: '/api/v3/messages',
			params: {
				msg_hash: params.msgHash,
				body_hash: params.bodyHash,
				source: params.source,
				destination: params.destination,
				opcode: params.opcode,
				start_utime: params.startUtime,
				end_utime: params.endUtime,
				start_lt: params.startLt,
				end_lt: params.endLt,
				direction: params.direction,
				limit: params.limit,
				offset: params.offset,
				sort: params.sort,
			},
		});
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
	}): Promise<{ transactions: Transaction[], address_book: AddressBook }> {
		return this.request({
			method: 'GET',
			url: '/api/v3/transactions',
			params: {
				workchain: params.workchain,
				shard: params.shard,
				seqno: params.seqno,
				mc_seqno: params.mcSeqno,
				account: params.account,
				exclude_account: params.excludeAccount,
				hash: params.hash,
				lt: params.lt,
				start_utime: params.startUtime,
				end_utime: params.endUtime,
				start_lt: params.startLt,
				end_lt: params.endLt,
				limit: params.limit,
				offset: params.offset,
				sort: params.sort,
			},
		});
	}

	async getTransactionsByMasterchainBlock(params: {
		seqno: number;
		limit?: number;
		offset?: number;
		sort?: 'asc' | 'desc';
	}): Promise<{ transactions: Transaction[], address_book: AddressBook }> {
		return this.request({
			method: 'GET',
			url: '/api/v3/transactionsByMasterchainBlock',
			params: {
				seqno: params.seqno,
				limit: params.limit,
				offset: params.offset,
				sort: params.sort,
			},
		});
	}

	async getTransactionsByMessage(params: {
		msgHash: string;
		bodyHash?: string;
		opcode?: string;
		direction?: 'in' | 'out' | '--';
		limit?: number;
		offset?: number;
	}): Promise<{ transactions: Transaction[], address_book: AddressBook }> {
		return this.request({
			method: 'GET',
			url: '/api/v3/transactionsByMessage',
			params: {
				msg_hash: params.msgHash,
				body_hash: params.bodyHash,
				opcode: params.opcode,
				direction: params.direction,
				limit: params.limit,
				offset: params.offset,
			},
		});
	}

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
	}): Promise<{ jetton_burns: JettonBurn[], address_book: AddressBook }> {
		return this.request({
			method: 'GET',
			url: '/api/v3/jetton/burns',
			params: {
				address: params.address,
				jetton_wallet: params.jettonWallet,
				jetton_master: params.jettonMaster,
				start_utime: params.startUtime,
				end_utime: params.endUtime,
				start_lt: params.startLt,
				end_lt: params.endLt,
				limit: params.limit,
				offset: params.offset,
				sort: params.sort,
			},
		});
	}

	async getJettonMasters(params: {
		address?: string[];
		adminAddress?: string[];
		limit?: number;
		offset?: number;
	}): Promise<{ jetton_masters: JettonMaster[], address_book: AddressBook }> {
		return this.request({
			method: 'GET',
			url: '/api/v3/jetton/masters',
			params: {
				address: params.address,
				admin_address: params.adminAddress,
				limit: params.limit,
				offset: params.offset,
			},
		});
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
	}): Promise<{ jetton_transfers: JettonTransfer[], address_book: AddressBook }> {
		return this.request({
			method: 'GET',
			url: '/api/v3/jetton/transfers',
			params: {
				owner_address: params.ownerAddress,
				jetton_wallet: params.jettonWallet,
				jetton_master: params.jettonMaster,
				direction: params.direction,
				start_utime: params.startUtime,
				end_utime: params.endUtime,
				start_lt: params.startLt,
				end_lt: params.endLt,
				limit: params.limit,
				offset: params.offset,
				sort: params.sort,
			},
		});
	}

	// NFTs
	async getNftCollections(params: {
		collectionAddress?: string[];
		ownerAddress?: string[];
		limit?: number;
		offset?: number;
	}): Promise<{ nft_collections: NftCollection[], address_book: AddressBook }> {
		return this.request({
			method: 'GET',
			url: '/api/v3/nft/collections',
			params: {
				collection_address: params.collectionAddress,
				owner_address: params.ownerAddress,
				limit: params.limit,
				offset: params.offset,
			},
		});
	}

	async getNftItems(params: {
		address?: string[];
		ownerAddress?: string[];
		collectionAddress?: string;
		index?: string[];
		limit?: number;
		offset?: number;
	}): Promise<{ nft_items: NftItem[], address_book: AddressBook }> {
		return this.request({
			method: 'GET',
			url: '/api/v3/nft/items',
			params: {
				address: params.address,
				owner_address: params.ownerAddress,
				collection_address: params.collectionAddress,
				index: params.index,
				limit: params.limit,
				offset: params.offset,
			},
		});
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
	}): Promise<{ nft_transfers: NftTransfer[], address_book: AddressBook }> {
		return this.request({
			method: 'GET',
			url: '/api/v3/nft/transfers',
			params: {
				owner_address: params.ownerAddress,
				item_address: params.itemAddress,
				collection_address: params.collectionAddress,
				direction: params.direction,
				start_utime: params.startUtime,
				end_utime: params.endUtime,
				start_lt: params.startLt,
				end_lt: params.endLt,
				limit: params.limit,
				offset: params.offset,
				sort: params.sort,
			},
		});
	}

	// Stats
	async getTopAccountsByBalance(limit?: number, offset?: number): Promise<TopAccount[]> {
		return this.request({
			method: 'GET',
			url: '/api/v3/topAccountsByBalance',
			params: {
				limit,
				offset,
			},
		});
	}

	private async request<T>(config: AxiosRequestConfig): Promise<T> {
		try {
			const response = await this.axiosInstance.request<T>(config);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				throw new Error(`API Error: ${error.response.status} - ${error.response.data.error}`);
			}
			throw error;
		}
	}
}

export default ToncenterApiSdk;