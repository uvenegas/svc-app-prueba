export interface IHttpClientToolRequestParameters<T> {
    url: string;
    body?: T;
    config?: {
        headers?: { [k: string]: unknown };
        params?: { [k: string]: unknown };
        timeout?: number;
    };
}
