import { RulesEntity } from '@domains/drugs/entity/RulesEntity';
import { IConditionEnginer } from '@domains/drugs/interface/IConditionEnginer';
import { IUser } from '@domains/user/interface/IUser';

/**
 * class User Services 
 */
export class UserServices {
    /**
     * Get Config
     * @param {IDrugs.IRequestDrugs} drugsRequest
     * @return {Promise<IConditionEnginer>}
     */
    public static async postDrugs(drugsRequest: IUser.IRequestUser): Promise<IConditionEnginer.IRules | null> {
        return await RulesEntity.findOne({ type: type }).then(function (doc) {
            if (!doc) return null;
            return doc;
        });
    }
}
