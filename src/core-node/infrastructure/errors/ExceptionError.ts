/* eslint-disable require-jsdoc */
import { ExtendableError } from './ExtendableError';

export class ExceptionError extends ExtendableError {
    constructor(public resource: string, public code: string, public message: string) {
        super(message);
        /**
         * setPrototypeOf is needed here because extending from Error, Array and Map causes some issues when using es5 to transpile.
         * For more information:
         *https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
         */
        Object.setPrototypeOf(this, ExceptionError.prototype);
    }
}
