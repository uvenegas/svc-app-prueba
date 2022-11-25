import { ISmsDataToSend } from './interfaces/ISmsDataToSend';
import { IOptions } from './interfaces/IOptions';
import * as smsService from './smsService';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ISmsResponse } from './interfaces/IResponse';

jest.mock('axios');
describe('smsService test', () => {
    const ani = 'test';
    const mobileNumber = '959423069';
    const message = 'Mensaje a enviar';
    const dataToSend: ISmsDataToSend = {
        ani,
        mobileNumber,
        message,
    };
    const config: IOptions = {
        clientId: 'testId',
        clientPassword: 'testPassword',
    };
    const expectedBody =
        "<?xml version='1.0' encoding='UTF-8'?>\n" +
        '<senv:Envelope xmlns:tns="telecochile" xmlns:s0="telecoService" xmlns:senv="http://schemas.xmlsoap.org/soap/envelope/">' +
        '<senv:Body>' +
        '<tns:submitMsgResponse>' +
        '<tns:submitMsgResult>' +
        '<s0:code>0</s0:code>' +
        '<s0:message>Message Queued</s0:message>' +
        '<s0:id>619571814</s0:id>' +
        '</tns:submitMsgResult>' +
        '</tns:submitMsgResponse>' +
        '</senv:Body>' +
        '</senv:Envelope>';
    const expectedError =
        "<?xml version='1.0' encoding='UTF-8'?>\n" +
        '<senv:Envelope xmlns:tns="telecochile" xmlns:s0="telecoService" xmlns:senv="http://schemas.xmlsoap.org/soap/envelope/">' +
        '<senv:Body>' +
        '<tns:submitMsgResponse>' +
        '<tns:submitMsgResult>' +
        '<s0:code>4</s0:code>' +
        '<s0:message>Invalid DNIS: Not a Number</s0:message>' +
        '<s0:id>-1</s0:id>' +
        '</tns:submitMsgResult>' +
        '</tns:submitMsgResponse>' +
        '</senv:Body>' +
        '</senv:Envelope>';
    describe('smsService Test', () => {
        describe('xmlFormat method', () => {
            describe('xmlFormat method - Success', () => {
                test('should return xml with params', () => {
                    const { clientId, clientPassword } = config;
                    const expectedXml =
                        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tel="telecochile">' +
                        '<soapenv:Header/>' +
                        '<soapenv:Body>' +
                        '<tel:submitMsg>' +
                        `<tel:clientid>${clientId}</tel:clientid>` +
                        `<tel:clientpassword>${clientPassword}</tel:clientpassword>` +
                        `<tel:ani>${ani}</tel:ani>` +
                        `<tel:dnis>${mobileNumber}</tel:dnis>` +
                        `<tel:message>${message}</tel:message>` +
                        '</tel:submitMsg>' +
                        '</soapenv:Body>' +
                        '</soapenv:Envelope>';
                    const xml = smsService.xmlFormat(clientId, clientPassword, ani, mobileNumber, message);
                    expect(xml).toBe(expectedXml);
                });
            });
        });
        describe('sendSms method', () => {
            describe('sendSms method - Success', () => {
                test('should send sms', async () => {
                    const expectedResponse: ISmsResponse = {
                        body: expectedBody,
                        statusCode: 200,
                    };
                    const mockedAxiosResponse: AxiosResponse = {
                        data: expectedBody,
                        status: 200,
                        statusText: 'Success',
                        headers: {},
                        config: {},
                    };
                    const mockedAxios = axios as jest.Mocked<typeof axios>;
                    mockedAxios.post.mockResolvedValue(mockedAxiosResponse);
                    const response = await smsService.sendSms(dataToSend, config);
                    expect(response).toStrictEqual(expectedResponse);
                });
            });
            describe('sendSms method - Errors', () => {
                test('should return response error', async () => {
                    const dataToSend: ISmsDataToSend = {
                        ani,
                        mobileNumber,
                        message,
                    };
                    const mockedAxiosError: AxiosError = {
                        isAxiosError: true,
                        response: {
                            statusText: 'error',
                            headers: {},
                            config: {},
                            status: 400,
                            data: expectedError,
                        },
                        config: {},
                        toJSON: () => ({}),
                        name: 'error',
                        message: 'error',
                    };
                    const expectedResponse: ISmsResponse = {
                        body: expectedError,
                        statusCode: 400,
                    };
                    const mockedAxios = axios as jest.Mocked<typeof axios>;
                    mockedAxios.post.mockRejectedValue(mockedAxiosError);
                    const response = await smsService.sendSms(dataToSend, config);
                    expect(response).toStrictEqual(expectedResponse);
                });
                test('should return default error if no returned response', async () => {
                    const expectedBody = 'Ocurrió un error inesperado';
                    const mockedAxiosError: AxiosError = {
                        isAxiosError: true,
                        config: {},
                        toJSON: () => ({}),
                        name: 'error',
                        message: 'error',
                    };
                    const expectedResponse: ISmsResponse = {
                        body: expectedBody,
                        statusCode: 400,
                    };
                    const mockedAxios = axios as jest.Mocked<typeof axios>;
                    mockedAxios.post.mockRejectedValue(mockedAxiosError);
                    const response = await smsService.sendSms(dataToSend, config);
                    expect(response).toStrictEqual(expectedResponse);
                });
            });
        });
    });
});
