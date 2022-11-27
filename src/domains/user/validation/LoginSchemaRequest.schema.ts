import { ErrorMessageHandler } from '@core/providers/ErrorMessageHandler/ErrorMessageHandler';
import { LoginRequest } from '@domains/user/dto/LoginRequest.dto';
import { JSONSchemaType } from 'ajv';

export const LoginSchemaRequest: JSONSchemaType<LoginRequest> = {
    type: 'object',
    properties: {
        email: { type: 'string', isNotEmpty: true },
        password: { type: 'string', isNotEmpty: true },
    },
    required: ['email', 'password'],
    errorMessage: {
        properties: {
            email: ErrorMessageHandler.setPropertyMessageError('email'),
            password: ErrorMessageHandler.setPropertyMessageError('password'),
        },
        _: ErrorMessageHandler.defaultMessageError(),
    },
    additionalProperties: false,
};
