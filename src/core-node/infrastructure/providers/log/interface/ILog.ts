export interface ILog {
    method?: string;
    url?: string;
    message: string;
    request: {
        headers: Record<string, string>;
        body?: Record<string, unknown>;
    };
    response?: {
        status?: number;
        body?: Record<string, unknown>;
    };
}
