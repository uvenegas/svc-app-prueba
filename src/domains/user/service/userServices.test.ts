import { IResponse } from '@core/interfaces/IResponse';
import { IUser } from '@domains/user/interface/IUser';
import { UserServices } from '@domains/user/service/UserServices';

describe('Test User Service', () => {
    it('post user - Success', async () => {
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
        
        const response = await UserServices.postUser(requestTest);
        expect(response);
    });

    it('login user - Success', async () => {
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
        
        const response = await UserServices.loginUser(requestTest);
        expect(response);
    });
});
