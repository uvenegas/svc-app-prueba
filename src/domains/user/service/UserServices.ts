/* eslint-disable @typescript-eslint/no-var-requires */
import { IUser } from '@domains/user/interface/IUser';

/**
 * class User Services 
 */
export class UserServices {
    /**
     * Post User
     * @param {IUser.IRequestUser} userRequest
     */
    public static async postUser(userRequest: IUser.IRequestUser){
        const { Client } = require('pg');
        const dotenv = require('dotenv');
        dotenv.config();

        const connectDb = async () => {
            const client = new Client({
                user: process.env.PGUSER,
                host: process.env.PGHOST,
                database: process.env.PGDATABASE,
                password: process.env.PGPASSWORD,
                port: process.env.PGPORT
            });

            await client.connect();
            const res = await client.query('insert into user(id, name, email, password) values(',
                userRequest.id,',',
                userRequest.name,',',
                userRequest.email,',',
                userRequest.password,')');
                
            console.log(res);
            await client.end();
        };

        connectDb();
    }

    /**
     * Post User
     * @param {IUser.IRequestLogin} loginRequest
     */
    public static async loginUser(loginRequest: IUser.IRequestLogin){
        const { Client } = require('pg');
        const dotenv = require('dotenv');
        dotenv.config();

        const connectDb = async () => {
            const client = new Client({
                user: process.env.PGUSER,
                host: process.env.PGHOST,
                database: process.env.PGDATABASE,
                password: process.env.PGPASSWORD,
                port: process.env.PGPORT
            });

            await client.connect();
            const res = await client.query('select email, password from user where email = ',loginRequest.email,' and', 'password = ',loginRequest.password);
                
            console.log(res);
            await client.end();
        };

        connectDb();
    }
}
