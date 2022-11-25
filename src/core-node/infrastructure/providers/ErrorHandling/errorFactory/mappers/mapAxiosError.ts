import { AxiosError, AxiosResponse } from 'axios';
import { ApplicationError } from '../../ApplicationError';

/**
 * Mapping a axios error
 * @param {AxiosError} error
 * @return {ApplicationError}
 */
export const mapAxiosError = (error: AxiosError): ApplicationError => {
    let parsedError: ApplicationError;
    const { response, request, code } = error;
    if (response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        parsedError = mapAxiosResponseError(response);
    } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        parsedError = mapAxiosRequestError(request, code);
    } else {
        /**
         * Something happened in setting up the request and triggered an Error
         */
        parsedError = {
            name: 'AXIOS_ERROR',
            type: ApplicationError.type.APP_NAME,
            code: code ? code : 'UNKNOWN_ERROR',
            message: error.message,
            statusCode: 500,
        };
    }
    return parsedError;
};

/**
 * Map a Axios based at response
 * @param {AxiosResponse} response
 * @return {ApplicationError}
 */
const mapAxiosResponseError = (response: AxiosResponse): ApplicationError => {
    const { code, message, statusCode } = response.data;
    const { status } = response;
    const parsedError: ApplicationError = {
        name: 'AXIOS_ERROR',
        type: ApplicationError.type.APP_NAME,
        code: code ? code : 'AXIOS_RESPONSE_ERROR',
        message: message ? message : 'Ocurrió un error inesperado',
        statusCode: statusCode ? statusCode : status,
    };
    if (!code && !message && !statusCode) parsedError.errors = response.data;
    return parsedError;
};

/**
 * Map a Axios based at request type
 * @param {Pick<AxiosError, 'request'>} _request
 * @param {string} code
 * @return {ApplicationError}
 */
const mapAxiosRequestError = (_request: Pick<AxiosError, 'request'>, code?: string): ApplicationError => {
    const parsedError: ApplicationError = {
        name: 'AXIOS_ERROR',
        type: ApplicationError.type.APP_NAME,
        code: code ? code : 'AXIOS_REQUEST_ERROR',
        message: code === 'ECONNABORTED' ? 'Tiempo de espera de solicitud de servicio excedido' : 'Ocurrió un error inesperado',
        statusCode: code === 'ECONNABORTED' ? 408 : 400,
    };
    return parsedError;
};
