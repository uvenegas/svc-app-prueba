import { RulesEntity } from '@domains/drugs/entity/RulesEntity';
import { IConditionEnginer } from '@domains/drugs/interface/IConditionEnginer';

/**
 * class Drugs Services 
 */
export class DrugsServices {
    /**
     * Get Config
     * @param {IDrugs.IRequestDrugs} drugsRequest
     * @return {Promise<IConditionEnginer>}
     */
    public static async postDrugs(drugsRequest: IDrugs.IRequestDrugs): Promise<IConditionEnginer.IRules | null> {
        return await RulesEntity.findOne({ type: type }).then(function (doc) {
            if (!doc) return null;
            return doc;
        });
    }
}
