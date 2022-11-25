/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-var-requires */
import { IAppConfig } from './interfaces/IAppConfig';
import { Environment } from '../Environment/Environment';
import { AppConfigKeysAndTypes } from '../config/AppConfigKeysAndTypes';
import dotenv from 'dotenv';
import { Logger } from 'src/core-node/infrastructure/logger/Logger';
import { checkObjectContract } from 'src/core-node/infrastructure/utils/utils';
import { ExceptionError } from 'src/core-node/infrastructure/errors/ExceptionError';

const getConfig = (): IAppConfig => {
    /**
     * Configure local environment
     */
    dotenv.config();

    if (process.env.CONFIG) {
        return JSON.parse(process.env.CONFIG) as IAppConfig;
    }
    return require('./../config/config.json') as IAppConfig;
};

export const config: IAppConfig = getConfig();

export abstract class MsConfig {
    static get config(): IAppConfig {
        return config;
    }

    static get environment(): string {
        return config.environment;
    }

    static get projectName(): string {
        return config.projectName;
    }

    static get rootPath(): string {
        return config.rootPath;
    }

    static get appPort(): number {
        return config.appPort;
    }

    static get isDevelopment(): boolean {
        return config.environment === Environment.local || config.environment === Environment.development || config.environment === Environment.staging;
    }

    static get isProduction(): boolean {
        return config.environment === Environment.production;
    }
}

export const errorsConfig = checkObjectContract(MsConfig.config, '', AppConfigKeysAndTypes);

if (errorsConfig.length > 0) {
    Logger.error(`Config with following errors.\n${errorsConfig.map((elem) => `  · ${elem}`).join('\n')}`);
    throw new ExceptionError('Main', 'bad_config', 'Bad or missing config variables');
}
