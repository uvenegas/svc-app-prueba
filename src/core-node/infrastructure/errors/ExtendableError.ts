/* eslint-disable require-jsdoc */
export class ExtendableError extends Error {
    constructor(message: string) {
        super(message);

        this.name = this.constructor.name;

        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = new Error(message).stack;
        }
        /**
         * setPrototypeOf is needed here because extending from Error, Array and Map causes some issues when using es5 to transpile.
         * For more information:
         *https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
         */
        Object.setPrototypeOf(this, ExtendableError.prototype);
    }
}
