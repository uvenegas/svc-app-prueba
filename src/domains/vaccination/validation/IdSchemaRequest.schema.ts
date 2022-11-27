import { ErrorMessageHandler } from '@core/providers/ErrorMessageHandler/ErrorMessageHandler';
import { IdVaccinationRequest } from '@domains/vaccination/dto/IdVaccinationRequest.dto';
import { JSONSchemaType } from 'ajv';

export const IdSchemaRequest: JSONSchemaType<IdVaccinationRequest> = {
    type: 'object',
    properties: {
        id: { type: 'number', isNotEmpty: true }
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
