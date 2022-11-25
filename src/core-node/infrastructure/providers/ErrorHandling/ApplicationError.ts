import { IApplicationError } from './interfaces/IApplicationError';

/**
 * ApplicationError Class
 */
export class ApplicationError extends Error {
    static type = {
        APP_NAME: 'APP_NAME',
        INTERNAL: 'INTERNAL',
        NETWORK: 'NETWORK',
        UNKNOWN: 'UNKNOWN',
        CUSTOM: 'CUSTOM',
    };
    name: string;
    type: string;
    code: string;
    errors?: Array<string> | string | Record<string, unknown> | Array<Record<string, unknown>>;
    message: string;
    meta?: { [k: string]: unknown };
    statusCode: number;

    /**
     *
     * @param {IApplicationError} options data to create given error
     */
    constructor(options: IApplicationError) {
        super();
        if (!ApplicationError.type.hasOwnProperty(options.type)) {
            throw new Error(`ApplicationError: ${options.type} is not a valid type.`);
        }

        if (!options.message) {
            throw new Error('ApplicationError: error message required.');
        }

        if (!options.code) {
            throw new Error('ApplicationError: error code required.');
        }

        this.name = options.name ? options.name : 'APP_ERROR';
        this.type = options.type;
        this.code = options.code;
        this.message = options.message;
        this.errors = options.errors;
        this.meta = options.meta;
        this.statusCode = options.statusCode;
        /**
         * setPrototypeOf is needed here because extending from Error, Array and Map causes some issues when using es5 to transpile.
         * For more information:
         *https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
         */
        Object.setPrototypeOf(this, ApplicationError.prototype);
    }
}
