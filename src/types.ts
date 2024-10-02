export interface AddressBook {
	[address: string]: {
		user_friendly: string;
	};
}

export interface AccountState {
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

export interface WalletState {
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

export interface Action {
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

export interface Event {
	actions: Action[];
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
	transactions: { [key: string]: Transaction };
	transactions_order: string[];
	warning: string;
}

export interface Transaction {
	account: string;
	account_state_after: AccountState;
	account_state_before: AccountState;
	block_ref: {
		seqno: number;
		shard: string;
		workchain: number;
	};
	description: any; // This could be further detailed if needed
	end_status: string;
	hash: string;
	in_msg: Message;
	lt: string;
	mc_block_seqno: number;
	now: number;
	orig_status: string;
	out_msgs: Message[];
	prev_trans_hash: string;
	prev_trans_lt: string;
	total_fees: string;
	trace_id: string;
}

export interface Message {
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

export interface Block {
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

export interface JettonBurn {
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

export interface JettonMaster {
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

export interface JettonTransfer {
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

export interface NftCollection {
	address: string;
	code_hash: string;
	collection_content: { [key: string]: any };
	data_hash: string;
	last_transaction_lt: string;
	next_item_index: string;
	owner_address: string;
}

export interface NftItem {
	address: string;
	code_hash: string;
	collection: NftCollection;
	collection_address: string;
	content: { [key: string]: any };
	data_hash: string;
	index: string;
	init: boolean;
	last_transaction_lt: string;
	owner_address: string;
}

export interface NftTransfer {
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

export interface TopAccount {
	account: string;
	balance: string;
}