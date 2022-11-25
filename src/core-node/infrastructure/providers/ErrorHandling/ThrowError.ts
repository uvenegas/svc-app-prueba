import { ApplicationError } from './ApplicationError';
import { HTTP_ERRORS } from './httpErrors';
import { IApplicationError } from './interfaces/IApplicationError';

/**
 * Class ThrowError
 */
export class ThrowError {
    /**
     * @param {string} message if a message is given, overrides default error message value
     * @return {ApplicationError}
     */
    public static badRequest(message?: string): ApplicationError {
        const error: IApplicationError = Object.assign(HTTP_ERRORS.BAD_REQUEST, message ? { message } : {});
        return new ApplicationError(error);
    }

    /**
     * @param {string} message if a message is given, overrides default error message value
     * @return {ApplicationError}
     */
    public static unauthorized(message?: string): ApplicationError {
        const error: IApplicationError = Object.assign(HTTP_ERRORS.UNAUTHORIZED, message ? { message } : {});
        return new ApplicationError(error);
    }

    /**
     * @param {string} message if a message is given, overrides default error message value
     * @return {ApplicationError}
     */
    public static forbidden(message?: IApplicationError | string): ApplicationError {
        const error: IApplicationError = Object.assign(HTTP_ERRORS.FORBIDDEN, message ? { message } : {});
        return new ApplicationError(error);
    }

    /**
     * @param {string} message if a message is given, overrides default error message value
     * @return {ApplicationError}
     */
    public static resourceNotFound(message?: IApplicationError | string): ApplicationError {
        const error: IApplicationError = Object.assign(HTTP_ERRORS.RESOURCE_NOT_FOUND, message ? { message } : {});
        return new ApplicationError(error);
    }

    /**
     * @param {string} message if a message is given, overrides default error message value
     * @return {ApplicationError}
     */
    public static unknownError(message?: IApplicationError | string): ApplicationError {
        const error: IApplicationError = Object.assign(HTTP_ERRORS.UNKNOWN_ERROR, message ? { message } : {});
        return new ApplicationError(error);
    }

    /**
     * @param {string} message if a message is given, overrides default error message value
     * @return {ApplicationError}
     */
    public static internalServerError(message?: IApplicationError | string): ApplicationError {
        const error: IApplicationError = Object.assign(HTTP_ERRORS.INTERNAL_SERVER_ERROR, message ? { message } : {});
        return new ApplicationError(error);
    }

    /**
     * @param {string} message if a message is given, overrides default error message value
     * @return {ApplicationError}
     */
    public static badGateway(message?: string): ApplicationError {
        const error: IApplicationError = Object.assign(HTTP_ERRORS.BAD_GATEWAY, message ? { message } : {});
        return new ApplicationError(error);
    }

    /**
     * @param {string} message if a message is given, overrides default error message value
     * @return {ApplicationError}
     */
    public static serviceUnavailable(message?: string): ApplicationError {
        const error: IApplicationError = Object.assign(HTTP_ERRORS.SERVICE_UNAVAILABLE, message ? { message } : {});
        return new ApplicationError(error);
    }

    /**
     * @param {string} message if a message is given, overrides default error message value
     * @return {ApplicationError}
     */
    public static gatewayTimeout(message?: string): ApplicationError {
        const error: IApplicationError = Object.assign(HTTP_ERRORS.GATEWAY_TIMEOUT, message ? { message } : {});
        return new ApplicationError(error);
    }

    /**
     * @param {string} message if a message is given, overrides default error message value
     * @return {ApplicationError}
     */
    public static conflict(message?: string): ApplicationError {
        const error: IApplicationError = Object.assign(HTTP_ERRORS.CONFLICT, message ? { message } : {});
        return new ApplicationError(error);
    }

    /**
     * @param {string} message if a message is given, overrides default error message value
     * @return {ApplicationError}
     */
    public static notAcceptable(message?: string): ApplicationError {
        const error: IApplicationError = Object.assign(HTTP_ERRORS.NOT_ACCEPTABLE, message ? { message } : {});
        return new ApplicationError(error);
    }

    /**
     * @param {string} message if a message is given, overrides default error message value
     * @return {ApplicationError}
     */
    public static requestTimeout(message?: string): ApplicationError {
        const error: IApplicationError = Object.assign(HTTP_ERRORS.REQUEST_TIMEOUT, message ? { message } : {});
        return new ApplicationError(error);
    }

    /**
     * @param {string} message if a message is given, overrides default error message value
     * @return {ApplicationError}
     */
    public static noContent(message?: string): ApplicationError {
        const error: IApplicationError = Object.assign(HTTP_ERRORS.NO_CONTENT, message ? { message } : {});
        return new ApplicationError(error);
    }

    /**
     * @param {IApplicationError} error custom error to be thrown
     * @return {ApplicationError}
     */
    public static customError(error: IApplicationError): ApplicationError {
        return new ApplicationError(error);
    }
}
