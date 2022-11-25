import { RulesEntity } from '@domains/drugs/entity/RulesEntity';
import { IVaccination } from '../interface/IVaccination';

/**
 * class Vaccination Services 
 */
export class VaccinationServices {
    /**
     * Post Vaccination
     * @param {IVaccination.IRequestVaccination} vaccionationRequest
     * @return {Promise<IVaccination.IResponseVaccination | null>}
     */
    public static async postVaccination(vaccionationRequest: IVaccination.IRequestVaccination): Promise<IVaccination.IResponseVaccination | null> {
        return await RulesEntity.findOne({ type: type }).then(function (doc) {
            if (!doc) return null;
            return doc;
        });
    }

    /**
     * Put Vaccination
     * @param {IVaccination.IRequestVaccination} vaccionationRequest
     * @return {Promise<IVaccination.IResponseVaccination | null>}
     */
    public static async putVaccination(vaccionationRequest: IVaccination.IRequestVaccination): Promise<IVaccination.IResponseVaccination | null> {
        return await RulesEntity.findOne({ type: type }).then(function (doc) {
            if (!doc) return null;
            return doc;
        });
    }
}
