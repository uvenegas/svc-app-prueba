/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Router, Request, Response, NextFunction } from 'express';
import { EHttpStatus } from '@core/enums/EHttpStatus';
import { formatError, formatResponse, sendResponse } from '@core/providers/ErrorHandling/errorHandler';
import { IResponse } from '@core/interfaces/IResponse';
import { validationSchemaMiddleware } from '@core/middleware/validationSchema/validationSchema.middleware';
import { ESchemaMiddleware } from '@core/enums/ESchemaMiddleware';
import { VaccinationController } from '@domains/vaccination/controller/VaccinationController';
import { IVaccination } from '@domains/vaccination/interface/IVaccination';
import { VaccinationSchemaRequest } from '@domains/vaccination/validation/VaccinationSchemaRequest.schema';
import { IdSchemaRequest } from '@domains/vaccination/validation/IdSchemaRequest.schema';

// eslint-disable-next-line new-cap
const router = Router();
const basePathClient = '/';
router
    .post(`${basePathClient}vaccination`, async (req: Request, resp: Response, next: NextFunction) => {
        try {
            await validationSchemaMiddleware(req, VaccinationSchemaRequest, ESchemaMiddleware.body);
            const vaccinationRequest: IVaccination.IRequestVaccination = req.body;
            const vaccinationResponse = await VaccinationController.postVaccination(vaccinationRequest);
            const response = formatResponse(EHttpStatus.Success, 'Success', vaccinationResponse) as IResponse<IVaccination.IResponseVaccination>;
            sendResponse(resp, response, next);
        } catch (error) {
            const handledError = formatError(error);
            sendResponse(resp, handledError, next);
        }
    })
    .put(`${basePathClient}vaccination/:id`, async (req: Request, resp: Response, next: NextFunction) => {
        try {
            await validationSchemaMiddleware(req, VaccinationSchemaRequest, ESchemaMiddleware.body);
            await validationSchemaMiddleware(req, IdSchemaRequest, ESchemaMiddleware.params);
            const idVaccination = Number(req.params.id);
            const vaccinationRequest: IVaccination.IRequestVaccination = req.body;
            const vaccinationResponse = await VaccinationController.putVaccination(idVaccination, vaccinationRequest);
            const response = formatResponse(EHttpStatus.Success, 'Success', vaccinationResponse) as IResponse<IVaccination.IRequestVaccination>;
            sendResponse(resp, response, next);
        } catch (error) {
            const handledError = formatError(error);
            sendResponse(resp, handledError, next);
        }
    })
    .get(`${basePathClient}vaccination`, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const vaccinationResponse = await VaccinationController.getVaccination();

            const response = formatResponse(EHttpStatus.Success, 'success', vaccinationResponse) as IResponse<IVaccination.IResponseVaccination>;
            sendResponse(res, response, next);
        } catch (error) {
            const handledError = formatError(error);
            sendResponse(res, handledError, next);
        }
    })
    .delete(`${basePathClient}vaccination/:id`, async (req: Request, resp: Response, next: NextFunction) => {
        try {
            await validationSchemaMiddleware(req, IdSchemaRequest, ESchemaMiddleware.params);
            const idVaccination = Number(req.params.id);
            const vaccinationResponse = await VaccinationController.deleteVaccination(idVaccination);
            const response = formatResponse(EHttpStatus.Success, 'Success', vaccinationResponse) as IResponse<IVaccination.IResponseVaccination>;
            sendResponse(resp, response, next);
        } catch (error) {
            const handledError = formatError(error);
            sendResponse(resp, handledError, next);
        }
    });

export default router;
