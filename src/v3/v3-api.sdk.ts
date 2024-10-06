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
    V3WalletState,
} from './v3.types';

import { Base } from '../base';

export class TonApiSdkV3 extends Base {
    constructor(base_url: string, api_key?: string, log_requests?: boolean) {
        super(base_url, api_key, log_requests);
    }

    // Accounts
    async getAccountStates(
        addresses: string[],
        include_boc: boolean = true,
    ): Promise<{
        accounts: V3AccountState[];
        address_book: V3AddressBook;
    }> {
        return super.request('GET', '/api/v3/accountStates', { address: addresses, include_boc: include_boc });
    }

    async getAddressBook(addresses: string[]): Promise<V3AddressBook> {
        return super.request('GET', '/api/v3/addressBook', { address: addresses });
    }

    async getWalletStates(addresses: string[]): Promise<{ wallets: V3WalletState[]; address_book: V3AddressBook }> {
        return super.request('GET', '/api/v3/walletStates', { address: addresses });
    }

    // Events
    async getActions(
        action_ids?: string[],
        trace_ids?: string[],
    ): Promise<{
        actions: V3Action[];
        address_book: V3AddressBook;
    }> {
        return super.request('GET', '/api/v3/actions', { action_id: action_ids, trace_id: trace_ids });
    }

    async getEvents(params: {
        account?: string;
        tx_hash?: string[];
        msg_hash?: string[];
        mc_seqno?: number;
        start_utime?: number;
        end_utime?: number;
        start_lt?: number;
        end_lt?: number;
        limit?: number;
        offset?: number;
        sort?: 'asc' | 'desc';
    }): Promise<{ events: V3Event[]; address_book: V3AddressBook }> {
        return super.request('GET', '/api/v3/events', params);
    }

    // Blockchain
    async getBlocks(params: {
        workchain?: number;
        shard?: string;
        seqno?: number;
        mc_seqno?: number;
        start_utime?: number;
        end_utime?: number;
        start_lt?: number;
        end_lt?: number;
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
        mc_seqno?: number;
        account?: string[];
        exclude_account?: string[];
        hash?: string;
        lt?: number;
        start_utime?: number;
        end_utime?: number;
        start_lt?: number;
        end_lt?: number;
        limit?: number;
        offset?: number;
        sort?: 'asc' | 'desc';
    }): Promise<{ transactions: V3Transaction[]; address_book: V3AddressBook }> {
        return super.request('GET', '/api/v3/transactions', params);
    }

    async getTransactionsByMessage(params: {
        msg_hash?: string;
        body_hash?: string;
        opcode?: string;
        direction?: '--' | 'in' | 'out';
        limit?: number;
        offset?: number;
    }): Promise<{ transactions: V3Transaction[]; address_book: V3AddressBook }> {
        return super.request('GET', '/api/v3/transactionsByMessage', params);
    }

    // Jettons
    async getJettonBurns(params: {
        address?: string[];
        jetton_wallet?: string[];
        jetton_master?: string;
        start_utime?: number;
        end_utime?: number;
        start_lt?: number;
        end_lt?: number;
        limit?: number;
        offset?: number;
        sort?: 'asc' | 'desc';
    }): Promise<{ jetton_burns: V3JettonBurn[]; address_book: V3AddressBook }> {
        return super.request('GET', '/api/v3/jetton/burns', params);
    }

    async getJettonMasters(params: {
        address?: string[];
        admin_address?: string[];
        limit?: number;
        offset?: number;
    }): Promise<{ jetton_masters: V3JettonMaster[]; address_book: V3AddressBook }> {
        return super.request('GET', '/api/v3/jetton/masters', params);
    }

    async getJettonTransfers(params: {
        owner_address?: string[];
        jetton_wallet?: string[];
        jetton_master?: string;
        direction?: 'in' | 'out' | '--';
        start_utime?: number;
        end_utime?: number;
        start_lt?: number;
        end_lt?: number;
        limit?: number;
        offset?: number;
        sort?: 'asc' | 'desc';
    }): Promise<{ jetton_transfers: V3JettonTransfer[]; address_book: V3AddressBook }> {
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
        collection_address?: string[];
        owner_address?: string[];
        limit?: number;
        offset?: number;
    }): Promise<{ nft_collections: V3NftCollection[]; address_book: V3AddressBook }> {
        return super.request('GET', '/api/v3/nft/collections', params);
    }

    async getNftItems(params: {
        address?: string[];
        owner_address?: string[];
        collection_address?: string;
        index?: string[];
        limit?: number;
        offset?: number;
    }): Promise<{ nft_items: V3NftItem[]; address_book: V3AddressBook }> {
        return super.request('GET', '/api/v3/nft/items', params);
    }

    async getNftTransfers(params: {
        owner_address?: string[];
        item_address?: string[];
        collection_address?: string;
        direction?: 'in' | 'out' | '--';
        start_utime?: number;
        end_utime?: number;
        start_lt?: number;
        end_lt?: number;
        limit?: number;
        offset?: number;
        sort?: 'asc' | 'desc';
    }): Promise<{ nft_transfers: V3NftTransfer[]; address_book: V3AddressBook }> {
        return super.request('GET', '/api/v3/nft/transfers', params);
    }

    // Stats
    async getTopAccountsByBalance(limit?: number, offset?: number): Promise<V3TopAccount[]> {
        return super.request('GET', '/api/v3/topAccountsByBalance', { limit, offset });
    }
}