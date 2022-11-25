import { DrugsServices } from '@domains/drugs/service/DrugsServices';
import { IDrugs } from '@domains/drugs/interface/IDrugs';

/**
 * Class Drugs Controller
 */
export class DrugsController {
    /**
     * Post Drugs
     * @param {IDrugs.IRequestDrugs} drugsRequest
     * @return {Promise<IDrugs.IResponseDrugs>}
     */
    public static async postDrugs(drugsRequest: IDrugs.IRequestDrugs): Promise<IDrugs.IResponseDrugs> {
        const drugs = await DrugsServices.postDrugs(drugsRequest);

        return drugs;
    }

    /**
     * Put Drugs
     * @param {number} idVaccination
     * @param {IDrugs.IRequestDrugs} drugsRequest
     * @return {Promise<IDrugs.IResponseDrugs>}
     */
    public static async putDrugs(idVaccination: number, drugsRequest: IDrugs.IRequestDrugs): Promise<IDrugs.IResponseDrugs> {
        const drugs = await DrugsServices.putDrugs(drugsRequest);

        return drugs;
    }

    /**
     * Get Drugs
     * @return {Promise<IDrugs.IResponseDrugs>}
     */
    public static async getDrugs(): Promise<IDrugs.IResponseDrugs> {
        const drugs = await DrugsServices.getDrugs();

        return drugs;
    }

    /**
     * Delete Drugs
     * @param {number} idDrugs
     * @return {Promise<IDrugs.IResponseDrugs>}
     */
    public static async deleteDrugs(idDrugs: number): Promise<IDrugs.IResponseDrugs> {
        const drugs = await DrugsServices.deleteDrugs(idDrugs);

        return drugs;
    }
}
