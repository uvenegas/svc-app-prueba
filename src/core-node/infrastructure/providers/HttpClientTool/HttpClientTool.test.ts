import { HttpClientTool } from './HttpClientTool';
import { IHttpClientToolRequestParameters } from './interfaces/IHttpClientToolRequestParameters';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

jest.mock('axios');

describe('HttpClientTool test', () => {
    interface IExample {
        testAttr: string;
    }
    const mockedUrl = 'http://urldeprueba.com';
    const mockedResponse: AxiosResponse = {
        data: {
            testAttr: 'Henry',
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
    };
    const mockErrorResponse: AxiosError = {
        isAxiosError: true,
        response: {
            statusText: 'error',
            headers: {},
            config: {},
            status: 400,
            data: {
                testAttr: 'Henry',
            },
        },
        config: {},
        toJSON: () => ({}),
        name: 'error',
        message: 'error',
    };
    const mockData: IExample = {
        testAttr: 'Henry',
    };
    describe('HttpClientTool instance', () => {
        test('should instantiate HttpClientTool Class with default interface', () => {
            const httpClientToolInstance = new HttpClientTool();
            expect(httpClientToolInstance).toEqual({});
        });
    });
    describe('HttpClientTool get method', () => {
        describe('HttpClientTool get method - Success', () => {
            test('should invoke instance method with given parameters', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.get.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(httpClientToolInstance, 'get');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                };
                await httpClientToolInstance.get(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters);
            });
            test('should setup axios call with url', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.get.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'get');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                };
                const options: AxiosRequestConfig = {
                    headers: undefined,
                    params: undefined,
                    timeout: undefined,
                };
                await httpClientToolInstance.get(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, options);
            });
            test('should setup axios call with url and header', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.get.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'get');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                    config: {
                        headers: { headerAttr: 'test' },
                    },
                };
                const options: AxiosRequestConfig = {
                    headers: httpClientToolParameters.config?.headers,
                    params: undefined,
                    timeout: undefined,
                };
                await httpClientToolInstance.get(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, options);
            });
            test('should setup axios call with url, header and params', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.get.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'get');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                    config: {
                        headers: { headerAttr: 'test' },
                        params: {
                            paramAttr: 'test',
                        },
                    },
                };
                const options: AxiosRequestConfig = {
                    headers: httpClientToolParameters.config?.headers,
                    params: httpClientToolParameters.config?.params,
                    timeout: undefined,
                };
                await httpClientToolInstance.get(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, options);
            });
            test('should setup axios call with url, header, params and timeout', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.get.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'get');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                    config: {
                        headers: { headerAttr: 'test' },
                        params: {
                            paramAttr: 'test',
                        },
                        timeout: 10,
                    },
                };
                const options: AxiosRequestConfig = {
                    headers: httpClientToolParameters.config?.headers,
                    params: httpClientToolParameters.config?.params,
                    timeout: 10000,
                };
                await httpClientToolInstance.get(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, options);
            });
            test('should setup axios call with timeout multiplied by 1000', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.get.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'get');
                const timeout = 10;
                const timeoutMultiplier = 1000;
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                    config: {
                        timeout,
                    },
                };
                const options: AxiosRequestConfig = {
                    headers: httpClientToolParameters.config?.headers,
                    params: httpClientToolParameters.config?.params,
                    timeout: timeout * timeoutMultiplier,
                };
                await httpClientToolInstance.get(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, options);
            });
        });
        describe('HttpClientTool get method - Errors', () => {
            test('should return axios error', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.get.mockRejectedValue(mockErrorResponse);
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                };
                try {
                    await httpClientToolInstance.get(httpClientToolParameters);
                } catch (error) {
                    expect(error).toBe(mockErrorResponse);
                }
            });
        });
    });
    describe('HttpClientTool post method', () => {
        describe('HttpClientTool post method - Success', () => {
            test('should invoke instance method with given parameters', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.post.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(httpClientToolInstance, 'post');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                };
                await httpClientToolInstance.post(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters);
            });
            test('should setup axios call with url', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.post.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'post');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                };
                const options: AxiosRequestConfig = {
                    headers: undefined,
                    timeout: undefined,
                };
                await httpClientToolInstance.post(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, undefined, options);
            });
            test('should setup axios call with url and body', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.post.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'post');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                    body: mockData,
                };
                const options: AxiosRequestConfig = {
                    headers: undefined,
                    timeout: undefined,
                };
                await httpClientToolInstance.post(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, httpClientToolParameters.body, options);
            });
            test('should setup axios call with url, body and header', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.post.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'post');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                    body: mockData,
                    config: {
                        headers: { headerAttr: 'test' },
                    },
                };
                const options: AxiosRequestConfig = {
                    headers: httpClientToolParameters.config?.headers,
                    timeout: undefined,
                };
                await httpClientToolInstance.post(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, httpClientToolParameters.body, options);
            });
            test('should setup axios call with url, body, header and timeout', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.post.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'post');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                    config: {
                        headers: { headerAttr: 'test' },
                        timeout: 10,
                    },
                };
                const options: AxiosRequestConfig = {
                    headers: httpClientToolParameters.config?.headers,
                    timeout: 10000,
                };
                await httpClientToolInstance.post(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, httpClientToolParameters.body, options);
            });
            test('should setup axios call with timeout config multiplied by 1000', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.post.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'post');
                const timeout = 10;
                const timeoutMultiplier = 1000;
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                    body: mockData,
                    config: {
                        timeout,
                    },
                };
                const options: AxiosRequestConfig = {
                    headers: httpClientToolParameters.config?.headers,
                    timeout: timeout * timeoutMultiplier,
                };
                await httpClientToolInstance.post(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, httpClientToolParameters.body, options);
            });
        });
        describe('HttpClientTool post method - Errors', () => {
            test('should return axios error', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.post.mockRejectedValue(mockErrorResponse);
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                };
                try {
                    await httpClientToolInstance.post(httpClientToolParameters);
                } catch (error) {
                    expect(error).toBe(mockErrorResponse);
                }
            });
        });
    });
    describe('HttpClientTool put method', () => {
        describe('HttpClientTool put method - Success', () => {
            test('should invoke instance method with given parameters', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.put.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(httpClientToolInstance, 'put');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                };
                await httpClientToolInstance.put(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters);
            });
            test('should setup axios call with url', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.put.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'put');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                };
                const options: AxiosRequestConfig = {
                    headers: undefined,
                    timeout: undefined,
                };
                await httpClientToolInstance.put(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, undefined, options);
            });
            test('should setup axios call with url and body', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.put.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'put');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                    body: mockData,
                };
                const options: AxiosRequestConfig = {
                    headers: undefined,
                    timeout: undefined,
                };
                await httpClientToolInstance.put(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, httpClientToolParameters.body, options);
            });
            test('should setup axios call with url, body and header', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.put.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'put');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                    body: mockData,
                    config: {
                        headers: { headerAttr: 'test' },
                    },
                };
                const options: AxiosRequestConfig = {
                    headers: httpClientToolParameters.config?.headers,
                    timeout: undefined,
                };
                await httpClientToolInstance.put(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, httpClientToolParameters.body, options);
            });
            test('should setup axios call with url, body, header and timeout', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.put.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'put');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                    config: {
                        headers: { headerAttr: 'test' },
                        timeout: 10,
                    },
                };
                const options: AxiosRequestConfig = {
                    headers: httpClientToolParameters.config?.headers,
                    timeout: 10000,
                };
                await httpClientToolInstance.put(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, httpClientToolParameters.body, options);
            });
            test('should setup axios call with timeout config multiplied by 1000', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.put.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'put');
                const timeout = 10;
                const timeoutMultiplier = 1000;
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                    body: mockData,
                    config: {
                        timeout,
                    },
                };
                const options: AxiosRequestConfig = {
                    headers: httpClientToolParameters.config?.headers,
                    timeout: timeout * timeoutMultiplier,
                };
                await httpClientToolInstance.put(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, httpClientToolParameters.body, options);
            });
        });
        describe('HttpClientTool put method - Errors', () => {
            test('should return axios error', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.put.mockRejectedValue(mockErrorResponse);
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                };
                try {
                    await httpClientToolInstance.put(httpClientToolParameters);
                } catch (error) {
                    expect(error).toBe(mockErrorResponse);
                }
            });
        });
    });
    describe('HttpClientTool delete method', () => {
        describe('HttpClientTool delete method - Success', () => {
            test('should invoke instance method with given parameters', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.delete.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(httpClientToolInstance, 'delete');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                };
                await httpClientToolInstance.delete(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters);
            });
            test('should setup axios call with url', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.delete.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'delete');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                };
                const options: AxiosRequestConfig = {
                    headers: undefined,
                    params: undefined,
                    timeout: undefined,
                    data: undefined,
                };
                await httpClientToolInstance.delete(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, options);
            });
            test('should setup axios call with url and body', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.delete.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'delete');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                    body: mockData,
                };
                const options: AxiosRequestConfig = {
                    headers: undefined,
                    params: undefined,
                    timeout: undefined,
                    data: httpClientToolParameters.body,
                };
                await httpClientToolInstance.delete(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, options);
            });
            test('should setup axios call with url, body and header', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.delete.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'delete');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                    body: mockData,
                    config: {
                        headers: { headerAttr: 'test' },
                    },
                };
                const options: AxiosRequestConfig = {
                    headers: httpClientToolParameters.config?.headers,
                    params: undefined,
                    timeout: undefined,
                    data: httpClientToolParameters.body,
                };
                await httpClientToolInstance.delete(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, options);
            });
            test('should setup axios call with url, body, header and params', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.delete.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'delete');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                    body: mockData,
                    config: {
                        headers: { headerAttr: 'test' },
                        params: {
                            paramAttr: 'test',
                        },
                    },
                };
                const options: AxiosRequestConfig = {
                    headers: httpClientToolParameters.config?.headers,
                    params: httpClientToolParameters.config?.params,
                    timeout: undefined,
                    data: httpClientToolParameters.body,
                };
                await httpClientToolInstance.delete(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, options);
            });
            test('should setup axios call with url, body, header, params and timeout', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.delete.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'delete');
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                    config: {
                        headers: { headerAttr: 'test' },
                        params: {
                            paramAttr: 'test',
                        },
                        timeout: 10,
                    },
                };
                const options: AxiosRequestConfig = {
                    headers: httpClientToolParameters.config?.headers,
                    params: httpClientToolParameters.config?.params,
                    timeout: 10000,
                    data: httpClientToolParameters.body,
                };
                await httpClientToolInstance.delete(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, options);
            });
            test('should setup axios call with timeout config multiplied by 1000', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.delete.mockResolvedValue(mockedResponse);
                const spy = jest.spyOn(mockedHttpClientTool, 'delete');
                const timeout = 10;
                const timeoutMultiplier = 1000;
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                    config: {
                        timeout,
                    },
                };
                const options: AxiosRequestConfig = {
                    headers: httpClientToolParameters.config?.headers,
                    params: undefined,
                    timeout: timeout * timeoutMultiplier,
                    data: undefined,
                };
                await httpClientToolInstance.delete(httpClientToolParameters);
                expect(spy).toHaveBeenCalledWith(httpClientToolParameters.url, options);
            });
        });
        describe('HttpClientTool delete method - Errors', () => {
            test('should return axios error', async () => {
                const httpClientToolInstance = new HttpClientTool();
                const mockedHttpClientTool = axios as jest.Mocked<typeof axios>;
                mockedHttpClientTool.delete.mockRejectedValue(mockErrorResponse);
                const httpClientToolParameters: IHttpClientToolRequestParameters<IExample> = {
                    url: mockedUrl,
                };
                try {
                    await httpClientToolInstance.delete(httpClientToolParameters);
                } catch (error) {
                    expect(error).toBe(mockErrorResponse);
                }
            });
        });
    });
});
