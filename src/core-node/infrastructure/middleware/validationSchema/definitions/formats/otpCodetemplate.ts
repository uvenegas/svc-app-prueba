import { FormatDefinition } from 'ajv/dist/types';

export const otpCodeDescriptor = '##OTP_CODE##';

/**
 * Validates if a given string has valid OTP Template format
 * @param {string} otpTemplate string to validate
 * @return {boolean} Verification result as boolean
 */
export const validateOtpTemplateFormat = (otpTemplate: string): boolean => {
    if (otpTemplate.includes(otpCodeDescriptor)) {
        return true;
    } else {
        return false;
    }
};

export const otpTemplateFormat: FormatDefinition<string> = {
    validate: validateOtpTemplateFormat,
};
