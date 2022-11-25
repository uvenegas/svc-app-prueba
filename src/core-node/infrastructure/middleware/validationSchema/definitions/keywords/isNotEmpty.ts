import { FuncKeywordDefinition, AnySchema } from 'ajv/dist/types';

/**
 * AJV definition of empty
 */
export const isNotEmptyKeyword: FuncKeywordDefinition = {
    type: 'string',
    keyword: 'isNotEmpty',
    validate: (_schema: AnySchema, data: string): boolean => {
        return typeof data === 'string' && data.trim() !== '';
    },
    errors: false,
};
