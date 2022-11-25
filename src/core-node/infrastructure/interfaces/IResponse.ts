import { EHttpStatus } from '../enums/EHttpStatus';
export interface IResponse<T> {
    statusCode: EHttpStatus;
    code?: string;
    message: string;
    payload?: T;
    count?: number;
    errors?: Array<string> | string | Record<string, unknown> | Array<Record<string, unknown>>;
}
