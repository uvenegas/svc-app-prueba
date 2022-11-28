import { VaccinationServices } from '@domains/vaccination/service/VaccinationServices';
import { VaccinationController } from '@domains/vaccination/controller/VaccinationController';
import { IVaccination } from '@domains/vaccination/interface/IVaccination';
import { IResponse } from '@core/interfaces/IResponse';

describe('Test vaccination', () => {
    describe('Test vaccination', () => {
        const requestTest: IVaccination.IRequestVaccination = {
            id: 123,
            name: 'adrenalina',
            drug_id: true,
            dose: 123,
            date: new Date,
        };

        const responseTestSuccess: IResponse<IVaccination.IResponseVaccination> = {
            statusCode: 200,
            message: 'success',
            payload: {
                id: 123,
                name: 'adrenalina',
                drug_id: true,
                dose: 123,
                date: new Date,
            },
        };

        test('Post Vaccination - Success', async () => {
            VaccinationServices.postVaccination = jest.fn().mockReturnValueOnce(responseTestSuccess);
            const resp = await VaccinationController.postVaccination(requestTest);
            expect(resp).toStrictEqual(responseTestSuccess);
        });

        test('Put Vaccination - Success', async () => {
            VaccinationServices.putVaccination = jest.fn().mockReturnValueOnce(responseTestSuccess);
            const resp = await VaccinationController.putVaccination(123, requestTest);
            expect(resp).toStrictEqual(responseTestSuccess);
        });

        test('Get Vaccination - Success', async () => {
            VaccinationServices.getVaccination = jest.fn().mockReturnValueOnce(responseTestSuccess);
            const resp = await VaccinationController.getVaccination();
            expect(resp).toStrictEqual(responseTestSuccess);
        });

        test('Delete Vaccination - Success', async () => {
            VaccinationServices.deleteVaccination = jest.fn().mockReturnValueOnce(responseTestSuccess);
            const resp = await VaccinationController.deleteVaccination(123);
            expect(resp).toStrictEqual(responseTestSuccess);
        });
   
    });
});