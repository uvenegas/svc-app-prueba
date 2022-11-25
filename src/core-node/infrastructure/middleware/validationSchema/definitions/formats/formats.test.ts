/* eslint-disable require-jsdoc */
import Ajv, { JSONSchemaType } from 'ajv';
import { FormatValidator } from 'ajv/dist/types';
import { rutFormat } from './rut';
import { tokenTypeFormat } from './tokenType';
import { phoneFormat } from './phone';
import { otpTemplateFormat, otpCodeDescriptor } from './otpCodetemplate';
import { passwordFormat } from './password';
class TestClassTokenType {
    tokenType: string;
}
const TestClassSchemaTokenType: JSONSchemaType<TestClassTokenType> = {
    type: 'object',
    properties: {
        tokenType: { type: 'string', format: 'tokenType', minLength: 1 },
    },
    required: ['tokenType'],
};
class TestClassRut {
    rut: string;
}
const TestClassSchemaRut: JSONSchemaType<TestClassRut> = {
    type: 'object',
    properties: {
        rut: { type: 'string', format: 'rut', minLength: 1 },
    },
    required: ['rut'],
};
class TestClassPhone {
    phone: string;
}
const TestClassSchemaPhone: JSONSchemaType<TestClassPhone> = {
    type: 'object',
    properties: {
        phone: { type: 'string', format: 'phone' },
    },
    required: ['phone'],
};
class TestClassOtpTemplate {
    otpTemplate: string;
}
const TestClassSchemaOtpTemplate: JSONSchemaType<TestClassOtpTemplate> = {
    type: 'object',
    properties: {
        otpTemplate: { type: 'string', format: 'otpTemplate' },
    },
    required: ['otpTemplate'],
};
class TestClassPassword {
    password: string;
}
const TestClassSchemaPassword: JSONSchemaType<TestClassPassword> = {
    type: 'object',
    properties: {
        password: { type: 'string', format: 'password' },
    },
    required: ['password'],
};
class TestClassStringNoDate {
    dateString: string;
}
const TestClassSchemaStringNoDate: JSONSchemaType<TestClassStringNoDate> = {
    type: 'object',
    properties: {
        dateString: { type: 'string', format: 'stringDateNoTime' },
    },
    required: ['dateString'],
};

describe('Formats test', () => {
    describe('otpCodeTemplate test', () => {
        const ajv = new Ajv({ allErrors: true });
        ajv.addFormat('otpTemplate', otpTemplateFormat);
        const validateFunction = ajv.compile(TestClassSchemaOtpTemplate);
        const validate = otpTemplateFormat.validate as FormatValidator<string>;
        describe('otpCodeTemplate test - Success', () => {
            test('should validate method return true when given a valid otpCodeTemplate', () => {
                const otpTemplate = `Esto es un template válido ${otpCodeDescriptor}`;
                const isValid = validate(otpTemplate);
                expect(isValid).toBeTruthy();
            });
            test('should return true when given a valid otpCodeTemplate string inside schema', () => {
                const otpTemplate = `Esto es un template válido ${otpCodeDescriptor}`;
                const testObject: TestClassOtpTemplate = {
                    otpTemplate,
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeTruthy();
            });
        });
        describe('otpCodeTemplate test - Errors', () => {
            test('should validate method return false when given a string without otpCodeTemplate format', () => {
                const otpTemplate = 'Random template';
                const isValid = validate(otpTemplate);
                expect(isValid).toBeFalsy();
            });
            test('should return false when given an invalid otpCodeTemplate string inside schema', () => {
                const otpTemplate = 'Random template';
                const testObject: TestClassOtpTemplate = {
                    otpTemplate,
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeFalsy();
            });
        });
    });
    describe('password test', () => {
        const ajv = new Ajv({ allErrors: true });
        ajv.addFormat('password', passwordFormat);
        const validateFunction = ajv.compile(TestClassSchemaPassword);
        const validate = passwordFormat.validate as FormatValidator<string>;
        describe('password test - Success', () => {
            test('should validate method return true when given a valid password', () => {
                const password = 'Ab1*1234';
                const isValid = validate(password);
                expect(isValid).toBeTruthy();
            });
            test('should return true when given a valid password string inside schema', () => {
                const password = 'Ab1*1234';
                const testObject: TestClassPassword = {
                    password,
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeTruthy();
            });
        });
        describe('password test - Errors', () => {
            test('should validate method return false when given a string without password format', () => {
                const password = 'asdads1';
                const isValid = validate(password);
                expect(isValid).toBeFalsy();
            });
            test('should return false when given an invalid password string inside schema', () => {
                const password = 'asdads1';
                const testObject: TestClassPassword = {
                    password,
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeFalsy();
            });
        });
    });
    describe('rutFormat test', () => {
        const ajv = new Ajv({ allErrors: true });
        ajv.addFormat('rut', rutFormat);
        const validateFunction = ajv.compile(TestClassSchemaRut);
        const validate = rutFormat.validate as FormatValidator<string>;
        describe('rutFormat test - Success', () => {
            test('should validate method return true when given a valid rut string', () => {
                const rut = '263047702';
                const isValid = validate(rut);
                expect(isValid).toBeTruthy();
            });
            test('should validate method return true when given a valid rut string with hyphen separator', () => {
                const rut = '26304770-2';
                const isValid = validate(rut);
                expect(isValid).toBeTruthy();
            });
            test('should validate method return true when given a valid rut string with special check digit', () => {
                const rut = '25626305K';
                const isValid = validate(rut);
                expect(isValid).toBeTruthy();
            });
            test('should validate method return true when given a valid rut string with special check digit and hyphen separator', () => {
                const rut = '25626305-K';
                const isValid = validate(rut);
                expect(isValid).toBeTruthy();
            });
            test('should return true when given a valid rut string inside schema', () => {
                const rut = '263047702';
                const testObject: TestClassRut = {
                    rut,
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeTruthy();
            });
            test('should return true when given a valid rut string with hyphen separator inside schema', () => {
                const rut = '26304770-2';
                const testObject: TestClassRut = {
                    rut,
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeTruthy();
            });
            test('should return true when given a valid rut string with special check digit inside schema', () => {
                const rut = '25626305K';
                const testObject: TestClassRut = {
                    rut,
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeTruthy();
            });
            test('should return true when given a valid rut string with special check digit and hyphen separator inside schema', () => {
                const rut = '25626305-K';
                const testObject: TestClassRut = {
                    rut,
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeTruthy();
            });
        });
        describe('rutFormat test - Errors', () => {
            test('should validate method return false when given a string without rut allowed chars', () => {
                const rut = 'randomstring';
                const isValid = validate(rut);
                expect(isValid).toBeFalsy();
            });
            test('should validate method return false when given an invalid rut string', () => {
                const rut = '263047703';
                const isValid = validate(rut);
                expect(isValid).toBeFalsy();
            });
            test('should validate method return false when given an invalid rut string with hyphen separator', () => {
                const rut = '26304770-3';
                const isValid = validate(rut);
                expect(isValid).toBeFalsy();
            });
            test('should validate method return false when given an invalid rut string with special check digit and hyphen separator', () => {
                const rut = '25226305-K';
                const isValid = validate(rut);
                expect(isValid).toBeFalsy();
            });
            test('should validate method return false when given  an invalid rut string with special check digit', () => {
                const rut = '25226305K';
                const isValid = validate(rut);
                expect(isValid).toBeFalsy();
            });
            test('should return false when given a string without rut allowed chars inside schema', () => {
                const rut = 'randomstring';
                const testObject: TestClassRut = {
                    rut,
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeFalsy();
            });
            test('should return false when given an invalid rut string inside schema', () => {
                const rut = '263047703';
                const testObject: TestClassRut = {
                    rut,
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeFalsy();
            });
            test('should return false when given an invalid rut string with hyphen separator inside schema', () => {
                const rut = '26304770-3';
                const testObject: TestClassRut = {
                    rut,
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeFalsy();
            });
            test('should return false when given an invalid rut string with special check digit and hyphen separator inside schema', () => {
                const rut = '25226305-K';
                const testObject: TestClassRut = {
                    rut,
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeFalsy();
            });
            test('should return false when given  an invalid rut string with special check digit inside schema', () => {
                const rut = '25226305K';
                const testObject: TestClassRut = {
                    rut,
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeFalsy();
            });
        });
    });
    describe('tokenType test', () => {
        const ajv = new Ajv({ allErrors: true });
        ajv.addFormat('tokenType', tokenTypeFormat);
        const validateFunction = ajv.compile(TestClassSchemaTokenType);
        const validate = tokenTypeFormat.validate as FormatValidator<string>;
        describe('tokenType test - Success', () => {
            test('should validate method return true when given a valid tokenType (JWT)', () => {
                const tokenType = 'JWT';
                const isValid = validate(tokenType);
                expect(isValid).toBeTruthy();
            });
            test('should validate method return true when given a valid tokenType (JWS)', () => {
                const tokenType = 'JWS';
                const isValid = validate(tokenType);
                expect(isValid).toBeTruthy();
            });
            test('should return true when given a valid tokenType string inside schema', () => {
                const tokenType = 'JWS';
                const testObject: TestClassTokenType = {
                    tokenType,
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeTruthy();
            });
        });
        describe('tokenType test - Errors', () => {
            test('should validate method return false when given a string without tokenType allowed chars', () => {
                const tokenType = 'randomstring';
                const isValid = validate(tokenType);
                expect(isValid).toBeFalsy();
            });
            test('should return false when given an invalid tokenType string inside schema', () => {
                const tokenType = 'TEST';
                const testObject: TestClassTokenType = {
                    tokenType,
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeFalsy();
            });
        });
    });
    describe('phone test', () => {
        const ajv = new Ajv({ allErrors: true });
        ajv.addFormat('phone', phoneFormat);
        const validateFunction = ajv.compile(TestClassSchemaPhone);
        const validate = phoneFormat.validate as FormatValidator<string>;
        describe('phone test - Success', () => {
            test('should validate method return true when given a valid phone', () => {
                const phone = '959423069';
                const isValid = validate(phone);
                expect(isValid).toBeTruthy();
            });
            test('should return true when given a valid phone string inside schema', () => {
                const phone = '959423069';
                const testObject: TestClassPhone = {
                    phone,
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeTruthy();
            });
        });
        describe('phone test - Errors', () => {
            test('should validate method return false when given a string without phone format', () => {
                const phone = 'randomstring';
                const isValid = validate(phone);
                expect(isValid).toBeFalsy();
            });
            test('should return false when given an invalid phone string inside schema', () => {
                const phone = 'TEST';
                const testObject: TestClassPhone = {
                    phone,
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeFalsy();
            });
        });
    });
});
