# TON API SDK (unofficial)
[![NPM](https://nodei.co/npm/ton-api-sdk.png?mini=true)](https://npmjs.org/package/ton-api-sdk)

## Current Status
- V3 ✅
  - /api/v3/transactionsByMasterchainBlock 🚫
  - /api/v3/masterchainInfo🚫
  - /api/v3/masterchainBlockShards🚫
  - /api/v3/masterchainBlockShardState🚫
- V2 accounts section ✅
- V2 blocks section 🚫 
- V2 transactions section🚫
- V2 get config section🚫
- V2 run section ⚠️- responses aren't parsed
- V2 send section ⚠️ - responses aren't parsed
- V2 json rpc section ⚠️ - responses aren't parsed
- Rate limit handling 🚫

## Introduction

The TON API SDK is a TypeScript library that provides a convenient way to interact with the TON (The Open Network) blockchain through Ton API. 
This SDK simplifies the process of querying blockchain data, sending transactions, and interacting with smart contracts on the TON network.

The SDK includes V2 and V3.

## Compatible Data Providers
List of compatible data providers:
- [TON API](https://ton.com/)
- [ChainStack](https://chainstack.com/)

## Features

- Full coverage of the TON API endpoints
- Type-safe methods and responses
- Promise-based asynchronous calls
- Comprehensive error handling
- Built-in TypeScript support
- Easy-to-use interface for common blockchain operations

## Installation

You can install the TON API SDK using npm:

```bash
npm install ton-api-sdk
```

Or using yarn:

```bash
yarn add ton-api-sdk
```

## Usage

First, import the SDK and create an instance:

```typescript
import TonApiSdk from 'ton-api-sdk';

const apiKey = 'your-api-key-here'; // optional
const baseURL = 'https://ton.com'; https://ton-testnet.core.chainstack.com/${api_key}/

const tonApi = new TonCenterApiSdk(baseURL, apiKey);
```

Now you can use the `tonApi` instance to make calls to the TON API:

```typescript
async function example() {
  try {
    const accountStates = await tonApi.v3.getAccountStates(['EQA...', 'EQB...']);
    console.log('Account States:', accountStates);

    const blocks = await tonApi.v3.getBlocks({ limit: 10, sort: 'desc' });
    console.log('Recent Blocks:', blocks);

    const transactions = await tonApi.v3.getTransactions({ limit: 5, sort: 'desc' });
    console.log('Recent Transactions:', transactions);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

example();
```

## API Reference

The SDK provides methods corresponding to all endpoints of the TON API. Here's a brief overview of the main categories:

### Accounts V3
- `getAccountStates(addresses: string[], includeBoc: boolean = true)`
- `getAddressBook(addresses: string[])`
- `getWalletStates(addresses: string[])`

### Events V3
- `getActions(actionIds?: string[], traceIds?: string[])`
- `getEvents(params: EventParams)`

### Blockchain V3
- `getBlocks(params: BlockParams)`
- `getTransactions(params: TransactionParams)`
- `getMessages(params: MessageParams)`
- `getMasterchainInfo()`

### Jettons V3
- `getJettonBurns(params: JettonBurnParams)`
- `getJettonMasters(params: JettonMasterParams)`
- `getJettonTransfers(params: JettonTransferParams)`

### NFTs V3
- `getNftCollections(params: NftCollectionParams)`
- `getNftItems(params: NftItemParams)`
- `getNftTransfers(params: NftTransferParams)`

### Stats V3
- `getTopAccountsByBalance(limit?: number, offset?: number)`

For detailed information on each method and its parameters, please refer to the TypeScript definitions in the source code.

## Examples

### Fetching Account Information

```typescript
const accountInfo = await tonApi.v3.getAddressInformation('EQA...');
console.log('Account Info:', accountInfo);
```

### Getting Recent Transactions

```typescript
const transactions = await tonApi.v3.getTransactions({
  limit: 10,
  sort: 'desc'
});
console.log('Recent Transactions:', transactions);
```

### Fetching NFT Items

```typescript
const nftItems = await tonApi.v3.getNftItems({
  collectionAddress: 'EQA...',
  limit: 20
});
console.log('NFT Items:', nftItems);
```

## Error Handling

The SDK uses a custom error handling mechanism. All API calls are wrapped in a try-catch block. If an error occurs, it will be thrown with a descriptive message. You should always wrap your SDK calls in a try-catch block:

```typescript
try {
  const result = await tonApi.v3.someMethod();
  // Handle successful result
} catch (error) {
  console.error('An error occurred:', error.message);
  // Handle error appropriately
}
```

## TypeScript Support

This SDK is written in TypeScript and provides type definitions for all methods and responses. This ensures type safety and enables better IDE support with autocompletion and inline documentation.

## Contributing

Contributions to the TON API SDK are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with a clear commit message
4. Push your changes to your fork
5. Create a pull request to the main repository

Please ensure that your code follows the existing style.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

For more information about the Ton API, please visit the [official TON documentation](https://ton.com/).

If you encounter any issues or have questions, please open an issue on the [GitHub repository](https://github.com/YevheniiBezuhlyi/ton-api-sdk/issues).