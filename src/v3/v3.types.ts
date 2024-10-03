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
    raw_action: any; // super could be further detailed if needed
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
    trace: any; // super could be further detailed if needed
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
    description: V3TransactionDescription;
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

export interface V3AccountState {
    account_status: string;
    balance: string;
    code_boc: string;
    code_hash: string;
    data_boc: string;
    data_hash: string;
    frozen_hash: string;
    hash: string;
}

export interface V3TransactionDescription {
    aborted: boolean;
    action: {
        action_list_hash: string;
        msgs_created: number;
        no_funds: boolean;
        result_arg: number;
        result_code: number;
        skipped_actions: number;
        spec_actions: number;
        status_change: string;
        success: boolean;
        tot_actions: number;
        tot_msg_size: {
            bits: string;
            cells: string;
        };
        total_action_fees: string;
        total_fwd_fees: string;
        valid: boolean;
    };
    bounce: {
        fwd_fees: string;
        msg_fees: string;
        msg_size: {
            bits: string;
            cells: string;
        };
        req_fwd_fees: string;
        type: string;
    };
    compute_ph: {
        account_activated: boolean;
        exit_arg: number;
        exit_code: number;
        gas_credit: string;
        gas_fees: string;
        gas_limit: string;
        gas_used: string;
        mode: number;
        msg_state_used: boolean;
        reason: string;
        skipped: boolean;
        success: boolean;
        vm_final_state_hash: string;
        vm_init_state_hash: string;
        vm_steps: number;
    };
    credit_first: boolean;
    credit_ph: {
        credit: string;
        due_fees_collected: string;
    };
    destroyed: boolean;
    installed: boolean;
    is_tock: boolean;
    split_info: {
        acc_split_depth: number;
        cur_shard_pfx_len: number;
        sibling_addr: string;
        super_addr: string;
    };
    storage_ph: {
        status_change: string;
        storage_fees_collected: string;
        storage_fees_due: string;
    };
    type: string;
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
    init_state: V3MessageContent;
    message_content: V3MessageContent;
    opcode: number;
    source: string;
    value: string;
}

export interface V3MessageContent {
    body: string;
    decoded: {
        comment: string;
        type: string;
    };
    hash: string;
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
