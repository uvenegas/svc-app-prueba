/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '@domains/user/controller/UserController';
import { EHttpStatus } from '@core/enums/EHttpStatus';
import request from 'supertest';
import bodyParser from 'body-parser';
import { UserRoutes } from '@domains/user/route';
import { IResponse } from '@core/interfaces/IResponse';
import { IUser } from '@domains/user/interface/IUser';

const app = express();
app.use(bodyParser.json());
app.use('', UserRoutes);
const basePath = '/';

describe('Test user controller', () => {
    describe('Test post user', () => {
        const requestTest: IUser.IRequestUser = {
            id: 123,
            name: 'adrenalina',
            email: 'hola@gmail.com',
            password: '123',
        };

        const responseTestSuccess: IResponse<IUser.IResponseUser> = {
            statusCode: 200,
            message: 'success',
            payload: {
                id: 123,
                name: 'adrenalina',
                email: 'hola@gmail.com',
                password: '123'
            },
        };
        test('should return a success post a user', async () => {
            UserController.postUser = jest.fn().mockReturnValue(responseTestSuccess);
            const resp = await request(app).post(`${basePath}signup`).send(requestTest);
            expect(resp.body.statusCode).toEqual(EHttpStatus.Success);
        });

        test('should return a error', async () => {
            UserController.postUser = jest.fn().mockRejectedValueOnce('');
            const resp = await request(app).post(`${basePath}signup`).send(requestTest);
            expect(resp.body.statusCode).toEqual(EHttpStatus.RunTimeError);
        });
    });

    describe('Test post login', () => {
        const requestTest: IUser.IRequestLogin = {
            email: 'hola@gmail.com',
            password: '123',
        };

        const responseTestSuccess: IResponse<IUser.IResponseUser> = {
            statusCode: 200,
            message: 'success',
            payload: {
                id: 123,
                name: 'adrenalina',
                email: 'hola@gmail.com',
                password: '123'
            },
        };
        test('should return a success post a login', async () => {
            UserController.loginUser = jest.fn().mockReturnValue(responseTestSuccess);
            const resp = await request(app).post(`${basePath}login`).send(requestTest);
            expect(resp.body.statusCode).toEqual(EHttpStatus.Success);
        });

        test('should return a error', async () => {
            UserController.loginUser = jest.fn().mockRejectedValueOnce('');
            const resp = await request(app).post(`${basePath}login`).send(requestTest);
            expect(resp.body.statusCode).toEqual(EHttpStatus.RunTimeError);
        });
    });
});
