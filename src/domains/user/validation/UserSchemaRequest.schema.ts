import { ErrorMessageHandler } from '@core/providers/ErrorMessageHandler/ErrorMessageHandler';
import { UserRequest } from '@domains/user/dto/UserRequest.dto';
import { JSONSchemaType } from 'ajv';

export const UserSchemaRequest: JSONSchemaType<UserRequest> = {
    type: 'object',
    properties: {
        id: { type: 'number', isNotEmpty: true },
        name: { type: 'string', isNotEmpty: true },
        email: { type: 'string', isNotEmpty: true },
        password: { type: 'string', isNotEmpty: true },
    },
    required: ['id', 'name', 'email', 'password'],
    errorMessage: {
        properties: {
            id: ErrorMessageHandler.setPropertyMessageError('id'),
            name: ErrorMessageHandler.setPropertyMessageError('name'),
            email: ErrorMessageHandler.setPropertyMessageError('email'),
            password: ErrorMessageHandler.setPropertyMessageError('password'),
        },
        _: ErrorMessageHandler.defaultMessageError(),
    },
    additionalProperties: false,
};
