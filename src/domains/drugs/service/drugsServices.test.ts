import { IDrugs } from '@domains/drugs/interface/IDrugs';
import { DrugsServices } from '@domains/drugs/service/DrugsServices';

describe('Test Drugs Service', () => {
    it('post drug - Success', async () => {
        const requestTest: IDrugs.IRequestDrugs = {
            id: 123,
            name: 'adrenalina',
            approved: true,
            min_dose: 123,
            max_dose: 123,
            avaliable_at: new Date,
        };
        
        const response = await DrugsServices.postDrugs(requestTest);
        expect(response);
    });

    it('put drug - Success', async () => {
        const requestTest: IDrugs.IRequestDrugs = {
            id: 123,
            name: 'adrenalina',
            approved: true,
            min_dose: 123,
            max_dose: 123,
            avaliable_at: new Date,
        };
        
        const response = await DrugsServices.putDrugs(123, requestTest);
        expect(response);
    });

    it('get drug - Success', async () => {
        const response = await DrugsServices.getDrugs();
        expect(response);
    });

    it('delete drug - Success', async () => {
        const response = await DrugsServices.deleteDrugs(123);
        expect(response);
    });
});
