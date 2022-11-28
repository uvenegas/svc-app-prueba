import { UserServices } from '@domains/user/service/UserServices';
import { UserController } from '@domains/user/controller/UserController';
import { IUser } from '@domains/user/interface/IUser';
import { IResponse } from '@core/interfaces/IResponse';

describe('Test user', () => {
    describe('Test user', () => {
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

        test('Post User - Success', async () => {
            UserServices.postUser = jest.fn().mockReturnValueOnce(responseTestSuccess);
            const resp = await UserController.postUser(requestTest);
            expect(resp).toStrictEqual(responseTestSuccess);
        });

        test('Post Login - Success', async () => {
            UserServices.loginUser = jest.fn().mockReturnValueOnce(responseTestSuccess);
            const resp = await UserController.loginUser(requestTest);
            expect(resp).toStrictEqual(responseTestSuccess);
        });
   
    });
});