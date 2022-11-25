/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '../logger/Logger';

export interface IUtils {
    exists: (modulePath: string) => boolean;
    existValueInEnum: (type: any, value: any) => boolean;
}

export const utils: IUtils = {
    /**
     * Check if module/file exists given the path
     * @return {boolean} true if module exists, false otherwise
     * @param {string} modulePath - path to the module/file
     */
    exists: (modulePath: string): boolean => {
        try {
            require(modulePath);
            return true;
        } catch (error) {
            Logger.info(`module or file [${modulePath}] doesn't exists`);
            return false;
        }
    },
    /**
     * Check if a value exists for a key in an enum
     * @return {boolean} true if module value exists
     * @param {any} type - the enum to check
     * @param {any} value - the value to evaluate
     */
    existValueInEnum(type: any, value: any): boolean {
        return (
            Object.keys(type)
                .filter((k) => isNaN(Number(k)))
                .filter((k) => type[k] === value).length > 0
        );
    },
};

/**
 * Checks if variable object follows the contract given.
 * @param {object} obj - object to check
 * @param {string} objName - name of the object, for the errors
 * @param {object} keysType - keys with the variable type of the key on the object
 * @param {boolean} includeEmpty - assume empty is ok
 * @return {array} array with the error. If no errors, the array is empty
 */
export function checkObjectContract(obj: { [index: string]: any }, objName: string, keysType: { [index: string]: any } | undefined = {}): [string?] {
    const errors: [string?] = [];
    const keys = Object.keys(keysType);
    for (const key of keys) {
        const pathKey = objName ? `${objName}.${key}` : key;
        const typeOfObjKey = typeof obj[key];
        const typeOfSubKey = typeof keysType[key];
        const realKeyType = typeOfSubKey === 'object' ? keysType[key].type : keysType[key];
        const keyToCheck = realKeyType.endsWith('?') ? realKeyType.substring(0, realKeyType.length - 1) : realKeyType;
        if (typeOfObjKey === 'undefined') {
            if (keyToCheck === realKeyType) {
                errors.push(`${pathKey} is nonExistant`);
            }
        } else if (keyToCheck !== typeOfObjKey && (keyToCheck !== 'array' || !Array.isArray(obj[key]))) {
            Logger.info('not type', pathKey, obj[key], typeOfObjKey, keyToCheck, Array.isArray(obj[key]));
            errors.push(`${pathKey} is not type ${keyToCheck}`);
        } else if (typeOfSubKey === 'object') {
            if (keyToCheck === 'array') {
                if (obj[key].length === 0) {
                    if (keyToCheck === realKeyType) {
                        errors.push(`${pathKey} is an empty array when it shouldn't be`);
                    }
                } else {
                    errors.push(...checkArrayContract(obj[key], pathKey, keysType[key].childType));
                }
            } else if (keyToCheck === 'object') {
                if (Object.keys(obj[key]).length === 0) {
                    if (keyToCheck === realKeyType) {
                        errors.push(`${pathKey} is an empty object when it shouldn't be`);
                    }
                } else {
                    errors.push(...checkObjectContract(obj[key], pathKey, keysType[key].keys));
                }
            }
        }
    }
    return errors;
}

/**
 * Checks if variable array follows the contract given.
 * @param {array} arr
 * @param {string} arrName
 * @param {string|array} keyType
 * @return {array} array with the error. If no errors, the array is empty
 */
export function checkArrayContract(arr: Array<any>, arrName: string, keyType: { [index: string]: any } | string | undefined = 'string'): [string?] {
    const errors: [string?] = [];
    const realKeyType = typeof keyType === 'object' ? keyType.type : keyType;
    const keyToCheck = realKeyType.endsWith('?') ? realKeyType.substring(0, realKeyType.length - 1) : realKeyType;

    for (let index = 0; index < arr.length; index += 1) {
        const pathKey = `${arrName}.${index}`;
        const objToCheck = arr[index];
        const typeOfObj = typeof objToCheck;
        if (typeOfObj === 'undefined') {
            if (realKeyType === keyToCheck) {
                errors.push(`${pathKey} is nonExistant`);
            }
        } else if (keyToCheck !== typeOfObj && (keyToCheck !== 'array' || !Array.isArray(objToCheck))) {
            errors.push(`${pathKey} is not type ${keyToCheck}`);
        } else if (typeof keyType === 'object') {
            if (keyToCheck === 'array') {
                if (objToCheck.length === 0) {
                    if (keyToCheck === realKeyType) {
                        errors.push(`${pathKey} is an empty array when it shouldn't be`);
                    }
                } else {
                    errors.push(...checkArrayContract(objToCheck, pathKey, keyType.childType));
                }
            } else if (keyToCheck === 'object') {
                if (Object.keys(objToCheck).length === 0) {
                    if (keyToCheck === realKeyType) {
                        errors.push(`${pathKey} is an empty object when it shouldn't be`);
                    }
                } else {
                    errors.push(...checkObjectContract(objToCheck, pathKey, keyToCheck.keys));
                }
            }
        }
    }
    return errors;
}
