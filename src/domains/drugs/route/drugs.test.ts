/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Router, Request, Response, NextFunction } from 'express';
import { ConfigController } from '@domains/drugs/controller/DrugsController';
import { EHttpStatus } from 'src/core-node/infrastructure/enums/EHttpStatus';
import request from 'supertest';
import bodyParser from 'body-parser';
import { ConfigRoutes } from '@domains/drugs/route';
import { IConditionEnginerResponse } from '@domains/drugs/interface/IConditionEnginerResponse';
import { IResponse } from 'src/core-node/infrastructure/interfaces/IResponse';

const app = express();
app.use(bodyParser.json());
app.use('', ConfigRoutes);
const basePath = '/rules-engine';

describe('Test config controller', () => {
    describe('Test get All Config', () => {
        const responseTestSuccess: IResponse<IConditionEnginerResponse.IResponseEnginer> = {
            statusCode: 200,
            message: 'success',
            payload: {
                valid: true,
                metadata: {
                    isOptional: true,
                },
            },
        };
        test('should return a success get a config', async () => {
            ConfigController.getConfigApp = jest.fn().mockReturnValue(responseTestSuccess);
            const resp = await request(app).get(`${basePath}/ios/modal-update/4.0.0`);
            expect(resp.body.statusCode).toEqual(EHttpStatus.Success);
        });

        test('should return a error', async () => {
            ConfigController.getConfigApp = jest.fn().mockRejectedValueOnce('');
            const resp = await request(app).get(`${basePath}/ios/modal-update/4.0.0`);
            expect(resp.body.statusCode).toEqual(EHttpStatus.RunTimeError);
        });
    });
});
