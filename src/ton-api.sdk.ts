import { TonApiSdkV2 } from './v2/v2-api.sdk';
import { TonApiSdkV3 } from './v3/v3-api.sdk';

export class TonApiSdk {
    public v2: TonApiSdkV2;
    public v3: TonApiSdkV3;

    constructor(baseURL: string, apiKey?: string, logRequests?: boolean) {
        this.v2 = new TonApiSdkV2(baseURL, apiKey, logRequests);
        this.v3 = new TonApiSdkV3(baseURL, apiKey, logRequests);
    }
}