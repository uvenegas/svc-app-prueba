import { MsConfig } from './../MsConfig/MsConfig';
import { ExceptionError } from 'src/core-node/infrastructure/errors/ExceptionError';

/**
 * It will encapsulate our app logic.
 * @return {App} - the app instance
 */
export class App {
    /**
     * Constructor App
     * @param {MsConfig} config
     */
    constructor(public config = MsConfig) {}

    /**
     * Start app
     * @return {Promise<string>}
     */
    async start(): Promise<string> {
        try {
            return `${MsConfig.projectName} in ${MsConfig.environment} started successfully.`;
        } catch (err) {
            const error = err as Error;
            throw new ExceptionError('App', 'startup_error', `${MsConfig.projectName} in ${MsConfig.environment} startup error: ${error.message}`);
        }
    }
}
