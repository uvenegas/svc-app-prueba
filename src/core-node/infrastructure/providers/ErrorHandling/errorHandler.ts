/* eslint-disable max-len */
import { Logger } from '../../logger/Logger';
import { IResponse } from '../../interfaces/IResponse';
import { awsHandler } from '../awsHandler/awsHandler';
import { ThrowError } from './ThrowError';
import { EHttpStatus } from '../../enums/EHttpStatus';
import { createError } from './errorFactory/errorFactory';
import { ApplicationError } from './ApplicationError';
import { NextFunction, Response } from 'express';
import { EErrorMessages } from '../../enums/EErrorMessage';

/**
 * System Error handler
 * @param {ApplicationError | Error | IResponse<unknown>} err
 * @return { IResponse<unknown> }
 */
export const errorHandler = (err: unknown): IResponse<unknown> => {
    const errorToHandle = formatError(err);
    return errorToHandle;
};

/**
 * Format error to report
 * @param {unknown} errorToHandle
 * @return {IResponse<unknown>}
 */
export const formatError = (errorToHandle: unknown): IResponse<unknown> => {
    const formatedError: ApplicationError = checkErrorType(errorToHandle);
    const res: IResponse<unknown> = {
        statusCode: formatedError.statusCode,
        message: formatedError.message,
        code: formatedError.code,
    };
    if (formatedError.errors) res.errors = formatedError.errors;
    return res;
};

/**
 * Format error to report
 * @param {unknown} errorToHandle
 * @return {IResponse<unknown>}
 */
export const formatErrorDevice = (errorToHandle: unknown): IResponse<unknown> => {
    const formatedError: ApplicationError = checkErrorType(errorToHandle);
    const res: IResponse<unknown> = {
        statusCode: EHttpStatus.NotContent,
        message: EErrorMessages.USER_ERROR,
        code: EErrorMessages.NO_CONTENT,
    };
    if (formatedError.errors) res.errors = formatedError.errors;
    return res;
};

/**
 * Format error to report
 * @param {unknown} errorToHandle
 * @return {IResponse<unknown>}
 */
export const formatErrorSend = (errorToHandle: unknown): IResponse<unknown> => {
    const formatedError: ApplicationError = checkErrorType(errorToHandle);
    const res: IResponse<unknown> = {
        statusCode: EHttpStatus.NotFound,
        message: EErrorMessages.SEND_ERROR,
        code: EErrorMessages.NOT_FOUND,
    };
    if (formatedError.errors) res.errors = formatedError.errors;
    return res;
};

/**
 * Format error to report
 * @param {unknown} errorToHandle
 * @return {IResponse<unknown>}
 */
export const formatErrorSave = (errorToHandle: unknown): IResponse<unknown> => {
    const formatedError: ApplicationError = checkErrorType(errorToHandle);
    const res: IResponse<unknown> = {
        statusCode: EHttpStatus.NotFound,
        message: EErrorMessages.NOT_CREATE,
        code: EErrorMessages.NOT_FOUND,
    };
    if (formatedError.errors) res.errors = formatedError.errors;
    return res;
};

/**
 * Ckeck error type if dont exist return unknownError
 * @param {unknown} errorToHandle
 * @return {ApplicationError}
 */
export const checkErrorType = (errorToHandle: unknown): ApplicationError => {
    switch (true) {
        case errorToHandle instanceof ApplicationError:
            return errorToHandle as ApplicationError;
        case errorToHandle instanceof Error:
            return createError(errorToHandle as Error);
        default:
            return ThrowError.unknownError();
    }
};

/**
 * Trace Error at console
 * @param {unknown} err
 * @return {void}
 */
export const errorLog = (err: unknown): void => {
    // `Error.stack`'s `enumerable` property descriptor is `false`
    // Thus, `JSON.stringify(...)` doesn't enumerate over it.
    const stackTrace: string = JSON.stringify(err, ['stack'], 4);
    const parsedError: Record<string, unknown> = JSON.parse(JSON.stringify(err));
    const parsedStackTrace: Record<string, unknown> = JSON.parse(JSON.stringify(stackTrace));
    const errorToLog = {
        err: parsedError,
        stack: parsedStackTrace,
    };
    Logger.error(`@@@@@ - file: errorHandler.ts - line 55 - errorLog - errorLog ${JSON.stringify(errorToLog)}`);
};

/**
 * Format error to use
 * @param {EHttpStatus} statusCode
 * @param {string} message
 * @param {T} data
 * @param {boolean} proxyResponse
 * @param {number} total
 * @return {IResponse<T> | T}
 */
export const formatResponse = <T>(statusCode: EHttpStatus, message: string, data: T, proxyResponse: boolean = false, total?: number): IResponse<T> | T => {
    let response: IResponse<T> | T;
    if (proxyResponse) {
        response = data as unknown as IResponse<T>;
    } else {
        response = {
            statusCode,
            message,
            payload: data as T,
        };
        if (total) response.count = total;
    }
    return response;
};

/**
 * Report error response
 * @param {Response} res
 * @param {IResponse<T>} payload
 * @param {NextFunction} next
 * @return {void}
 */
export const sendResponse = <T>(res: Response, payload: IResponse<T>, next: NextFunction) => {
    const { statusCode } = payload;
    res.status(statusCode).json(payload);
    next();
};

/**
 * Handler response for lambda context
 * @param {unknown} context
 * @param {IResponse<T> | IResponse<unknown>} payload
 * @param {unknown} callback
 * @return {unknown}
 */
export const sendResponseBff = <T>(context: unknown, payload: IResponse<T> | IResponse<unknown>, callback: unknown) => {
    const { statusCode } = payload;
    return awsHandler(context, statusCode, payload, callback);
};
