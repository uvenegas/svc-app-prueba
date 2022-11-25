import { AppConfig, MsSqlConfig } from './ConfigInterfaces';

describe('Prueba definición de ConfigInterfaces', () => {
    it('AppConfig exitoso', () => {
        const app: AppConfig = {
            environment: 'test',
            projectName: 'test',
            backend: {
                url: '',
            },
        };

        expect(app.environment).toEqual('test');
        expect(app.projectName).toEqual('test');
    });

    it('MsSqlConfig exitoso', () => {
        const msSql: MsSqlConfig = {
            dbServer: 'serverTest',
            serverPort: 3000,
            dbName: 'dbTest',
            dbUser: 'userTest',
            dbPassword: '1234',
            authenticationType: 'default',
            isEncripted: false,
            requestTimeout: 30000,
        };

        expect(msSql.dbServer).toEqual('serverTest');
        expect(msSql.serverPort).toEqual(3000);
    });
});
