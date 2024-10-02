# Unofficial Toncenter API SDK
Supports only V3 API version.

## Usage example
```ts
import TonApiSdk from './ton-api-sdk';

const apiKey = 'your-api-key-here';
const baseURL = 'https://toncenter.com/';

const tonApi = new ToncenterApiSdk(baseURL, apiKey);

async function example() {
  try {
    const accountStates = await tonApi.getAccountStates(['address1', 'address2']);
    console.log(accountStates.accounts);

    const blocks = await tonApi.getBlocks({ limit: 10, sort: 'desc' });
    console.log(blocks.blocks);

    const jettonTransfers = await tonApi.getJettonTransfers({ limit: 5, sort: 'desc' });
    console.log(jettonTransfers.jetton_transfers);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

example();
```
