export class SentiraApiError extends Error {
    constructor(message: string, public statusCode?: number) {
        super(message);
        this.name = 'SentiraApiError';
    }
}