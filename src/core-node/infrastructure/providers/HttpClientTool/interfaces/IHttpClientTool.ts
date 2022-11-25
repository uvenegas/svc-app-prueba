import { IHttpClientToolRequestParameters } from './IHttpClientToolRequestParameters';

export interface IHttpClientTool<S> {
    get<T>(parameters: IHttpClientToolRequestParameters<S>): Promise<T>;
    post<T>(parameters: IHttpClientToolRequestParameters<S>): Promise<T>;
    put<T>(parameters: IHttpClientToolRequestParameters<S>): Promise<T>;
    delete<T>(parameters: IHttpClientToolRequestParameters<S>): Promise<T>;
}
