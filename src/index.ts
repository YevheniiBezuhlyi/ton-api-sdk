import { TonCenterApiSdkV2 } from './v2/v2-api.sdk';
import { TonCenterApiSdkV3 } from './v3/v3-api.sdk';

export default class TonCenterApiSdk {
	public v2: TonCenterApiSdkV2;
	public v3: TonCenterApiSdkV3;

	constructor(baseURL: string, apiKey?: string) {
		this.v2 = new TonCenterApiSdkV2(baseURL, apiKey);
		this.v3 = new TonCenterApiSdkV3(baseURL, apiKey);
	}
}