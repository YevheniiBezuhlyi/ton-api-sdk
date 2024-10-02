//***********************************
//************ V3 Types *************
//***********************************
export interface V3AddressBook {
	[address: string]: {
		user_friendly: string;
	};
}

export interface V3AccountState {
	account_state_hash: string;
	address: string;
	balance: string;
	code_boc: string;
	code_hash: string;
	data_boc: string;
	data_hash: string;
	frozen_hash: string;
	last_transaction_hash: string;
	last_transaction_lt: string;
	status: string;
}

export interface V3WalletState {
	address: string;
	balance: string;
	code_hash: string;
	is_signature_allowed: boolean;
	is_wallet: boolean;
	last_transaction_hash: string;
	last_transaction_lt: string;
	seqno: number;
	status: string;
	wallet_id: number;
	wallet_type: string;
}

export interface V3Action {
	action_id: string;
	details: string;
	end_lt: string;
	end_utime: number;
	raw_action: any; // This could be further detailed if needed
	start_lt: string;
	start_utime: number;
	success: boolean;
	trace_id: string;
	transactions: string[];
	type: string;
}

export interface V3Event {
	actions: V3Action[];
	end_lt: string;
	end_utime: number;
	external_hash: string;
	is_incomplete: boolean;
	mc_seqno_end: string;
	mc_seqno_start: string;
	start_lt: string;
	start_utime: number;
	trace: any; // This could be further detailed if needed
	trace_id: string;
	trace_info: {
		classification_state: string;
		messages: number;
		pending_messages: number;
		trace_state: string;
		transactions: number;
	};
	transactions: { [key: string]: V3Transaction };
	transactions_order: string[];
	warning: string;
}

export interface V3Transaction {
	account: string;
	account_state_after: V3AccountState;
	account_state_before: V3AccountState;
	block_ref: {
		seqno: number;
		shard: string;
		workchain: number;
	};
	description: any; // This could be further detailed if needed
	end_status: string;
	hash: string;
	in_msg: V3Message;
	lt: string;
	mc_block_seqno: number;
	now: number;
	orig_status: string;
	out_msgs: V3Message[];
	prev_trans_hash: string;
	prev_trans_lt: string;
	total_fees: string;
	trace_id: string;
}

export interface V3Message {
	bounce: boolean;
	bounced: boolean;
	created_at: string;
	created_lt: string;
	destination: string;
	fwd_fee: string;
	hash: string;
	ihr_disabled: boolean;
	ihr_fee: string;
	import_fee: string;
	init_state: {
		body: string;
		decoded: {
			comment: string;
			type: string;
		};
		hash: string;
	};
	message_content: {
		body: string;
		decoded: {
			comment: string;
			type: string;
		};
		hash: string;
	};
	opcode: number;
	source: string;
	value: string;
}

export interface V3Block {
	after_merge: boolean;
	after_split: boolean;
	before_split: boolean;
	created_by: string;
	end_lt: string;
	file_hash: string;
	flags: number;
	gen_catchain_seqno: number;
	gen_utime: string;
	global_id: number;
	key_block: boolean;
	master_ref_seqno: number;
	masterchain_block_ref: {
		seqno: number;
		shard: string;
		workchain: number;
	};
	min_ref_mc_seqno: number;
	prev_blocks: {
		seqno: number;
		shard: string;
		workchain: number;
	}[];
	prev_key_block_seqno: number;
	rand_seed: string;
	root_hash: string;
	seqno: number;
	shard: string;
	start_lt: string;
	tx_count: number;
	validator_list_hash_short: number;
	version: number;
	vert_seqno: number;
	vert_seqno_incr: boolean;
	want_merge: boolean;
	want_split: boolean;
	workchain: number;
}

export interface V3JettonBurn {
	amount: string;
	custom_payload: string;
	jetton_master: string;
	jetton_wallet: string;
	owner: string;
	query_id: string;
	response_destination: string;
	trace_id: string;
	transaction_aborted: boolean;
	transaction_hash: string;
	transaction_lt: string;
	transaction_now: number;
}

export interface V3JettonMaster {
	address: string;
	admin_address: string;
	code_hash: string;
	data_hash: string;
	jetton_content: { [key: string]: any };
	jetton_wallet_code_hash: string;
	last_transaction_lt: string;
	mintable: boolean;
	total_supply: string;
}

export interface V3JettonTransfer {
	amount: string;
	custom_payload: string;
	destination: string;
	forward_payload: string;
	forward_ton_amount: string;
	jetton_master: string;
	query_id: string;
	response_destination: string;
	source: string;
	source_wallet: string;
	trace_id: string;
	transaction_aborted: boolean;
	transaction_hash: string;
	transaction_lt: string;
	transaction_now: number;
}

export interface V3NftCollection {
	address: string;
	code_hash: string;
	collection_content: { [key: string]: any };
	data_hash: string;
	last_transaction_lt: string;
	next_item_index: string;
	owner_address: string;
}

export interface V3NftItem {
	address: string;
	code_hash: string;
	collection: V3NftCollection;
	collection_address: string;
	content: { [key: string]: any };
	data_hash: string;
	index: string;
	init: boolean;
	last_transaction_lt: string;
	owner_address: string;
}

export interface V3NftTransfer {
	custom_payload: string;
	forward_amount: string;
	forward_payload: string;
	new_owner: string;
	nft_address: string;
	nft_collection: string;
	old_owner: string;
	query_id: string;
	response_destination: string;
	trace_id: string;
	transaction_aborted: boolean;
	transaction_hash: string;
	transaction_lt: string;
	transaction_now: number;
}

export interface V3TopAccount {
	account: string;
	balance: string;
}

export interface V3JettonWallet {
	address: string;
	balance: string;
	code_hash: string;
	data_hash: string;
	jetton: string;
	last_transaction_lt: string;
	mintless_info?: {
		amount: string;
		custom_payload_api_uri: string[];
		expire_at: number;
		start_from: number;
	};
	owner: string;
}

export interface V3JettonWalletsResponse {
	jetton_wallets: V3JettonWallet[];
	address_book: V3AddressBook;
}


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