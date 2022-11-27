import { IUser } from '@domains/user/interface/IUser';
import { UserServices } from '@domains/user/service/UserServices';

/**
 * Class User Controller
 */
export class UserController {
    /**
     * Post User
     * @param {IUser.IRequestUser} userRequest
     */
    public static async postUser(userRequest: IUser.IRequestUser){
        const user = await UserServices.postUser(userRequest);

        return user;
    }

    /**
     * Post Login
     * @param {IUser.IRequestLogin} loginRequest
     */
    public static async loginUser(loginRequest: IUser.IRequestLogin){
        const login = await UserServices.postLogin(loginRequest);

        return login;
    }
}
