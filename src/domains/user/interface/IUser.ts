/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
export namespace IUser {
    export interface IRequestUser {
        id: number;
        name: string;
        email: string;
        password: string;
    }

    export interface IRequestLogin {
        email: string;
        password: string;
    }

    export interface IResponseUser {
        id: number;
        name: string;
        email: string;
        password: string;
    }
}
