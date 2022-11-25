import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import { Request } from 'express';
import { rutFormat } from './definitions/formats/rut';
import { tokenTypeFormat } from './definitions/formats/tokenType';
import { phoneFormat } from './definitions/formats/phone';
import Ajv, { JSONSchemaType } from 'ajv';
import { ValidationError } from 'ajv/dist/compile/error_classes';
import { isNotEmptyKeyword } from './definitions/keywords/isNotEmpty';
import { ESchemaMiddleware } from '../../enums/ESchemaMiddleware';
import { ErrorObject, ValidateFunction, KeywordDefinition, FormatDefinition } from 'ajv/dist/types';
import { SomeJSONSchema } from 'ajv/dist/types/json-schema';
import { otpTemplateFormat } from './definitions/formats/otpCodetemplate';

type FormatAndName = { formatName: string; format: FormatDefinition<string> };

/**
 * Middleware that validate the schema passed, also receive
 * @param {Request} req request to validate
 * @param {JSONSchemaType<T> |SomeJSONSchema} schema to validate, this schema contains a interface of DTO
 * @param {ESchemaMiddleware} value part of the request that you want to validate
 * @return {Promise<string | ValidationError>}
 */
export const validationSchemaMiddleware = async <T>(
    req: Request,
    schema: JSONSchemaType<T> | SomeJSONSchema,
    value: ESchemaMiddleware,
): Promise<string | ValidationError> => {
    const validator = createValidator(schema);
    const parsedValue = typeof req[value] === 'string' ? JSON.parse(req[value]) : req[value];
    return await validate(validator, parsedValue);
};

/**
 * Create a validator for ajv implementation
 * @param {JSONSchemaType<T>} schema
 * @return {ValidateFunction<T>}
 */
export const createValidator = <T>(schema: JSONSchemaType<T> | SomeJSONSchema): ValidateFunction<T> => {
    const formats: FormatAndName[] = [
        { formatName: 'rut', format: rutFormat },
        { formatName: 'tokenType', format: tokenTypeFormat },
        { formatName: 'phone', format: phoneFormat },
        { formatName: 'otpTemplate', format: otpTemplateFormat },
    ];
    const ajv = new Ajv({ allErrors: true });
    addValidationSchemaFormats(ajv, formats);
    addValidationSchemaErrors(ajv);
    addValidationSchemaKeywords(ajv, isNotEmptyKeyword);
    const validate = ajv.compile<T>(schema);
    return validate;
};

/**
 * Valitate schema exec, build error to report
 * @param {ValidateFunction} validateFunction
 * @param {Record<string, unknown>} value
 * @return {Promise<string | ValidationError>}
 */
export const validate = (validateFunction: ValidateFunction, value: Record<string, unknown>): Promise<string | ValidationError> => {
    return new Promise((resolve, reject) => {
        const isValid = validateFunction(value);
        if (!isValid) {
            const validations: Partial<ErrorObject>[] = [];
            let index = 0;
            if (validateFunction.errors) {
                for (index; index < validateFunction.errors.length; index++) {
                    const error: ErrorObject = validateFunction.errors[index];
                    validations.push({
                        dataPath: error.dataPath,
                        message: error.message,
                    });
                }
            }
            reject(new ValidationError(validations));
        } else {
            resolve('IS_VALID_SCHEMA');
        }
    });
};

/**
 * Add definition format to ajv instance
 * @param {Ajv} ajv
 * @param {FormatAndName[]} formats
 * @return {Ajv}
 */
export const addValidationSchemaFormats = (ajv: Ajv, formats: FormatAndName[]): Ajv => {
    formats.forEach(({ formatName, format }: FormatAndName) => {
        ajv.addFormat(formatName, format);
    });
    addFormats(ajv);
    return ajv;
};

/**
 * Add errors to Ajv Instance
 * @param {Ajv} ajv
 * @return {Ajv}
 */
export const addValidationSchemaErrors = (ajv: Ajv): Ajv => {
    addErrors(ajv);
    return ajv;
};

/**
 * Add validation keyword to ajv instance
 * @param {Ajv} ajv
 * @param {KeywordDefinition} keyword
 * @return {Ajv}
 */
export const addValidationSchemaKeywords = (ajv: Ajv, keyword: KeywordDefinition): Ajv => {
    ajv.addKeyword(keyword);
    return ajv;
};
