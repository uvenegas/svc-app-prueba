import { ApplicationError } from './ApplicationError';
import { IApplicationError } from './interfaces/IApplicationError';

export const HTTP_ERRORS: Record<string, IApplicationError> = {
    /**
     * Predefined 4xx http errors
     */
    BAD_REQUEST: {
        type: ApplicationError.type.NETWORK,
        code: 'BAD_REQUEST',
        message: 'Petición inválida',
        statusCode: 400,
    },
    UNAUTHORIZED: {
        type: ApplicationError.type.NETWORK,
        code: 'UNAUTHORIZED',
        message: 'No autorizado',
        statusCode: 401,
    },
    FORBIDDEN: {
        type: ApplicationError.type.NETWORK,
        code: 'FORBIDDEN',
        message: 'Prohibido',
        statusCode: 403,
    },
    RESOURCE_NOT_FOUND: {
        type: ApplicationError.type.NETWORK,
        code: 'RESOURCE_NOT_FOUND',
        message: 'Recurso no encontrado',
        statusCode: 404,
    },
    NOT_ACCEPTABLE: {
        type: ApplicationError.type.NETWORK,
        code: 'NOT_ACCEPTABLE',
        message: 'El servidor no puede entregar una respuesta',
        statusCode: 406,
    },
    REQUEST_TIMEOUT: {
        type: ApplicationError.type.NETWORK,
        code: 'REQUEST_TIMEOUT',
        message: 'Tiempo de espera de solicitud de servicio excedido',
        statusCode: 408,
    },
    CONFLICT: {
        type: ApplicationError.type.NETWORK,
        code: 'CONFLICT',
        message: 'La petición no puede ser completada',
        statusCode: 409,
    },
    PRECONDITION_REQUIRED: {
        type: ApplicationError.type.NETWORK,
        code: 'PRECONDITION_REQUIRED',
        message: 'La petición debe contener un header de precondición',
        statusCode: 409,
    },
    // Predefined 5xx http errors
    UNKNOWN_ERROR: {
        type: ApplicationError.type.APP_NAME,
        code: 'UNKNOWN_ERROR',
        message: 'Error desconocido',
        statusCode: 500,
    },
    INTERNAL_SERVER_ERROR: {
        type: ApplicationError.type.NETWORK,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Algo salió mal, por favor intente luego',
        statusCode: 500,
    },
    BAD_GATEWAY: {
        type: ApplicationError.type.NETWORK,
        code: 'BAD_GATEWAY',
        message: 'Puerta de enlace incorrecta',
        statusCode: 502,
    },
    SERVICE_UNAVAILABLE: {
        type: ApplicationError.type.NETWORK,
        code: 'SERVICE_UNAVAILABLE',
        message: 'Servicio no disponible',
        statusCode: 503,
    },
    GATEWAY_TIMEOUT: {
        type: ApplicationError.type.NETWORK,
        code: 'GATEWAY_TIMEOUT',
        message: 'El servidor no pudo completar la solicitud',
        statusCode: 504,
    },
    NO_CONTENT: {
        type: ApplicationError.type.NETWORK,
        code: 'NO_CONTENT',
        message: 'No se encuentras resultados',
        statusCode: 204,
    },
};
