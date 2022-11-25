/* eslint-disable @typescript-eslint/no-explicit-any */
import { EHttpStatus } from '../../enums/EHttpStatus';

export const awsHandler = (context: any, statusCode: EHttpStatus, body: any, next: any): any => {
    return next(context, {
        statusCode,
        body: JSON.stringify(body),
    });
};
