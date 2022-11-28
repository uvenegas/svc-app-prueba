/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Router, Request, Response, NextFunction } from 'express';
import { VaccinationController } from '@domains/vaccination/controller/VaccinationController';
import { EHttpStatus } from '@core/enums/EHttpStatus';
import request from 'supertest';
import bodyParser from 'body-parser';
import { VaccinationRoutes } from '@domains/vaccination/route';
import { IResponse } from '@core/interfaces/IResponse';
import { IVaccination } from '@domains/vaccination/interface/IVaccination';

const app = express();
app.use(bodyParser.json());
app.use('', VaccinationRoutes);
const basePath = '/';

describe('Test vaccination controller', () => {
    describe('Test post vaccination', () => {
        const requestTest: IVaccination.IRequestVaccination = {
                id: 123,
                name: 'adrenalina',
                drug_id: 123,
                dose: 123,
                date: new Date,
        };

        const responseTestSuccess: IResponse<IVaccination.IResponseVaccination> = {
            statusCode: 200,
            message: 'success',
            payload: {
                id: 123,
                name: 'adrenalina',
                drug_id: 123,
                dose: 123,
                date: new Date,
            },
        };
        test('should return a success post a vaccination', async () => {
            VaccinationController.postVaccination = jest.fn().mockReturnValue(responseTestSuccess);
            const resp = await request(app).post(`${basePath}vaccination`).send(requestTest);
            expect(resp.body.statusCode).toEqual(EHttpStatus.Success);
        });

        test('should return a error', async () => {
            VaccinationController.postVaccination = jest.fn().mockRejectedValueOnce('');
            const resp = await request(app).post(`${basePath}vaccination`).send(requestTest);
            expect(resp.body.statusCode).toEqual(EHttpStatus.RunTimeError);
        });
    });

    describe('Test put vaccination', () => {
        const requestTest: IVaccination.IRequestVaccination = {
            id: 123,
            name: 'adrenalina',
            drug_id: 123,
            dose: 123,
            date: new Date,
    };

    const responseTestSuccess: IResponse<IVaccination.IResponseVaccination> = {
        statusCode: 200,
        message: 'success',
        payload: {
            id: 123,
            name: 'adrenalina',
            drug_id: 123,
            dose: 123,
            date: new Date,
        },
    };
        test('should return a success put a vaccination', async () => {
            VaccinationController.putVaccination = jest.fn().mockReturnValue(responseTestSuccess);
            const resp = await request(app).put(`${basePath}vaccination/123`).send(requestTest);
            expect(resp.body.statusCode).toEqual(EHttpStatus.Success);
        });

        test('should return a error', async () => {
            VaccinationController.putVaccination = jest.fn().mockRejectedValueOnce('');
            const resp = await request(app).put(`${basePath}vaccination/123`).send(requestTest);
            expect(resp.body.statusCode).toEqual(EHttpStatus.RunTimeError);
        });
    });

    describe('Test get vaccination', () => {
        const responseTestSuccess: IResponse<IVaccination.IResponseVaccination> = {
            statusCode: 200,
            message: 'success',
            payload: {
                id: 123,
                name: 'adrenalina',
                drug_id: 123,
                dose: 123,
                date: new Date,
            },
        };
        test('should return a success get a vaccination', async () => {
            VaccinationController.getVaccination = jest.fn().mockReturnValue(responseTestSuccess);
            const resp = await request(app).get(`${basePath}vaccination`);
            expect(resp.body.statusCode).toEqual(EHttpStatus.Success);
        });

        test('should return a error', async () => {
            VaccinationController.getVaccination = jest.fn().mockRejectedValueOnce('');
            const resp = await request(app).get(`${basePath}vaccination`);
            expect(resp.body.statusCode).toEqual(EHttpStatus.RunTimeError);
        });
    });

    describe('Test delete vaccination', () => {
        const responseTestSuccess: IResponse<IVaccination.IResponseVaccination> = {
            statusCode: 200,
            message: 'success',
            payload: {
                id: 123,
                name: 'adrenalina',
                drug_id: 123,
                dose: 123,
                date: new Date,
            },
        };
        test('should return a success get a vaccination', async () => {
            VaccinationController.deleteVaccination = jest.fn().mockReturnValue(responseTestSuccess);
            const resp = await request(app).delete(`${basePath}vaccination/123`);
            expect(resp.body.statusCode).toEqual(EHttpStatus.Success);
        });

        test('should return a error', async () => {
            VaccinationController.deleteVaccination = jest.fn().mockRejectedValueOnce('');
            const resp = await request(app).delete(`${basePath}vaccination/123`);
            expect(resp.body.statusCode).toEqual(EHttpStatus.RunTimeError);
        });
    });
});
