import { FormatDefinition } from 'ajv/dist/types';

/**
 * Validates if a given string has valid phone format
 * @param {string} phone string to validate
 * @return {boolean} Verification result as boolean
 */
export const validatePhone = (phone: string): boolean => {
    const phoneno = /^9\d{8}$/;
    if (phone.match(phoneno)) {
        return true;
    } else {
        return false;
    }
};

export const phoneFormat: FormatDefinition<string> = {
    validate: validatePhone,
};
