import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
import { SentiraConfig, ApiKeyRequest, ApiKeyResponse, GetApiKeysResponse, DeleteApiKeyResponse, ValidateApiKeyRequest, ValidateApiKeyResponse, SummarizeOptions, SummarizeResponse, TranscribeOptions, TranscribeResponse } from './types';
import { SentiraApiError } from './errors';
import logger from './utils/logger';

class SentiraAI {
    private readonly config: SentiraConfig;
    private axiosInstance: AxiosInstance;

    constructor(config: SentiraConfig) {
        this.config = {
            baseUrl: 'https://api.sentiraai.com',
            ...config
        };

        if (!this.config.apiKey && !this.config.accessToken) {
            throw new Error('Either apiKey or accessToken must be provided');
        }

        this.axiosInstance = axios.create(); // Initialize with an empty instance
        this.initializeAxiosInstance(); // Then configure it
    }

    private initializeAxiosInstance(): void {
        const headers: Record<string, string> = {};
        if (this.config.apiKey) {
            headers['x-api-key'] = this.config.apiKey;
        } else if (this.config.accessToken) {
            headers['Authorization'] = `Bearer ${this.config.accessToken}`;
        }

        this.axiosInstance = axios.create({
            baseURL: this.config.baseUrl,
            headers
        });
    }

    public setBaseUrl(baseUrl: string): void {
        this.config.baseUrl = baseUrl;
        this.initializeAxiosInstance();
    }

    public setApiKey(apiKey: string): void {
        this.config.apiKey = apiKey;
        this.config.accessToken = undefined;
        this.initializeAxiosInstance();
    }

    public setAccessToken(accessToken: string): void {
        this.config.accessToken = accessToken;
        this.config.apiKey = undefined;
        this.initializeAxiosInstance();
    }

    private async request<T>(config: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.axiosInstance.request<T>(config);
            return response.data;
        } catch (error) {
            logger.error('API request failed', {
                error: error instanceof Error ? error.message : String(error),
                endpoint: config.url
            });
            if (axios.isAxiosError(error) && error.response) {
                throw new SentiraApiError(`API error: ${error.response.status} - ${error.response.data.detail}`, error.response.status);
            } else if (error instanceof Error) {
                throw new SentiraApiError(`Network error: ${error.message}`);
            } else {
                throw new SentiraApiError('An unknown error occurred');
            }
        }
    }

    public async createApiKey(request: ApiKeyRequest): Promise<ApiKeyResponse> {
        return this.request<ApiKeyResponse>({
            method: 'POST',
            url: '/api-keys',
            data: request
        });
    }

    public async getApiKeys(): Promise<GetApiKeysResponse> {
        return this.request<GetApiKeysResponse>({
            method: 'GET',
            url: '/api-keys'
        });
    }

    public async deleteApiKey(apiKeyId: string): Promise<DeleteApiKeyResponse> {
        return this.request<DeleteApiKeyResponse>({
            method: 'DELETE',
            url: `/api-keys/${apiKeyId}`
        });
    }

    public async validateApiKey(request: ValidateApiKeyRequest): Promise<ValidateApiKeyResponse> {
        return this.request<ValidateApiKeyResponse>({
            method: 'POST',
            url: '/api-keys/validate',
            data: request
        });
    }

    public async summarize(options: SummarizeOptions): Promise<SummarizeResponse> {
        const formData = new FormData();
        for (const [key, value] of Object.entries(options)) {
            if (key === 'file' && value instanceof Buffer) {
                formData.append('file', value, { filename: 'document.pdf' });
            } else {
                formData.append(key, value as string | Blob);
            }
        }

        return this.request<SummarizeResponse>({
            method: 'POST',
            url: '/summarize',
            data: formData,
            headers: { ...formData.getHeaders() }
        });
    }

    public async transcribe(options: TranscribeOptions): Promise<TranscribeResponse> {
        const formData = new FormData();
        for (const [key, value] of Object.entries(options)) {
            if (key === 'file' && value instanceof Buffer) {
                formData.append('file', value, 'audio.mp3');
            } else {
                formData.append(key, value as string);
            }
        }

        return this.request<TranscribeResponse>({
            method: 'POST',
            url: '/transcribe',
            data: formData,
            headers: formData.getHeaders()
        });
    }
}

export default SentiraAI;