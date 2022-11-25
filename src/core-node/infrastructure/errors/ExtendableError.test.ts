import { ExtendableError } from './ExtendableError';

describe('Prueba definición de ExtendableError', () => {
    it('ExtendableError exitoso', () => {
        const message = 'error';

        const exeption = new ExtendableError(message);

        expect(exeption.message).toEqual(message);
    });

    it('ExtendableError error', () => {
        const message = 'error';
        const exeption = new ExtendableError(message);

        expect(exeption.message).toEqual(message);
    });
});
