import { EErrorMessages } from './EErrorMessage';

describe('Prueba definición de enum EErrorMessages', () => {
    it('Enum exitoso', () => {
        const errorMessage = EErrorMessages;

        expect(errorMessage.CLIENT_ERROR).toEqual('En estos momentos no lo podemos atender, favor intente más tarde');
        expect(errorMessage.DEFAULT_SCHEMA_ERROR).toEqual('Ocurrió un error con las propiedades');
        expect(errorMessage.SET_PROPERTY_ERROR).toEqual('Se encontró un error con el parámetro :param');
        expect(errorMessage.USER_AND_PASSWORD_ERROR).toEqual('Usuario o contraseña incorrectos');
    });
});
