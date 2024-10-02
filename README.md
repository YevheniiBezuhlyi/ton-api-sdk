# TONCENTER API SDK

## Introduction

The TONCENTER API SDK is a TypeScript library that provides a convenient way to interact with the TON (The Open Network) blockchain through its API. This SDK simplifies the process of querying blockchain data, sending transactions, and interacting with smart contracts on the TON network.

## Compatible Data Providers
List of compatible data providers:
- [TONCENTER API](https://toncenter.com/)
- [ChainStack] (https://chainstack.com/)

## Features

- Full coverage of the TONCENTER API endpoints
- Type-safe methods and responses
- Promise-based asynchronous calls
- Comprehensive error handling
- Built-in TypeScript support
- Easy-to-use interface for common blockchain operations

## Installation

You can install the TONCENTER API SDK using npm:

```bash
npm install toncenter-api-sdk
```

Or using yarn:

```bash
yarn add toncenter-api-sdk
```

## Usage

First, import the SDK and create an instance:

```typescript
import ToncenterApiSdk from 'toncenter-api-sdk';

const apiKey = 'your-api-key-here';
const baseURL = 'https://toncenter.com'; https://ton-testnet.core.chainstack.com/${api_key}/

const toncenterApi = new ToncenterApiSdk(baseURL, apiKey);
```

Now you can use the `toncenterApi` instance to make calls to the TONCENTER API:

```typescript
async function example() {
  try {
    const accountStates = await toncenterApi.getAccountStates(['EQA...', 'EQB...']);
    console.log('Account States:', accountStates);

    const blocks = await toncenterApi.getBlocks({ limit: 10, sort: 'desc' });
    console.log('Recent Blocks:', blocks);

    const transactions = await toncenterApi.getTransactions({ limit: 5, sort: 'desc' });
    console.log('Recent Transactions:', transactions);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

example();
```

## API Reference

The SDK provides methods corresponding to all endpoints of the TONCENTER API. Here's a brief overview of the main categories:

### Accounts
- `getAccountStates(addresses: string[], includeBoc: boolean = true)`
- `getAddressBook(addresses: string[])`
- `getWalletStates(addresses: string[])`

### Events
- `getActions(actionIds?: string[], traceIds?: string[])`
- `getEvents(params: EventParams)`

### Blockchain
- `getBlocks(params: BlockParams)`
- `getTransactions(params: TransactionParams)`
- `getMessages(params: MessageParams)`
- `getMasterchainInfo()`

### Jettons
- `getJettonBurns(params: JettonBurnParams)`
- `getJettonMasters(params: JettonMasterParams)`
- `getJettonTransfers(params: JettonTransferParams)`

### NFTs
- `getNftCollections(params: NftCollectionParams)`
- `getNftItems(params: NftItemParams)`
- `getNftTransfers(params: NftTransferParams)`

### Stats
- `getTopAccountsByBalance(limit?: number, offset?: number)`

For detailed information on each method and its parameters, please refer to the TypeScript definitions in the source code.

## Examples

### Fetching Account Information

```typescript
const accountInfo = await toncenterApi.getAddressInformation('EQA...');
console.log('Account Info:', accountInfo);
```

### Getting Recent Transactions

```typescript
const transactions = await toncenterApi.getTransactions({
  limit: 10,
  sort: 'desc'
});
console.log('Recent Transactions:', transactions);
```

### Fetching NFT Items

```typescript
const nftItems = await toncenterApi.getNftItems({
  collectionAddress: 'EQA...',
  limit: 20
});
console.log('NFT Items:', nftItems);
```

## Error Handling

The SDK uses a custom error handling mechanism. All API calls are wrapped in a try-catch block. If an error occurs, it will be thrown with a descriptive message. You should always wrap your SDK calls in a try-catch block:

```typescript
try {
  const result = await toncenterApi.someMethod();
  // Handle successful result
} catch (error) {
  console.error('An error occurred:', error.message);
  // Handle error appropriately
}
```

## TypeScript Support

This SDK is written in TypeScript and provides type definitions for all methods and responses. This ensures type safety and enables better IDE support with autocompletion and inline documentation.

## Contributing

Contributions to the TONCENTER API SDK are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with a clear commit message
4. Push your changes to your fork
5. Create a pull request to the main repository

Please ensure that your code follows the existing style and includes appropriate tests and documentation.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

For more information about the Toncenter blockchain and its API, please visit the [official TON documentation](https://toncenter.com/).

If you encounter any issues or have questions, please open an issue on the [GitHub repository](https://github.com/YevheniiBezuhlyi/toncenter-api-sdk/issues).