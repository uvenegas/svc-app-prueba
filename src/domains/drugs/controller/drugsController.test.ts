import { DrugsServices } from '@domains/drugs/service/DrugsServices';
import { DrugsController } from '@domains/drugs/controller/DrugsController';
import { IDrugs } from '@domains/drugs/interface/IDrugs';
import { IResponse } from '@core/interfaces/IResponse';

describe('Test drugs', () => {
    describe('Test drugs', () => {
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

        test('Post Drugs - Success', async () => {
            DrugsServices.postDrugs = jest.fn().mockReturnValueOnce(responseTestSuccess);
            const resp = await DrugsController.postDrugs(requestTest);
            expect(resp).toStrictEqual(responseTestSuccess);
        });

        test('Put Drugs - Success', async () => {
            DrugsServices.putDrugs = jest.fn().mockReturnValueOnce(responseTestSuccess);
            const resp = await DrugsController.putDrugs(123, requestTest);
            expect(resp).toStrictEqual(responseTestSuccess);
        });

        test('Get Drugs - Success', async () => {
            DrugsServices.getDrugs = jest.fn().mockReturnValueOnce(responseTestSuccess);
            const resp = await DrugsController.getDrugs();
            expect(resp).toStrictEqual(responseTestSuccess);
        });

        test('Delete Drugs - Success', async () => {
            DrugsServices.deleteDrugs = jest.fn().mockReturnValueOnce(responseTestSuccess);
            const resp = await DrugsController.deleteDrugs(123);
            expect(resp).toStrictEqual(responseTestSuccess);
        });
   
    });
});
