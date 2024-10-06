import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class Base {
    protected axiosInstance: AxiosInstance;
    private logRequests: boolean;

    constructor(baseURL: string, apiKey?: string, logRequests: boolean = false) {
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
        this.logRequests = logRequests;
    }

    protected async request<T>(method: string, url: string, params?: any): Promise<T> {
        try {
            const config: AxiosRequestConfig = {
                method,
                url,
            };

            if (params) {
                if (method === 'GET' || method === 'DELETE') {
                    config.params = this.flattenParams(params);
                } else {
                    config.data = params;
                }
            }

            if (this.logRequests) {
                console.log(`Request: ${method} ${url}`, config);
            }

            const response = await this.axiosInstance.request<T>(config);

            if (this.logRequests) {
                console.log(`Response: ${method} ${url}`, response.data);
            }

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(`API Error: ${error.response.status} - ${error.response.data.error}`);
            }
            throw error;
        }
    }

    private flattenParams(params: any): any {
        const result: any = {};
        for (const [key, value] of Object.entries(params)) {
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    result[`${key}`] = item;
                });
            } else {
                result[key] = value;
            }
        }
        return result;
    }
}