import { Logger } from '../logger/Logger';
import { ThrowError } from '../providers/ErrorHandling/ThrowError';
import { formatError } from '../providers/ErrorHandling/errorHandler';
import { NextFunction, Request, Response } from 'express';

const bodyParserError = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError) {
        Logger.warn('Body Parser Error:', req.url);
        /**
         * Logger not trace error at this level instance use console.log
         */
        const handledError = formatError(ThrowError.badRequest('Bad Request - Body bad format'));
        return res.status(handledError.statusCode).json(handledError);
    }
    next();
};

export default bodyParserError;
