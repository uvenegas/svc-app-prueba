import { IUser } from '@domains/user/interface/IUser';
import { UserServices } from '@domains/user/service/UserServices';

/**
 * Class User Controller
 */
export class UserController {
    /**
     * Post Drugs
     * @param {IUser.IRequestUser} userRequest
     * @return {Promise<IDrugs.IResponseDrugs>}
     */
    public static async postUser(userRequest: IUser.IRequestUser): Promise<IUser.IResponseUser> {
        const user = await UserServices.postDrugs(userRequest);

        return user;
    }

    /**
     * Post Drugs
     * @param {IUser.IRequestUser} loginRequest
     * @return {Promise<IDrugs.IResponseDrugs>}
     */
    public static async loginUser(loginRequest: IUser.IRequestUser): Promise<IUser.IResponseUser> {
        const login = await UserServices.postDrugs(loginRequest);

        return login;
    }
}
