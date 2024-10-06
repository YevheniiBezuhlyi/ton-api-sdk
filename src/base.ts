import axios, { AxiosInstance } from 'axios';

export class Base {
    protected axiosInstance: AxiosInstance;
    private readonly logRequests: boolean;

    constructor(baseURL: string, apiKey?: string, logRequests?: boolean) {
        this.logRequests = logRequests ? logRequests : false;
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
            if (this.logRequests) {
                console.log(`API Request
                Method: ${method}
                URL: ${url}
                Params: ${JSON.stringify(params)}`);
            }
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
