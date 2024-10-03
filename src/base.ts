import axios, {AxiosInstance} from "axios";

export class TonCenterApiSdkBase {
	protected axiosInstance: AxiosInstance;

	constructor(baseURL: string, apiKey?: string) {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		};
		if (apiKey) {
			headers['X-Api-Key'] = apiKey;
		}
		this.axiosInstance = axios.create({
			baseURL,
			headers,
		});
	}

	protected async request<T>(method: string, url: string, params?: any): Promise<T> {
		try {
			const response = await this.axiosInstance.request<T>({
				method,
				url,
				params,
			});
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				throw new Error(`API Error: ${error.response.status} - ${error.response.data.error}`);
			}
			throw error;
		}
	}
}