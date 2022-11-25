import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { MsConfig } from '@msConfig/MsConfig';
import { UserRoutes } from '@domains/user/route';
import { DrugsRoutes } from '@domains/drugs/route';
import { VaccinationRoutes } from '@domains/vaccination/route';
import bodyParserError from 'src/core-node/infrastructure/middleware/bodyParserError.middleware';
import logTimeResponse from 'src/core-node/infrastructure/middleware/logTimeResponse.middleware';
import { formatResponse, sendResponse } from 'src/core-node/infrastructure/providers/ErrorHandling/errorHandler';
import { IResponse } from 'src/core-node/infrastructure/interfaces/IResponse';
import { EHttpStatus } from 'src/core-node/infrastructure/enums/EHttpStatus';

export const api = express();

/** Cors */
api.use(logTimeResponse);
api.use(cors());
api.use(express.json());
api.use(bodyParserError);

/** Routes */
api.use(`${MsConfig.rootPath}`, UserRoutes);
api.use(`${MsConfig.rootPath}`, DrugsRoutes);
api.use(`${MsConfig.rootPath}`, VaccinationRoutes);

/** Health Check */
api.get(`${MsConfig.rootPath}/health`, (_req: Request, res: Response, next: NextFunction) => {
    const dataResponse = formatResponse(EHttpStatus.Success, 'success', { success: true }) as unknown as IResponse<unknown>;
    sendResponse(res, dataResponse, next);
});
