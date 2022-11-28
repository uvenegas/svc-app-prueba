import { IVaccination } from '@domains/vaccination/interface/IVaccination';
import { VaccinationServices } from '@domains/vaccination/service/VaccinationServices';

describe('Test Vaccination Service', () => {
    it('post vaccination - Success', async () => {
        const requestTest: IVaccination.IRequestVaccination = {
            id: 123,
            name: 'adrenalina',
            drug_id: true,
            dose: 123,
            date: new Date,
        };
        
        const response = await VaccinationServices.postVaccination(requestTest);
        expect(response);
    });

    it('put vaccination - Success', async () => {
        const requestTest: IVaccination.IRequestVaccination = {
            id: 123,
            name: 'adrenalina',
            drug_id: true,
            dose: 123,
            date: new Date,
        };
        
        const response = await VaccinationServices.putVaccination(123, requestTest);
        expect(response);
    });

    it('get vaccination - Success', async () => {
        const response = await VaccinationServices.getVaccination();
        expect(response);
    });

    it('delete vaccination - Success', async () => {
        const response = await VaccinationServices.deleteVaccination(123);
        expect(response);
    });
});
