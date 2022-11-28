import { ErrorMessageHandler } from '@core/providers/ErrorMessageHandler/ErrorMessageHandler';
import { DrugsRequest } from '@domains/drugs/dto/DrugsRequest.dto';
import { JSONSchemaType } from 'ajv';

export const DrugsSchemaRequest: JSONSchemaType<DrugsRequest> = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        name: { type: 'string', isNotEmpty: true },
        approved: { type: 'boolean' },
        min_dose: { type: 'number' },
        max_dose: { type: 'number' },
        avaliable_at: { type: 'string', isNotEmpty: true },
    },
    required: ['id', 'name', 'approved', 'min_dose', 'max_dose', 'avaliable_at'],
    errorMessage: {
        properties: {
            id: ErrorMessageHandler.setPropertyMessageError('id'),
            name: ErrorMessageHandler.setPropertyMessageError('name'),
            drug_id: ErrorMessageHandler.setPropertyMessageError('drug_id'),
            dose: ErrorMessageHandler.setPropertyMessageError('dose'),
            date: ErrorMessageHandler.setPropertyMessageError('date'),
            avaliable_at: ErrorMessageHandler.setPropertyMessageError('avaliable_at'),
        },
        _: ErrorMessageHandler.defaultMessageError(),
    },
    additionalProperties: false,
};
