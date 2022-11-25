import { FormatDefinition } from 'ajv/dist/types';

/**
 * tokenType validation for ajv validator
 * @param {string} tokenType
 * @returns {boolean}
 */
export const tokenTypeFormat: FormatDefinition<string> = {
    validate: (tokenType: string) => tokenType === 'JWT' || tokenType === 'JWS',
};
