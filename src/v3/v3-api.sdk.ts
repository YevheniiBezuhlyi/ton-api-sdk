import {
	V3AccountState,
	V3Action,
	V3AddressBook,
	V3Block,
	V3Event,
	V3JettonBurn,
	V3JettonMaster,
	V3JettonTransfer,
	V3JettonWalletsResponse,
	V3Message,
	V3NftCollection,
	V3NftItem,
	V3NftTransfer,
	V3TopAccount,
	V3Transaction,
	V3WalletState
} from "./v3.types";

import {TonCenterApiSdkBase} from "../base";

export class TonCenterApiSdkV3 extends TonCenterApiSdkBase {
	constructor(baseURL: string, apiKey?: string) {
		super(baseURL, apiKey);
	}

	// Accounts
	async getAccountStates(addresses: string[], includeBoc: boolean = true): Promise<{
		accounts: V3AccountState[],
		address_book: V3AddressBook
	}> {
		return super.request('GET', '/api/v3/accountStates', {address: addresses, include_boc: includeBoc});
	}

	async getAddressBook(addresses: string[]): Promise<V3AddressBook> {
		return super.request('GET', '/api/v3/addressBook', {address: addresses});
	}

	async getWalletStates(addresses: string[]): Promise<{ wallets: V3WalletState[], address_book: V3AddressBook }> {
		return super.request('GET', '/api/v3/walletStates', {address: addresses});
	}

	// Events
	async getActions(actionIds?: string[], traceIds?: string[]): Promise<{
		actions: V3Action[],
		address_book: V3AddressBook
	}> {
		return super.request('GET', '/api/v3/actions', {action_id: actionIds, trace_id: traceIds});
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
		return super.request('GET', '/api/v3/events', params);
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
		return super.request('GET', '/api/v3/blocks', params);
	}

	async getMessages(params: {
		msg_hash?: string[];
		body_hash?: string;
		source?: string;
		destination?: string;
		opcode?: string;
		start_utime?: number;
		end_utime?: number;
		start_lt?: number;
		end_lt?: number;
		direction?: '--' | 'in' | 'out';
		limit?: number;
		offset?: number;
		sort?: 'asc' | 'desc';
	}): Promise<{
		address_book: { [key: string]: { user_friendly: string } };
		messages: V3Message[];
	}> {
		return super.request<{
			address_book: { [key: string]: { user_friendly: string } };
			messages: V3Message[];
		}>('GET', '/api/v3/messages', params);
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
		return super.request('GET', '/api/v3/transactions', params);
	}

	async getTransactionsByMessage(params: {
		msg_hash?: string;
		body_hash?: string;
		opcode?: string;
		direction?: '--' | 'in' | 'out';
		limit?: number;
		offset?: number;
	}): Promise<{ transactions: V3Transaction[], address_book: V3AddressBook }> {
		return super.request('GET', '/api/v3/transactionsByMessage', params);
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
	}): Promise<{ jetton_burns: V3JettonBurn[], address_book: V3AddressBook }> {
		return super.request('GET', '/api/v3/jetton/burns', params);
	}

	async getJettonMasters(params: {
		address?: string[];
		adminAddress?: string[];
		limit?: number;
		offset?: number;
	}): Promise<{ jetton_masters: V3JettonMaster[], address_book: V3AddressBook }> {
		return super.request('GET', '/api/v3/jetton/masters', params);
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
		return super.request('GET', '/api/v3/jetton/transfers', params);
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
		return super.request<V3JettonWalletsResponse>('GET', '/api/v3/jetton/wallets', params);
	}

	// NFTs
	async getNftCollections(params: {
		collectionAddress?: string[];
		ownerAddress?: string[];
		limit?: number;
		offset?: number;
	}): Promise<{ nft_collections: V3NftCollection[], address_book: V3AddressBook }> {
		return super.request('GET', '/api/v3/nft/collections', params);
	}

	async getNftItems(params: {
		address?: string[];
		ownerAddress?: string[];
		collectionAddress?: string;
		index?: string[];
		limit?: number;
		offset?: number;
	}): Promise<{ nft_items: V3NftItem[], address_book: V3AddressBook }> {
		return super.request('GET', '/api/v3/nft/items', params);
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
		return super.request('GET', '/api/v3/nft/transfers', params);
	}

	// Stats
	async getTopAccountsByBalance(limit?: number, offset?: number): Promise<V3TopAccount[]> {
		return super.request('GET', '/api/v3/topAccountsByBalance', {limit, offset});
	}
}