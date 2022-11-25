import { Logger } from './Logger';

describe('Prueba definición de LOGGER', () => {
    it('Logger.info exitoso', () => {
        Logger.info('info', [{ message: 'test' }]);
        expect(jest.isMockFunction(Logger.info)).toBeDefined();
    });

    it('Logger.error exitoso', () => {
        Logger.error('error', [{ message: 'test' }]);
        expect(jest.isMockFunction(Logger.error)).toBeDefined();
    });

    it('Logger.debug exitoso', () => {
        Logger.debug('debug', [{ message: 'test' }]);
        expect(jest.isMockFunction(Logger.debug)).toBeDefined();
    });

    it('Logger.warn exitoso', () => {
        Logger.warn('warn', [{ message: 'test' }]);
        expect(jest.isMockFunction(Logger.warn)).toBeDefined();
    });
});
