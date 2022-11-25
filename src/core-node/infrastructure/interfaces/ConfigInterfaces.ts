/** Interface of the Configuration entity loaded from consul */
// tslint:disable: no-empty-interface

export interface AppConfig {
    environment: string;
    projectName: string;
    backend: {
        url: string;
    };
}

export interface MsSqlConfig {
    dbServer: string;
    serverPort: number;
    dbName: string;
    dbUser: string;
    dbPassword: string;
    authenticationType: string;
    isEncripted: boolean;
    requestTimeout: number;
}

export const AppConfigKeysAndTypes = {
    environment: 'string',
    projectName: 'string',
};
