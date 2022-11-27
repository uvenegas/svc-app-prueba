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
    public static async postDrugs(drugsRequest: IDrugs.IRequestDrugs){
        const drugs = await DrugsServices.postDrugs(drugsRequest);

        return drugs;
    }

    /**
     * Put Drugs
     * @param {number} idDrugs
     * @param {IDrugs.IRequestDrugs} drugsRequest
     * @return {Promise<IDrugs.IResponseDrugs>}
     */
    public static async putDrugs(idDrugs: number, drugsRequest: IDrugs.IRequestDrugs){
        const drugs = await DrugsServices.putDrugs(idDrugs, drugsRequest);

        return drugs;
    }

    /**
     * Get Drugs
     * @return {Promise<IDrugs.IResponseDrugs>}
     */
    public static async getDrugs() {
        const drugs = await DrugsServices.getDrugs();

        return drugs;
    }

    /**
     * Delete Drugs
     * @param {number} idDrugs
     * @return {Promise<IDrugs.IResponseDrugs>}
     */
    public static async deleteDrugs(idDrugs: number) {
        const drugs = await DrugsServices.deleteDrugs(idDrugs);

        return drugs;
    }
}
