/**
 * This import is required in order to allow aliases to work.
 * It needs to be at the top before any other import
 */
import { api } from './api';
import { App } from '@modules/App';
import { MsConfig } from '@msConfig/MsConfig';
import { HealthServices } from '@shared/services/HealthServices';
import { Logger } from '@core/logger/Logger';

/**
 * default port to listen
 */
const port = MsConfig.appPort;
// TODO Hack a nivel de develop para deshabilitar el tls del certificado de operaciones, (revisar con jose sanchez)
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
api.listen(port, () => {
    Logger.info(`server started at http://localhost:${port}`);
    Logger.info(`GET -> http://localhost:${port}${MsConfig.rootPath}/health`);
    Logger.info(`GET -> http://localhost:${port}/healthz`);
});
 
const app = new App();
 
/**
  * start the express server
  */
app.start()
    .then((message) => {
        Logger.debug('************************');
        Logger.debug('*  svc-app-prueba *');
        Logger.debug('*   By: Ulises    *');
        Logger.debug('************************');
        Logger.debug(message);
        /* if (MsConfig.environment === 'development') { */
        HealthServices.healthcheck()
            .then((message) => {
                for (const health of message) {
                    Logger.debug('Servicio: ' + health.servicio + ' -> ' + health.response);
                }
            })
            .catch((error) => {
                Logger.error('HealthServices:' + error);
            });
        /* } */
    })
    .catch((error) => {
        Logger.error(error);
        process.exit(1);
    });
 