import { urlHealthServices } from '@config/urls';
import { ExceptionError } from '@core/errors/ExceptionError';
import { IResponse } from '@core/interfaces/IResponse';
import { formatError } from '@core/providers/ErrorHandling/errorHandler';
import { HttpClientTool } from '@core/providers/HttpClientTool/HttpClientTool';
import { IHttpClientToolRequestParameters } from '@core/providers/HttpClientTool/interfaces/IHttpClientToolRequestParameters';
import { IHealthResponse } from '@shared/interface/IHealthResponse';

/**
 * class HealthServices
 */
export class HealthServices {

    /**
     * Verify drugs health
     * @return {Promise<IHealthResponse>} health of service
     */
    private static async drugs(): Promise<IHealthResponse> {
        const httpClientTool = new HttpClientTool();
        const params: IHttpClientToolRequestParameters<unknown> = {
            url: urlHealthServices.drugs.drugsHealth,
        };
        const salida: IHealthResponse = {
            servicio: 'drug',
            response: '',
        };
        try {
            const respuesta = await httpClientTool.get<IResponse<unknown>>(params);
            salida.response = respuesta.message;
        } catch (error) {
            const handledError = formatError(error);
            salida.response = handledError.message;
        }

        return salida;
    }

    /**
     * Verify user health
     * @return {Promise<IHealthResponse>} health of service
     */
    private static async user(): Promise<IHealthResponse> {
        const httpClientTool = new HttpClientTool();
        const params: IHttpClientToolRequestParameters<unknown> = {
            url: urlHealthServices.user.userHealth,
        };
        const salida: IHealthResponse = {
            servicio: 'user',
            response: '',
        };
        try {
            const respuesta = await httpClientTool.get<IResponse<unknown>>(params);
            salida.response = respuesta.message;
        } catch (error) {
            const handledError = formatError(error);
            salida.response = handledError.message;
        }

        return salida;
    }

    /**
     * Verify drugs health
     * @return {Promise<IHealthResponse>} health of service
     */
    private static async vaccination(): Promise<IHealthResponse> {
        const httpClientTool = new HttpClientTool();
        const params: IHttpClientToolRequestParameters<unknown> = {
            url: urlHealthServices.vaccination.vaccinationHealth,
        };
        const salida: IHealthResponse = {
            servicio: 'vaccination',
            response: '',
        };
        try {
            const respuesta = await httpClientTool.get<IResponse<unknown>>(params);
            salida.response = respuesta.message;
        } catch (error) {
            const handledError = formatError(error);
            salida.response = handledError.message;
        }

        return salida;
    }

    /**
     * Make HealthCheck of other services
     * @return {Promise<IHealthResponse[]>}
     */
    public static async healthcheck(): Promise<IHealthResponse[]> {
        let salida: IHealthResponse[] = [];
        try {
            salida = await Promise.all([
                this.drugs(),
                this.user(),
                this.vaccination(),
            ]);
            return salida;
        } catch (err) {
            const error = err as Error;
            throw new ExceptionError('HealthServices', 'verifyServices', ` in verify Services error: ${error.message}`);
        }
    }
}
