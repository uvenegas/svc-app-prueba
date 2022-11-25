import { EErrorMessages } from '../../enums/EErrorMessage';
import { ErrorMessageHandler } from './ErrorMessageHandler';

describe('ErrorMessageHandler test', () => {
    test('should be return defaultMessageError', () => {
        expect(ErrorMessageHandler.defaultMessageError()).toBe(EErrorMessages.DEFAULT_SCHEMA_ERROR);
    });
    test('should be return clientMessageError', () => {
        expect(ErrorMessageHandler.clientMessageError()).toBe(EErrorMessages.CLIENT_ERROR);
    });
    test('should be return userOrPasswordMessageError', () => {
        expect(ErrorMessageHandler.userOrPasswordMessageError()).toBe(EErrorMessages.USER_AND_PASSWORD_ERROR);
    });
    test('should be return setPropertyMessageError with param name', () => {
        const name = 'name';
        expect(ErrorMessageHandler.setPropertyMessageError(name)).toBe(EErrorMessages.SET_PROPERTY_ERROR.replace(':param', name));
    });
});
