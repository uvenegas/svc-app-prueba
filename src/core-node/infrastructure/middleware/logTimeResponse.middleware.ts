import { NextFunction, Request, Response } from 'express';
import { Logger } from '../logger/Logger';

const getDurationInMilliseconds = (start: [number, number]) => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const logTimeResponse = (req: Request, res: Response, next: NextFunction) => {
    if (!req.originalUrl.includes('health')) {
        Logger.info(`${req.method} ${req.originalUrl} [STARTED]`);
        const start = process.hrtime();

        res.on('finish', () => {
            const durationInMilliseconds = getDurationInMilliseconds(start);
            Logger.info(`${req.method} ${req.originalUrl} [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`);
        });

        res.on('close', () => {
            const durationInMilliseconds = getDurationInMilliseconds(start);
            Logger.info(`${req.method} ${req.originalUrl} [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`);
        });
    }

    next();
};

export default logTimeResponse;
