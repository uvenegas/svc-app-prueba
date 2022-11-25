import { IApplicationError } from '../interfaces/IApplicationError';
import { ApplicationError } from '../ApplicationError';

export const CUSTOM_ERRORS: Record<string, IApplicationError> = {
    EMAIL_ALREADY_TAKEN: {
        type: ApplicationError.type.APP_NAME,
        code: 'EMAIL_ALREADY_TAKEN',
        message: 'The given email address is already taken :(',
        statusCode: 400,
    },
    AUTH_WEAK_PASSWORD: {
        type: ApplicationError.type.APP_NAME,
        code: 'AUTH_WEAK_PASSWORD',
        message: 'The given password is easy to guess, provide strong password',
        statusCode: 400,
    },
    K_ERROR_01: {
        type: ApplicationError.type.APP_NAME,
        code: 'W001',
        message: 'Cuerpo de la petición inválido',
        statusCode: 400,
        meta: {
            data1: 'metadato importante',
        },
    },
    K_ERROR_02: {
        type: ApplicationError.type.APP_NAME,
        code: 'W002',
        message: 'Ha ocurrido un error inesperado',
        statusCode: 400,
    },
    K_ERROR_03: {
        type: ApplicationError.type.APP_NAME,
        code: 'W003',
        message: 'Tarjeta no habilitada por el emisor',
        statusCode: 400,
    },
    K_ERROR_04: {
        type: ApplicationError.type.APP_NAME,
        code: 'W004',
        message: 'ID de suscripción no válida',
        statusCode: 400,
    },
    K_ERROR_05: {
        type: ApplicationError.type.APP_NAME,
        code: 'W005',
        message: 'Token expirado',
        statusCode: 400,
    },
    K_ERROR_06: {
        type: ApplicationError.type.APP_NAME,
        code: 'W006',
        message: 'Monto no es igual el esperado',
        statusCode: 400,
    },
    K_ERROR_07: {
        type: ApplicationError.type.APP_NAME,
        code: 'W007',
        message: 'Este recibo ya fue pagado',
        statusCode: 400,
    },
    K_ERROR_08: {
        type: ApplicationError.type.APP_NAME,
        code: 'W008',
        message: 'Token incorrecto o expirado',
        statusCode: 400,
    },
    K_ERROR_09: {
        type: ApplicationError.type.APP_NAME,
        code: 'W009',
        message: 'Recibo expirado',
        statusCode: 400,
    },
    K_ERROR_10: {
        type: ApplicationError.type.APP_NAME,
        code: 'W010',
        message: 'Ticket number inválido',
        statusCode: 400,
    },
    K_ERROR_11: {
        type: ApplicationError.type.APP_NAME,
        code: 'W011',
        message: 'Credenciales inválidas',
        statusCode: 400,
    },
    K_ERROR_12: {
        type: ApplicationError.type.APP_NAME,
        code: 'W012',
        message: 'ID de suscripción no válida',
        statusCode: 400,
    },
    K_ERROR_13: {
        type: ApplicationError.type.APP_NAME,
        code: 'W013',
        message: 'Transación tokenizada como diferido',
        statusCode: 400,
    },
    K_ERROR_14: {
        type: ApplicationError.type.APP_NAME,
        code: 'W014',
        message: 'Token inválido',
        statusCode: 400,
    },
    K_ERROR_20: {
        type: ApplicationError.type.APP_NAME,
        code: 'W020',
        message: 'Transacción rechazada',
        statusCode: 400,
    },
    K_ERROR_21: {
        type: ApplicationError.type.APP_NAME,
        code: 'W021',
        message: 'Transacción rechazada',
        statusCode: 400,
    },
    K_ERROR_29: {
        type: ApplicationError.type.APP_NAME,
        code: 'W029',
        message: 'Bin de tarjeta inválido',
        statusCode: 400,
    },
    K_ERROR_32: {
        type: ApplicationError.type.APP_NAME,
        code: 'W322',
        message: 'Transacción rechazada',
        statusCode: 400,
    },
};
