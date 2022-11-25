/**
 * This import is required in order to allow aliases to work.
 * It needs to be at the top before any other import
 */
import './config/moduleAliases';
import { Environment } from './Environment/Environment';
import { ExceptionError } from 'src/core-node/infrastructure/errors/ExceptionError';
import { Logger } from 'src/core-node/infrastructure/logger/Logger';
import { App } from '@modules/App';
import { MsConfig } from '@msConfig/MsConfig';
import { MongoDB } from '@shared/mongo/MongoDB';
import { api } from './api';

/**
 * Default port to listen
 */
const port = MsConfig.appPort;

/**
 * DB event to listen
 */
const enum MONGO_EVENTS {
    CONNECTING = 'connecting',
    CONNECTED = 'connected',
    ERROR = 'error',
    DISCONNECTED = 'disconnected',
}

/**
 * DB Instance
 */
const mongoDb = new MongoDB();

const appStart = async () => {
    const app = new App();

    if (!Object.values<string>(Environment).includes(MsConfig.environment)) {
        Logger.error(`Unknown environment: ${MsConfig.environment}`);
        throw new ExceptionError('Main', 'unknown_environment', `El environment no es conocido: ${MsConfig.environment}`);
    }

    api.listen(port, () => {
        Logger.info(`Server started at http://localhost:${port}`);
    });

    try {
        const message = await app.start();
        Logger.debug(message);
    } catch (error) {
        Logger.error(error);
        process.exit(1);
    }
};

mongoDb.listenEvent(MONGO_EVENTS.CONNECTING, function () {
    Logger.info('Establishing DB connection!');
});

mongoDb.listenEvent(MONGO_EVENTS.CONNECTED, async function () {
    Logger.info('DB connection established successfully!');
    appStart();
});

mongoDb.listenEvent(MONGO_EVENTS.ERROR, (error) => {
    Logger.error('DB connection error!', error);
    process.exit(1);
});

mongoDb.listenEvent(MONGO_EVENTS.DISCONNECTED, () => {
    Logger.info('DB disconnected!');
    process.exit(1);
});

mongoDb.connect();
