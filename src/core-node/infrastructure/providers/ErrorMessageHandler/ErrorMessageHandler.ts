import { EErrorMessages } from '../../enums/EErrorMessage';

/**
 * ErrorMessageHandler class handler
 */
export class ErrorMessageHandler {
    /**
     * return default message
     * @return {string}
     * @memberof ErrorMessageHandler
     */
    public static defaultMessageError(): string {
        return EErrorMessages.DEFAULT_SCHEMA_ERROR;
    }

    /**
     * return client message error
     * @return {string}
     * @memberof ErrorMessageHandler
     */
    public static clientMessageError(): string {
        return EErrorMessages.CLIENT_ERROR;
    }

    /**
     * return user or password message Error
     * @return {string}
     * @memberof ErrorMessageHandler
     */
    public static userOrPasswordMessageError(): string {
        return EErrorMessages.USER_AND_PASSWORD_ERROR;
    }

    /**
     * return message with propertyName
     * @param {string} propertyName name of property to show in message
     * @return {string}
     * @memberof ErrorMessageHandler
     */
    public static setPropertyMessageError(propertyName: string): string {
        return EErrorMessages.SET_PROPERTY_ERROR.replace(':param', propertyName);
    }
}
