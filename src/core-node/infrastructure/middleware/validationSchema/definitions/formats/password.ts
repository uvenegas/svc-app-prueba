import { FormatDefinition } from 'ajv/dist/types';
type IPasswordStrongnesds = 'PIN' | 'LAZY' | 'STANDARD' | 'STRONG';

/**
 * Validates if a given string has valid password format
 * @param {string} password string to validate
 * @param {IPasswordStrongnesds} passwordStrongness string to validate
 * @return {boolean} Verification result as boolean
 * policies:
 *         a) STRONG: To check a password between 8 to 15 characters which contain at least one lowercase letter,
 *         one uppercase letter, one numeric digit, and one special character and it can have white spaces.
 *         b) STANDARD: To check a password between 6 to 12 characters which contain at least one lowercase letter,
 *         one uppercase letter, one numeric digit, and one special character and it can't content white spaces.
 *         c) LAZY: To check a password between 6 to 10 characters which could contain lowercase letters,
 *         uppercase letters, numeric digits. I not accepts special characters and it can't content white spaces.
 *         d) PIN: To check a password between 4 to 10 numbers only. It doesn't allow white spaces, symbols
 */

export const validatePassword = (password: string, passwordStrongness?: IPasswordStrongnesds): boolean => {
    const passwRegex: Record<IPasswordStrongnesds, RegExp> = {
        STRONG: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?!.* {2})(?!.*^ )(?!.* $)[a-zA-Z0-9! #$%&'"()*+,-.\/:;<=>?@[\]^_`{|}~]{7,15}$/,
        STANDARD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*^ )(?!.* $)(?!.* ).{6,12}$/,
        LAZY: /^[a-zA-Z0-9]{6,10}$/,
        PIN: /^[\d]{4,10}$/,
    };
    if (password.match(passwRegex[passwordStrongness ? passwordStrongness : 'STRONG'])) {
        return true;
    } else {
        return false;
    }
};

export const passwordFormat: FormatDefinition<string> = {
    validate: validatePassword,
};
