import { ErrorMessageHandler } from '@core/providers/ErrorMessageHandler/ErrorMessageHandler';
import { IdDrugsRequest } from '@domains/drugs/dto/IdDrugsRequest.dto';
import { JSONSchemaType } from 'ajv';

export const IdSchemaRequest: JSONSchemaType<IdDrugsRequest> = {
    type: 'object',
    properties: {
        id: { type: 'string', isNotEmpty: true }
    },
    required: ['id'],
    errorMessage: {
        properties: {
            id: ErrorMessageHandler.setPropertyMessageError('id'),
        },
        _: ErrorMessageHandler.defaultMessageError(),
    },
    additionalProperties: false,
};
