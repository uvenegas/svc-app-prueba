/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Router, Request, Response, NextFunction } from 'express';
import { EHttpStatus } from '@core/enums/EHttpStatus';
import { formatError, formatResponse, sendResponse } from '@core/providers/ErrorHandling/errorHandler';
import { IResponse } from '@core/interfaces/IResponse';
import { DrugsController } from '@domains/drugs/controller/DrugsController';
import { IDrugs } from '@domains/drugs/interface/IDrugs';
import { validationSchemaMiddleware } from '@core/middleware/validationSchema/validationSchema.middleware';
import { ESchemaMiddleware } from '@core/enums/ESchemaMiddleware';
import { DrugsSchemaRequest } from '@domains/drugs/validation/DrugsSchemaRequest.schema';
import { IdSchemaRequest } from '@domains/drugs/validation/IdSchemaRequest.schema';

// eslint-disable-next-line new-cap
const router = Router();
const basePath = '/';
router
    .post(`${basePath}drugs`, async (req: Request, resp: Response, next: NextFunction) => {
        try {
            await validationSchemaMiddleware(req, DrugsSchemaRequest, ESchemaMiddleware.body);
            const drugsRequest: IDrugs.IRequestDrugs = req.body;
            const drugsResponse = await DrugsController.postDrugs(drugsRequest);
            const response = formatResponse(EHttpStatus.Success, 'Success', drugsResponse) as IResponse<IDrugs.IResponseDrugs>;
            sendResponse(resp, response, next);
        } catch (error) {
            const handledError = formatError(error);
            sendResponse(resp, handledError, next);
        }
    })
    .put(`${basePath}drugs/:id`, async (req: Request, resp: Response, next: NextFunction) => {
        try {
            await validationSchemaMiddleware(req, DrugsSchemaRequest, ESchemaMiddleware.body);
            await validationSchemaMiddleware(req, IdSchemaRequest, ESchemaMiddleware.params);
            const idDrugs = Number(req.params.id);
            const drugsRequest: IDrugs.IRequestDrugs = req.body;
            const drugsResponse = await DrugsController.putDrugs(idDrugs, drugsRequest);
            const response = formatResponse(EHttpStatus.Success, 'Success', drugsResponse) as IResponse<IDrugs.IResponseDrugs>;
            sendResponse(resp, response, next);
        } catch (error) {
            const handledError = formatError(error);
            sendResponse(resp, handledError, next);
        }
    })
    .get(`${basePath}drugs`, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const drugs = await DrugsController.getDrugs();
            const response = formatResponse(EHttpStatus.Success, 'success', drugs) as IResponse<IDrugs.IResponseDrugs>;
            sendResponse(res, response, next);
        } catch (error) {
            const handledError = formatError(error);
            sendResponse(res, handledError, next);
        }
    })
    .delete(`${basePath}drugs/:id`, async (req: Request, resp: Response, next: NextFunction) => {
        try {
            await validationSchemaMiddleware(req, IdSchemaRequest, ESchemaMiddleware.params);
            const idDrugs = Number(req.params.id);
            const drugsResponse = await DrugsController.deleteDrugs(idDrugs);
            const response = formatResponse(EHttpStatus.Success, 'Success', drugsResponse) as IResponse<IDrugs.IResponseDrugs>;
            sendResponse(resp, response, next);
        } catch (error) {
            const handledError = formatError(error);
            sendResponse(resp, handledError, next);
        }
    });

export default router;
