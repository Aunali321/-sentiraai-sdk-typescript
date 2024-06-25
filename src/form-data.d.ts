declare module 'form-data' {
    class FormData {
        append(key: string, value: any, options?: any): void;
        getHeaders(): { [key: string]: string };
    }
    export = FormData;
}