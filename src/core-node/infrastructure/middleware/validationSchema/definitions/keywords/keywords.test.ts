/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable require-jsdoc */
import Ajv, { JSONSchemaType } from 'ajv';
import { isNotEmptyKeyword } from './isNotEmpty';
import { SchemaValidateFunction } from 'ajv/dist/types';

class TestClass {
    testString: string;
}

const TestClassSchema: JSONSchemaType<TestClass> = {
    type: 'object',
    properties: {
        testString: { type: 'string', minLength: 1, isNotEmpty: true },
    },
    required: ['testString'],
};
describe('Keywords test', () => {
    describe('isNotEmpty', () => {
        const ajv = new Ajv({ allErrors: true });
        const validate = isNotEmptyKeyword.validate as SchemaValidateFunction;
        ajv.addKeyword(isNotEmptyKeyword);
        const validateFunction = ajv.compile(TestClassSchema);
        describe('isNotEmpty - Success', () => {
            test('should validate method return true when given a not full whitespace string', async () => {
                const testString = 'validstring';
                const isValid = validate(TestClassSchema, testString);
                expect(isValid).toBeTruthy();
            });
            test('should return true when given a not full whitespace string inside schema', async () => {
                const testObject: TestClass = {
                    testString: 'validString',
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeTruthy();
            });
        });
        describe('isNotEmpty - Errors', () => {
            test('should validate method return false when given an empty string', async () => {
                const testString = '';
                const isValid = validate(TestClassSchema, testString);
                expect(isValid).toBeFalsy();
            });
            test('should validate method return false when given a full whitespace chars string', async () => {
                const testString = '     ';
                const isValid = validate(TestClassSchema, testString);
                expect(isValid).toBeFalsy();
            });
            test('should return false when given an empty string inside schema', async () => {
                const testObject: TestClass = {
                    testString: '',
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeFalsy();
            });
            test('should return false when given a full whitespace string inside schema', async () => {
                const testObject: TestClass = {
                    testString: '   ',
                };
                const isValid = validateFunction(testObject);
                expect(isValid).toBeFalsy();
            });
        });
    });
});
