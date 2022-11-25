import axios, { AxiosRequestConfig } from 'axios';
import { IHttpClientTool } from './interfaces/IHttpClientTool';
import { IHttpClientToolRequestParameters } from './interfaces/IHttpClientToolRequestParameters';

/**
 * HttpClientTool provider
 */
export class HttpClientTool<S> implements IHttpClientTool<S> {
    /**
     * Get wrapper HttpClientTool Method
     * @param {IHttpClientToolRequestParameters<T>} parameters
     * @param {Promise<T>} resp
     */
    async get<T>(parameters: IHttpClientToolRequestParameters<S>): Promise<T> {
        const { url, config } = parameters;
        const options: AxiosRequestConfig = {
            headers: config?.headers,
            params: config?.params,
            timeout: config?.timeout ? config.timeout * 1000 : undefined,
        };
        const response = await axios.get(url, options);
        return response.data as T;
    }
    /**
     * Post wrapper HttpClientTool Method
     * @param {IHttpClientToolRequestParameters<T>} parameters
     * @param {Promise<T>} resp
     */
    async post<T>(parameters: IHttpClientToolRequestParameters<S>): Promise<T> {
        const { url, body, config } = parameters;
        const options: AxiosRequestConfig = {
            headers: config?.headers,
            timeout: config?.timeout ? config.timeout * 1000 : undefined,
        };
        const response = await axios.post(url, body, options);
        return response.data as T;
    }
    /**
     * Put wrapper HttpClientTool Method
     * @param {IHttpClientToolRequestParameters<T>} parameters
     * @param {Promise<T>} resp
     */
    async put<T>(parameters: IHttpClientToolRequestParameters<S>): Promise<T> {
        const { url, body, config } = parameters;
        const options: AxiosRequestConfig = {
            headers: config?.headers,
            timeout: config?.timeout ? config.timeout * 1000 : undefined,
        };
        const response = await axios.put(url, body, options);
        return response.data as T;
    }
    /**
     * Delete wrapper HttpClientTool Method
     * @param {IHttpClientToolRequestParameters<T>} parameters
     * @param {Promise<T>} resp
     */
    async delete<T>(parameters: IHttpClientToolRequestParameters<S>): Promise<T> {
        const { url, body, config } = parameters;
        const options: AxiosRequestConfig = {
            headers: config?.headers,
            params: config?.params,
            data: body,
            timeout: config?.timeout ? config.timeout * 1000 : undefined,
        };
        const response = await axios.delete(url, options);
        return response.data as T;
    }

    /**
     * Put wrapper HttpClientTool Method
     * @param {IHttpClientToolRequestParameters<T>} parameters
     * @param {Promise<T>} resp
     */
    async patch<T>(parameters: IHttpClientToolRequestParameters<S>): Promise<T> {
        const { url, body, config } = parameters;
        const options: AxiosRequestConfig = {
            headers: config?.headers,
            timeout: config?.timeout ? config.timeout * 1000 : undefined,
        };
        const response = await axios.patch(url, body, options);
        return response.data as T;
    }
}
