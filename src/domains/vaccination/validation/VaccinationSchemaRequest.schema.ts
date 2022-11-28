import { ErrorMessageHandler } from '@core/providers/ErrorMessageHandler/ErrorMessageHandler';
import { VaccinationRequest } from '@domains/vaccination/dto/VaccinationRequest.dto';
import { JSONSchemaType } from 'ajv';

export const VaccinationSchemaRequest: JSONSchemaType<VaccinationRequest> = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        name: { type: 'string', isNotEmpty: true },
        drug_id: { type: 'number' },
        dose: { type: 'number' },
        date: { type: 'string', isNotEmpty: true },
    },
    required: ['id', 'name', 'drug_id', 'dose', 'date'],
    errorMessage: {
        properties: {
            id: ErrorMessageHandler.setPropertyMessageError('id'),
            name: ErrorMessageHandler.setPropertyMessageError('name'),
            drug_id: ErrorMessageHandler.setPropertyMessageError('drug_id'),
            dose: ErrorMessageHandler.setPropertyMessageError('dose'),
            date: ErrorMessageHandler.setPropertyMessageError('date'),
        },
        _: ErrorMessageHandler.defaultMessageError(),
    },
    additionalProperties: false,
};
