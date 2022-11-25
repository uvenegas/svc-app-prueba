import { EHttpStatus } from './EHttpStatus';

describe('Prueba definición de enum EHttpStatus', () => {
    it('Enum exitoso', () => {
        const http = EHttpStatus;

        expect(http.Success).toEqual(200);
        expect(http.Created).toEqual(201);
        expect(http.InvalidRequest).toEqual(400);
        expect(http.NotFound).toEqual(404);
        expect(http.Unauthorized).toEqual(401);
        expect(http.Conflict).toEqual(409);
        expect(http.RunTimeError).toEqual(500);
        expect(http.NotAcceptable).toEqual(406);
        expect(http.PreconditionRequired).toEqual(428);
    });
});
