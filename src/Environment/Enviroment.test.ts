import { Environment } from './Environment';

describe('Prueba definición de enum Environment', () => {
    it('Environment exitoso', () => {
        const env = Environment;

        expect(env.local === 'local' || env.staging === 'staging' || env.production === 'production').toBeTruthy();
    });
});
