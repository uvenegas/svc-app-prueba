/* eslint-disable @typescript-eslint/no-explicit-any */
import { utils, checkObjectContract, checkArrayContract } from './utils';
import { EHttpStatus } from '../enums/EHttpStatus';

describe('utils tests', () => {
    it('utils.exists() should return true on existent module', () => {
        const returnValue = utils.exists('fs'); // fs exists in all node apps
        expect(returnValue).toEqual(true);
    });

    it('utils.exists() should return false on non existent module', () => {
        const returnValue = utils.exists('thisModuleDoesntExists');
        expect(returnValue).toEqual(false);
    });

    it('utils.existValueInEnum() should return false on existValueInEnum', () => {
        const returnValue = utils.existValueInEnum(EHttpStatus, 402);
        expect(returnValue).toEqual(false);
    });

    it('utils.existValueInEnum() should return true on existValueInEnum', () => {
        const returnValue = utils.existValueInEnum(EHttpStatus, 200);
        expect(returnValue).toEqual(true);
    });

    it('checkObjectContract() return message success', () => {
        const returnValue = checkObjectContract({ llave: 'valor' }, 'test', { llave: 'string' });
        expect(returnValue).toEqual([]);
    });

    it('checkObjectContract() return message error', () => {
        const returnValue = checkObjectContract({ llave: 'valor' }, 'test', { llave: 'number' });
        expect(returnValue).toEqual(['test.llave is not type number']);
    });

    it('checkObjectContract() return message error- object undefined', () => {
        const returnValue = checkObjectContract({ llaves: 'valor' }, 'test', { llave: 'number' });

        expect(returnValue).toEqual(['test.llave is nonExistant']);
    });

    it('checkObjectContract() return message error - PARAMETRO keysType OBJECT', () => {
        const returnValue = checkObjectContract({ user: { name: 'jose' } }, 'user', { user: { type: 'object' } });
        expect(returnValue).toEqual([]);
    });

    it('checkObjectContract() return message error - PARAMETRO keysType ARRAY OBJECT', () => {
        const returnValue = checkObjectContract({ user: [{ name: 'jose' }] }, 'user', { user: { type: 'array' } });
        expect(returnValue).toEqual(['user.user.0 is not type string']);
    });

    it('checkObjectContract() return message error - PARAMETRO object ARRAY NULL', () => {
        const returnValue = checkObjectContract({ user: [] }, 'user', { user: { type: 'array' } });
        expect(returnValue).toEqual(["user.user is an empty array when it shouldn't be"]);
    });

    it('checkObjectContract() return message error - PARAMETRO object OBJECT NULL', () => {
        const returnValue = checkObjectContract({ user: {} }, 'user', { user: { type: 'object' } });
        expect(returnValue).toEqual(["user.user is an empty object when it shouldn't be"]);
    });

    it('checkArrayContract() return message error- users.0.0 is not type string', () => {
        const returnValue = checkArrayContract([[{ name: 'jose' }]], 'users', { type: 'array' });
        expect(returnValue).toEqual(['users.0.0 is not type string']);
    });

    it("checkArrayContract() return message error - users.0 is an empty array when it shouldn't be", () => {
        const returnValue = checkArrayContract([[]], 'users', { type: 'array' });
        expect(returnValue).toEqual(["users.0 is an empty array when it shouldn't be"]);
    });

    it("checkArrayContract() return message error - users.0 is an empty object when it shouldn't be", () => {
        const returnValue = checkArrayContract([{}], 'users', { type: 'object' });
        expect(returnValue).toEqual(["users.0 is an empty object when it shouldn't be"]);
    });

    it('checkArrayContract() return message success', () => {
        const returnValue = checkArrayContract([{ name: 'test' }], 'users', { type: 'object' });
        expect(returnValue).toEqual([]);
    });

    it('checkArrayContract() return message success', () => {
        const returnValue = checkArrayContract([], 'users', { type: 'object' });
        expect(returnValue).toEqual([]);
    });

    it('checkArrayContract() return users.0 is nonExistant', () => {
        const returnValue = checkArrayContract([undefined], 'users', { type: 'object' });
        expect(returnValue).toEqual(['users.0 is nonExistant']);
    });
});
