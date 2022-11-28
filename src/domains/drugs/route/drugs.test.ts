/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Router, Request, Response, NextFunction } from 'express';
import { DrugsController } from '@domains/drugs/controller/DrugsController';
import { EHttpStatus } from '@core/enums/EHttpStatus';
import request from 'supertest';
import bodyParser from 'body-parser';
import { DrugsRoutes } from '@domains/drugs/route';
import { IResponse } from '@core/interfaces/IResponse';
import { IDrugs } from '@domains/drugs/interface/IDrugs';

const app = express();
app.use(bodyParser.json());
app.use('', DrugsRoutes);
const basePath = '/';

describe('Test drugs controller', () => {
    describe('Test post drugs', () => {
        const requestTest: IDrugs.IRequestDrugs = {
                id: 123,
                name: 'adrenalina',
                approved: true,
                min_dose: 123,
                max_dose: 123,
                avaliable_at: new Date,
        };

        const responseTestSuccess: IResponse<IDrugs.IResponseDrugs> = {
            statusCode: 200,
            message: 'success',
            payload: {
                id: 123,
                name: 'adrenalina',
                approved: true,
                min_dose: 123,
                max_dose: 123,
                avaliable_at: new Date,
            },
        };
        test('should return a success post a drugs', async () => {
            DrugsController.postDrugs = jest.fn().mockReturnValue(responseTestSuccess);
            const resp = await request(app).post(`${basePath}drugs`).send(requestTest);
            expect(resp.body.statusCode).toEqual(EHttpStatus.Success);
        });

        test('should return a error', async () => {
            DrugsController.postDrugs = jest.fn().mockRejectedValueOnce('');
            const resp = await request(app).post(`${basePath}drugs`).send(requestTest);
            expect(resp.body.statusCode).toEqual(EHttpStatus.RunTimeError);
        });
    });

    describe('Test put drugs', () => {
        const requestTest: IDrugs.IRequestDrugs = {
                id: 123,
                name: 'adrenalina',
                approved: true,
                min_dose: 123,
                max_dose: 123,
                avaliable_at: new Date,
        };

        const responseTestSuccess: IResponse<IDrugs.IResponseDrugs> = {
            statusCode: 200,
            message: 'success',
            payload: {
                id: 123,
                name: 'adrenalina',
                approved: true,
                min_dose: 123,
                max_dose: 123,
                avaliable_at: new Date,
            },
        };
        test('should return a success put a drugs', async () => {
            DrugsController.putDrugs = jest.fn().mockReturnValue(responseTestSuccess);
            const resp = await request(app).put(`${basePath}drugs/123`).send(requestTest);
            expect(resp.body.statusCode).toEqual(EHttpStatus.Success);
        });

        test('should return a error', async () => {
            DrugsController.putDrugs = jest.fn().mockRejectedValueOnce('');
            const resp = await request(app).put(`${basePath}drugs/123`).send(requestTest);
            expect(resp.body.statusCode).toEqual(EHttpStatus.RunTimeError);
        });
    });

    describe('Test get drugs', () => {
        const responseTestSuccess: IResponse<IDrugs.IResponseDrugs> = {
            statusCode: 200,
            message: 'success',
            payload: {
                id: 123,
                name: 'adrenalina',
                approved: true,
                min_dose: 123,
                max_dose: 123,
                avaliable_at: new Date,
            },
        };
        test('should return a success get a drugs', async () => {
            DrugsController.getDrugs = jest.fn().mockReturnValue(responseTestSuccess);
            const resp = await request(app).get(`${basePath}drugs/123`);
            expect(resp.body.statusCode).toEqual(EHttpStatus.Success);
        });

        test('should return a error', async () => {
            DrugsController.getDrugs = jest.fn().mockRejectedValueOnce('');
            const resp = await request(app).get(`${basePath}drugs/123`);
            expect(resp.body.statusCode).toEqual(EHttpStatus.RunTimeError);
        });
    });

    describe('Test delete drugs', () => {
        const responseTestSuccess: IResponse<IDrugs.IResponseDrugs> = {
            statusCode: 200,
            message: 'success',
            payload: {
                id: 123,
                name: 'adrenalina',
                approved: true,
                min_dose: 123,
                max_dose: 123,
                avaliable_at: new Date,
            },
        };
        test('should return a success get a drugs', async () => {
            DrugsController.deleteDrugs = jest.fn().mockReturnValue(responseTestSuccess);
            const resp = await request(app).delete(`${basePath}drugs/123`);
            expect(resp.body.statusCode).toEqual(EHttpStatus.Success);
        });

        test('should return a error', async () => {
            DrugsController.deleteDrugs = jest.fn().mockRejectedValueOnce('');
            const resp = await request(app).delete(`${basePath}drugs/123`);
            expect(resp.body.statusCode).toEqual(EHttpStatus.RunTimeError);
        });
    });
});
