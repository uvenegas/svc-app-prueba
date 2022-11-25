import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ISmsDataToSend } from './interfaces/ISmsDataToSend';
import { IOptions } from './interfaces/IOptions';
import { ISmsResponse } from './interfaces/IResponse';
/**
 * Format data to send via SM in a valid xml
 * @param {string} clientId id used by TELECO to identificate the commerce
 * @param {string} clientPassword password used by TELECO to identificate the commerce
 * @param {string} ani automatic number identification
 * @param {string} mobileNumber mobile number that will receive the message
 * @param {string} message message to send
 * @return {string} xml format to send a sms request
 */
export const xmlFormat = (clientId: string, clientPassword: string, ani: string, mobileNumber: string, message: string): string => {
    const xml =
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
    return xml;
};

/**
 * Sends a SMS to a given phone
 * @param {ISMSDataToSend} dataToSend data to send via sms (ani, mobileNumber and message)
 * @param {IOptions} config params to configurate the sms call. MUST use clientId and clientPassword
 * @return {Promise<ISmsResponse>} success or error response from sms request
 */
export const sendSms = async (dataToSend: ISmsDataToSend, config: IOptions): Promise<ISmsResponse> => {
    const smsServiceUrl = 'http://smpp2.telecochile.cl:4046/?wsdl';
    const { timeout, clientId, clientPassword } = config;
    const smsServiceHeaders = {
        'Content-Type': 'text/xml;charset=UTF-8',
    };
    const { ani, mobileNumber, message } = dataToSend;
    const smsServiceXmlFormat = xmlFormat(clientId, clientPassword, ani, mobileNumber, message);
    let response: ISmsResponse;
    try {
        const axiosConfig: AxiosRequestConfig = {
            headers: smsServiceHeaders,
            timeout,
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
        };
        const axiosResponse = await axios.post(smsServiceUrl, smsServiceXmlFormat, axiosConfig);
        response = {
            body: axiosResponse.data,
            statusCode: axiosResponse.status,
        };
    } catch (err) {
        const error = err as AxiosError;
        if (error.response) {
            const { data, status } = error.response;
            response = {
                body: data,
                statusCode: status,
            };
        } else {
            response = {
                body: 'Ocurrió un error inesperado',
                statusCode: 400,
            };
        }
    }
    return response;
};
