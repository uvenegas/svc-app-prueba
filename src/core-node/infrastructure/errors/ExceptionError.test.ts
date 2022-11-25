import { ExceptionError } from './ExceptionError';

describe('Prueba definición de ExceptionError', () => {
    it('ExceptionError exitoso', () => {
        const resource = 'test';
        const code = '400';
        const message = 'error';

        const exeption = new ExceptionError(resource, code, message);

        expect(exeption.resource).toEqual(resource);
        expect(exeption.code).toEqual(code);
    });

    it('ExceptionError error', () => {
        expect(() => {
            throw new ExceptionError('', '', '');
        }).toThrowError();
    });
});
