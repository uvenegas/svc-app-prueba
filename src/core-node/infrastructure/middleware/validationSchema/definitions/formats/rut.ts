import { FormatDefinition } from 'ajv/dist/types';

/**
 * Validates if a given string has valid RUT format
 * @param {string} rut string to validate
 * @return {boolean} Verification result as boolean
 */
export const validateRut = (rut: string): boolean => {
    if (/^\d{7,8}[\d|K]{1}/.test(rut)) {
        let t = parseInt(rut.slice(0, -1), 10);
        let m = 0;
        let s = 1;
        while (t > 0) {
            s = (s + (t % 10) * (9 - (m++ % 6))) % 11;
            t = Math.floor(t / 10);
        }
        const v = s > 0 ? '' + (s - 1) : 'K';
        return v === rut.slice(-1);
    } else {
        return false;
    }
};

export const rutFormat: FormatDefinition<string> = {
    validate: validateRut,
};
