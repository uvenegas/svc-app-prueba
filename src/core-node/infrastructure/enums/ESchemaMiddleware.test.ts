import { ESchemaMiddleware } from './ESchemaMiddleware';

describe('Prueba definición de enum ESchemaMiddleware', () => {
    it('ESchemaMiddleware exitoso', () => {
        const enumSchema = ESchemaMiddleware;

        expect(enumSchema.body).toEqual('body');
        expect(enumSchema.headers).toEqual('headers');
        expect(enumSchema.params).toEqual('params');
        expect(enumSchema.query).toEqual('query');
    });
});
