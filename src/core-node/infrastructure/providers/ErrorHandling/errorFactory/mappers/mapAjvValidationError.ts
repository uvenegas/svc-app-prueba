import { ValidationError } from 'ajv/dist/compile/error_classes';
import { ApplicationError } from '../../ApplicationError';

/**
 * Mapping a Ajv Error
 * @param {ValidationError} error
 * @return {ApplicationError}
 */
export const mapAjvValidationError = (error: ValidationError): ApplicationError => {
    const ajvError: ApplicationError = {
        name: 'VALIDATION_ERROR',
        type: ApplicationError.type.APP_NAME,
        code: 'VALIDATION_ERROR',
        message: 'Ocurrió un error con las propiedades',
        statusCode: 400,
        errors: error.errors,
    };
    return ajvError;
};
