import { AxiosError } from 'axios';
import { ThrowError } from '../ThrowError';
import { mapAxiosError } from './mappers/mapAxiosError';
import { ValidationError } from 'ajv/dist/compile/error_classes';
import { ApplicationError } from '../ApplicationError';
import { mapAjvValidationError } from './mappers/mapAjvValidationError';

type TErrorType = ValidationError | AxiosError | Error;

/**
 * Create a api error
 * @param {TErrorType} error
 * @return {ApplicationError}
 */
export const createError = (error: TErrorType): ApplicationError => {
    if (error instanceof ValidationError) {
        const ajvError = mapAjvValidationError(error);
        return ThrowError.customError(ajvError);
    } else if ((error as AxiosError).isAxiosError) {
        const axiosError = mapAxiosError(error as AxiosError);
        return ThrowError.customError(axiosError);
    } else {
        return ThrowError.unknownError(error.message || 'Ocurrio un error insesperado');
    }
};
