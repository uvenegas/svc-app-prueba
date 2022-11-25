import { EHttpStatus } from '../../../enums/EHttpStatus';
export interface IApplicationError {
    type: string;
    code: string;
    statusCode: EHttpStatus;
    message: string;
    name?: string;
    errors?: Array<string> | string | Record<string, unknown> | Array<Record<string, unknown>>;
    meta?: { [k: string]: unknown };
}
