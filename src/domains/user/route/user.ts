/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Router, Request, Response, NextFunction } from 'express';
import { EHttpStatus } from '@core/enums/EHttpStatus';
import { formatError, formatResponse, sendResponse } from '@core/providers/ErrorHandling/errorHandler';
import { IResponse } from '@core/interfaces/IResponse';
import { validationSchemaMiddleware } from '@core/middleware/validationSchema/validationSchema.middleware';
import { ESchemaMiddleware } from '@core/enums/ESchemaMiddleware';
import { IUser } from '@domains/user/interface/IUser';
import { UserController } from '@domains/user/controller/UserController';
import { UserSchemaRequest } from '@domains/user/validation/UserSchemaRequest.schema';
import { LoginSchemaRequest } from '@domains/user/validation/LoginSchemaRequest.schema';

// eslint-disable-next-line new-cap
const router = Router();
const basePathClient = '/';
router
    .post(`${basePathClient}signup`, async (req: Request, resp: Response, next: NextFunction) => {
        try {
            await validationSchemaMiddleware(req, UserSchemaRequest, ESchemaMiddleware.body);
            const userRequest: IUser.IRequestUser = req.body;
            const userResponse = await UserController.postUser(userRequest);
            const response = formatResponse(EHttpStatus.Success, 'Success', userResponse) as IResponse<IUser.IResponseUser>;
            sendResponse(resp, response, next);
        } catch (error) {
            const handledError = formatError(error);
            sendResponse(resp, handledError, next);
        }
    })
    .post(`${basePathClient}login`, async (req: Request, resp: Response, next: NextFunction) => {
        try {
            await validationSchemaMiddleware(req, LoginSchemaRequest, ESchemaMiddleware.body);
            const loginRequest: IUser.IRequestLogin = req.body;
            const loginResponse = await UserController.loginUser(loginRequest);
            const response = formatResponse(EHttpStatus.Success, 'Success', loginResponse) as IResponse<IUser.IResponseUser>;
            sendResponse(resp, response, next);
        } catch (error) {
            const handledError = formatError(error);
            sendResponse(resp, handledError, next);
        }
    });

export default router;
