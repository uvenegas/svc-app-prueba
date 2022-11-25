/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable require-jsdoc */
import { JSONSchemaType } from 'ajv';
import { ValidationError } from 'ajv/dist/compile/error_classes';
import Ajv from 'ajv/dist/core';
import { EErrorMessages } from '../../enums/EErrorMessage';
import { ESchemaMiddleware } from '../../enums/ESchemaMiddleware';
import { ErrorMessageHandler } from '../../providers/ErrorMessageHandler/ErrorMessageHandler';
import { rutFormat } from './definitions/formats/rut';
import { isNotEmptyKeyword } from './definitions/keywords/isNotEmpty';
import * as validationMiddleware from './validationSchema.middleware';

class UserLogin {
    public email: string;
    public password: string;
    public name: string;
}

const UserLoginSchema: JSONSchemaType<UserLogin> = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email', minLength: 1, isNotEmpty: true },
        password: { type: 'string', minLength: 1, isNotEmpty: true },
        name: { type: 'string', minLength: 1, isNotEmpty: true },
    },
    required: ['email', 'password'],
    errorMessage: {
        properties: {
            email: ErrorMessageHandler.userOrPasswordMessageError(),
            password: ErrorMessageHandler.userOrPasswordMessageError(),
            name: ErrorMessageHandler.setPropertyMessageError('name'),
        },
        _: ErrorMessageHandler.defaultMessageError(),
    },
    additionalProperties: false,
};

describe('await validationMiddleware.validationSchemaMiddleware Test', () => {
    describe('validationMiddleware - Success', () => {
        test('should validate schema with body string type', async () => {
            const req: any = {
                header: {},
                body: JSON.stringify({ email: 'Jose@gmail.com', password: 'Morillo' }),
                url: './validationSchema.middleware.test',
            };
            expect(async () => {
                await validationMiddleware.validationSchemaMiddleware(req, UserLoginSchema, ESchemaMiddleware.body);
            }).not.toThrow(ValidationError);
        });
        test('should validate schema with body object type', async () => {
            const req: any = {
                header: {},
                body: { email: 'Jose@gmail.com', password: 'Morillo' },
                url: './validationSchema.middleware.test',
            };
            expect(async () => {
                await validationMiddleware.validationSchemaMiddleware(req, UserLoginSchema, ESchemaMiddleware.body);
            }).not.toThrow(ValidationError);
        });
        test('should add validation schema format to ajv object', async () => {
            const ajv = new Ajv({ allErrors: true });
            validationMiddleware.addValidationSchemaFormats(ajv, [{ formatName: 'rut', format: rutFormat }]);
            expect(ajv).toHaveProperty('formats.rut');
        });
        test('should add validation schema errors to ajv object', async () => {
            const ajv = new Ajv({ allErrors: true, strict: false });
            validationMiddleware.addValidationSchemaErrors(ajv);
            expect(ajv).toHaveProperty('RULES.all.errorMessage');
        });
        test('should add validation schema keywords to ajv object', async () => {
            const ajv = new Ajv({ allErrors: true });
            validationMiddleware.addValidationSchemaKeywords(ajv, isNotEmptyKeyword);
            expect(ajv).toHaveProperty('RULES.all.isNotEmpty');
        });
        test('should create schema validator', async () => {
            const validateFunction = validationMiddleware.createValidator(UserLoginSchema);
            const fullSchema: JSONSchemaType<UserLogin> = {
                ...UserLoginSchema,
                ...{ additionalProperties: false },
            };
            expect(validateFunction).toHaveProperty('schema');
            expect(validateFunction.schema).toStrictEqual(fullSchema);
        });
        test('should validate with a given validation function', async () => {
            const validator = validationMiddleware.createValidator(UserLoginSchema);
            const req: any = {
                email: 'fmoya@gmail.com',
                password: '123',
                name: 'jose',
            };
            const isValid = await validationMiddleware.validate(validator, req);
            expect(isValid).toBe('IS_VALID_SCHEMA');
        });
    });
    describe('validationMiddleware - Errors', () => {
        test('should throw a ValidationError error type', async () => {
            const req: any = {
                header: {},
                body: JSON.stringify({}),
                url: './validationSchema.middleware.test',
            };
            expect(async () => {
                await validationMiddleware.validationSchemaMiddleware(req, UserLoginSchema, ESchemaMiddleware.body);
            }).rejects.toThrow(ValidationError);
        });
        test('should throw default error inside ValidationError', async () => {
            const req: any = {
                header: {},
                body: JSON.stringify({}),
                url: './validationSchema.middleware.test',
            };
            const expectedError = [
                {
                    dataPath: '',
                    message: EErrorMessages.DEFAULT_SCHEMA_ERROR,
                },
            ];
            try {
                await validationMiddleware.validationSchemaMiddleware(req, UserLoginSchema, ESchemaMiddleware.body);
            } catch (error) {
                const { errors } = error as ValidationError;
                expect(errors).toStrictEqual(expectedError);
            }
        });
        test('should throw user and password error inside ValidationError with bad password format', async () => {
            const req: any = {
                header: {},
                body: JSON.stringify({
                    email: 'fmoya@gmail.com',
                    password: 123,
                    name: 'jose',
                }),
                url: 'fakeurl.com',
            };
            const expectedError = [
                {
                    dataPath: '/password',
                    message: EErrorMessages.USER_AND_PASSWORD_ERROR,
                },
            ];
            try {
                await validationMiddleware.validationSchemaMiddleware(req, UserLoginSchema, ESchemaMiddleware.body);
            } catch (error) {
                const { errors } = error as ValidationError;
                expect(errors).toStrictEqual(expectedError);
            }
        });
        test('should throw user and password error inside ValidationError with bad email format', async () => {
            const req: any = {
                header: {},
                body: JSON.stringify({
                    email: 'fmoya',
                    password: '123',
                }),
                url: './validationSchema.middleware.test',
            };
            const expectedError = [
                {
                    dataPath: '/email',
                    message: EErrorMessages.USER_AND_PASSWORD_ERROR,
                },
            ];
            try {
                await validationMiddleware.validationSchemaMiddleware(req, UserLoginSchema, ESchemaMiddleware.body);
            } catch (error) {
                const { errors } = error as ValidationError;
                expect(errors).toStrictEqual(expectedError);
            }
        });
        test('should throw user and password error inside ValidationError with password full of space chars', async () => {
            const req: any = {
                header: {},
                body: JSON.stringify({
                    email: 'fmoya@sbpay.cl',
                    password: '    ',
                }),
                url: './validationSchema.middleware.test',
            };
            const expectedError = [
                {
                    dataPath: '/password',
                    message: EErrorMessages.USER_AND_PASSWORD_ERROR,
                },
            ];
            try {
                await validationMiddleware.validationSchemaMiddleware(req, UserLoginSchema, ESchemaMiddleware.body);
            } catch (error) {
                const { errors } = error as ValidationError;
                expect(errors).toStrictEqual(expectedError);
            }
        });
        test('should throw property error inside ValidationError with property with bad format type', async () => {
            const req: any = {
                header: {},
                body: JSON.stringify({
                    email: 'fmoya@sbpay.cl',
                    password: 'password',
                    name: 213,
                }),
                url: './validationSchema.middleware.test',
            };
            const expectedError = [
                {
                    dataPath: '/name',
                    message: EErrorMessages.SET_PROPERTY_ERROR.replace(':param', 'name'),
                },
            ];
            try {
                await validationMiddleware.validationSchemaMiddleware(req, UserLoginSchema, ESchemaMiddleware.body);
            } catch (error) {
                const { errors } = error as ValidationError;
                expect(errors).toStrictEqual(expectedError);
            }
        });
    });
});
