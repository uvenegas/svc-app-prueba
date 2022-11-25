import { IResponse } from './IResponse';

describe('Prueba definición de IResponse', () => {
    it('IResponse exitoso', () => {
        type TTest = { name: string; lastname: string };
        const userData = { name: 'José', lastname: 'Morillo' };

        const response: IResponse<TTest> = {
            payload: userData,
            statusCode: 200,
            count: 1,
            message: 'success',
        };

        expect(response.count).toEqual(1);
        expect(response.payload).toEqual(userData);
    });
});
