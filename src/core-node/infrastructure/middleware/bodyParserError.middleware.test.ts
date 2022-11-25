/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction } from 'express';
import { Logger } from '../logger/Logger';
import bodyParserError from './bodyParserError.middleware';

const req: any = {
    header: {},
    body: {},
    url: './bodyParserError.middleware.test',
};

const res: any = {
    status: jest.fn().mockImplementation(() => {
        return { json: jest.fn() };
    }),
};
const mockNext: NextFunction = jest.fn();
describe('bodyParserError TEST', () => {
    it('bodyParserError - sin errores', () => {
        const error: SyntaxError = { name: 'test', message: 'test' };
        bodyParserError(error, req, res, mockNext);
    });

    it('bodyParserError - error por catch', () => {
        const spy = jest.spyOn(Logger, 'warn');
        try {
            throw new SyntaxError();
        } catch (error) {
            const e = error as SyntaxError;
            bodyParserError(e, req, res, mockNext);
        }

        expect(spy).toBeCalledWith('Body Parser Error:', './bodyParserError.middleware.test');
    });
});
