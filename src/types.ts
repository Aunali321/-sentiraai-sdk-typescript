export interface SentiraConfig {
    apiKey?: string;
    accessToken?: string;
    baseUrl?: string;
}

export interface ApiKeyRequest {
    name: string;
    scopes: string[];
}

export interface ApiKey {
    id: string;
    name: string;
    key: string;
    scopes: string[];
    created_at: string;
    user_id: string;
}

export interface ApiKeyResponse {
    result: string;
    api_key: ApiKey;
}

export interface GetApiKeysResponse {
    result: string;
    api_keys: ApiKey[];
}

export interface DeleteApiKeyResponse {
    result: string;
}

export interface ValidateApiKeyRequest {
    api_key: string;
}

export interface ValidateApiKeyResponse {
    result: string;
    valid: boolean;
}

export interface SummarizeOptions {
    text?: string;
    file?: Buffer;
    summary_length: 'short' | 'medium' | 'long';
    summary_format: 'bullets' | 'paragraph';
    model: 'anthropic' | 'google';
    additional_command?: string;
    stream?: boolean;
}

export interface TranscribeOptions {
    file?: Buffer;
    input_type: 'file' | 'url';
    transcript_type: 'text';
    audio_url?: string;
    use_subtitles?: boolean;
    model: 'nova-2' | 'whisper-large';
}

export interface SummarizeResponse {
    result: string;
    credits_used: number;
    tokens_processed: number;
    response: {
        summary: string;
    };
}

export interface TranscribeResponse {
    result: string;
    response: {
        transcript: string;
        response: Record<string, unknown>;
    };
    credits_used: number;
    audio_duration: number;
    model: string;
    error?: string;
}