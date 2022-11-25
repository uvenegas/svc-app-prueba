/* eslint-disable @typescript-eslint/no-explicit-any */
import { EHttpStatus } from '../../enums/EHttpStatus';
import { awsHandler } from './awsHandler';

describe('awsHandler TEST', () => {
    it('handleSuccess exitoso', () => {
        const mockResponse: any = jest.fn().mockImplementation((res: any, data: any) => {
            return { ...data };
        });
        const instanceOfFunction = awsHandler(undefined, EHttpStatus.Success, 'Success', mockResponse);
        expect(instanceOfFunction.statusCode).toEqual(200);
    });
});
