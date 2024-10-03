//***********************************
//************ V2 Types *************
//***********************************

export interface V2ApiResponse<T> {
	ok: boolean;
	result: T;
}

export interface V2AddressInformation {
	"@type": string;
	balance: string;
	code: string;
	data: string;
	last_transaction_id: {
		"@type": string;
		lt: string;
		hash: string;
	};
	block_id: {
		"@type": string;
		workchain: number;
		shard: string;
		seqno: number;
		root_hash: string;
		file_hash: string;
	};
	frozen_hash: string;
	sync_utime: number;
	"@extra": string;
	state: string;
}

export interface V2AccountAddress {
	"@type": "accountAddress";
	account_address: string;
}

export interface V2InternalTransactionId {
	"@type": "internal.transactionId";
	lt: string;
	hash: string;
}

export interface V2TonBlockIdExt {
	"@type": "ton.blockIdExt";
	workchain: number;
	shard: string;
	seqno: number;
	root_hash: string;
	file_hash: string;
}

export interface V2WalletV4AccountState {
	"@type": "wallet.v4.accountState";
	wallet_id: string;
	seqno: number;
}

export interface V2ExtendedAddressInformation {
	"@type": "fullAccountState";
	address: V2AccountAddress;
	balance: string;
	last_transaction_id: V2InternalTransactionId;
	block_id: V2TonBlockIdExt;
	sync_utime: number;
	account_state: V2WalletV4AccountState;
	revision: number;
	"@extra": string;
}

export interface V2WalletInformation {
	wallet: boolean;
	balance: string;
	account_state: string;
	wallet_type: string;
	seqno: number;
	last_transaction_id: V2InternalTransactionId;
	wallet_id: number;
}

export interface V2Message {
	"@type": "raw.message";
	source: string;
	destination: string;
	value: string;
	fwd_fee: string;
	ihr_fee: string;
	created_lt: string;
	body_hash: string;
	msg_data: {
		"@type": "msg.dataText";
		text: string;
	};
	message: string;
}

export interface V2Transaction {
	"@type": "raw.transaction";
	address: V2AccountAddress;
	utime: number;
	data: string;
	transaction_id: V2InternalTransactionId;
	fee: string;
	storage_fee: string;
	other_fee: string;
	in_msg: V2Message;
	out_msgs: V2Message[];
}

export interface V2JettonMasterData {
	total_supply: number;
	mintable: boolean;
	admin_address: string;
	jetton_content: {
		type: string;
		data: {
			uri: string;
			decimals: string;
		};
	};
	jetton_wallet_code: string;
	contract_type: 'jetton_master';
}

export interface V2JettonWalletData {
	balance: number;
	owner: string;
	jetton: string;
	jetton_wallet_code: string;
	contract_type: 'jetton_wallet';
}

export interface V2NFTItemData {
	init: boolean;
	index: number;
	owner_address: string;
	content: {
		type: string;
		data: string;
	};
	contract_type: 'nft_item';
}

export interface V2NFTCollectionData {
	next_item_index: number;
	collection_content: {
		type: string;
		data: string;
	};
	owner_address: string;
	contract_type: 'nft_collection';
}

export type V2TokenData = V2JettonMasterData | V2JettonWalletData | V2NFTItemData | V2NFTCollectionData;

export interface V2AddressFormat {
	b64: string;
	b64url: string;
}

export interface V2DetectedAddress {
	raw_form: string;
	bounceable: V2AddressFormat;
	non_bounceable: V2AddressFormat;
	given_type: string;
	test_only: boolean;
}