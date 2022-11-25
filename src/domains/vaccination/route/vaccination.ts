/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Router, Request, Response, NextFunction } from 'express';
import { EHttpStatus } from 'src/core-node/infrastructure/enums/EHttpStatus';
import { formatError, formatResponse, sendResponse } from 'src/core-node/infrastructure/providers/ErrorHandling/errorHandler';
import { IResponse } from 'src/core-node/infrastructure/interfaces/IResponse';
import { validationSchemaMiddleware } from 'src/core-node/infrastructure/middleware/validationSchema/validationSchema.middleware';
import { ESchemaMiddleware } from 'src/core-node/infrastructure/enums/ESchemaMiddleware';
import { VaccinationController } from '@domains/vaccination/controller/VaccinationController';
import { IVaccination } from '../interface/IVaccination';

// eslint-disable-next-line new-cap
const router = Router();
const basePathClient = '/';
router
    .post(`${basePathClient}vaccination`, async (req: Request, resp: Response, next: NextFunction) => {
        try {
            // await validationSchemaMiddleware(req, TransactionSchema, ESchemaMiddleware.body);
            const vaccionationRequest: IVaccination.IRequestVaccination = req.body;
            const transactionResponse = await VaccinationController.postVaccination(vaccionationRequest);
            const response = formatResponse(EHttpStatus.Success, 'Success', transactionResponse) as IResponse<IVaccination.IResponseVaccination>;
            sendResponse(resp, response, next);
        } catch (error) {
            const handledError = formatError(error);
            sendResponse(resp, handledError, next);
        }
    })
    .put(`${basePathClient}vaccination/:id`, async (req: Request, resp: Response, next: NextFunction) => {
        try {
            const idVaccination = Number(req.params.id);
            const vaccionationRequest: IVaccination.IRequestVaccination = req.body;
            const vaccionationResponse = await VaccinationController.putVaccination(idVaccination, vaccionationRequest);
            const response = formatResponse(EHttpStatus.Success, 'Success', vaccionationResponse) as IResponse<IVaccination.IRequestVaccination>;
            sendResponse(resp, response, next);
        } catch (error) {
            const handledError = formatError(error);
            sendResponse(resp, handledError, next);
        }
    })
    .get(`${basePathClient}vaccination`, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const config = await VaccinationController.getVaccination();

            const dataResponse = formatResponse(EHttpStatus.Success, 'success', config) as IResponse<IVaccination.IResponseVaccination>;
            sendResponse(res, dataResponse, next);
        } catch (error) {
            const handledError = formatError(error);
            sendResponse(res, handledError, next);
        }
    })
    .delete(`${basePathClient}vaccination/:id`, async (req: Request, resp: Response, next: NextFunction) => {
        try {
            // await validationSchemaMiddleware(req, TransactionSchema, ESchemaMiddleware.body);
            const idVaccination = Number(req.params.id);
            const vaccionationResponse = await VaccinationController.deleteVaccination(idVaccination);
            const response = formatResponse(EHttpStatus.Success, 'Success', vaccionationResponse) as IResponse<IVaccination.IResponseVaccination>;
            sendResponse(resp, response, next);
        } catch (error) {
            const handledError = formatError(error);
            sendResponse(resp, handledError, next);
        }
    });

export default router;
