/* eslint-disable @typescript-eslint/no-var-requires */
import { IDrugs } from '@domains/drugs/interface/IDrugs';

/**
 * class Drugs Services 
 */
export class DrugsServices {
    /**
     * Post Drugs
     * @param {IDrugs.IRequestDrugs} drugsRequest
     */
    public static async postDrugs(drugsRequest: IDrugs.IRequestDrugs){
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
            const res = await client.query('insert into drug(id, name, approved, min_dose, max_dose, avaliable_at) values(',
                drugsRequest.id,',',
                drugsRequest.name,',',
                drugsRequest.approved,',',
                drugsRequest.min_dose,',',
                drugsRequest.max_dose,',',
                drugsRequest.avaliable_at,')');
            console.log(res);
            await client.end();
        };

        connectDb();
    }

    /**
     * Put Drugs
     * @param {number} idDrugs
     * @param {IDrugs.IRequestDrugs} drugsRequest
     */
    public static async putDrugs(idDrugs: number, drugsRequest: IDrugs.IRequestDrugs){
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
            const res = await client.query('update drug set name=',drugsRequest.name,
                ', approved=',drugsRequest.approved,
                ', min_dose=',drugsRequest.min_dose,
                ', max_dose=',drugsRequest.max_dose,
                ', avaliable_at=',drugsRequest.avaliable_at,
                ' from drug where id=',idDrugs);
            console.log(res);
            await client.end();
        };

        connectDb();
    }

    /**
     * Get Drugs
     * @param {IDrugs.IRequestDrugs} drugsRequest
     */
    public static async getDrugs() {
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
            const res = await client.query('select * from drug');
            console.log(res);
            await client.end();
        };

        connectDb();
    }

    /**
     * Delete Drugs
     * @param {number} idDrugs
     */
    public static async deleteDrugs(idDrugs: number){
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
            const res = await client.query('delete from * FROM drug where id=',idDrugs);
            console.log(res);
            await client.end();
            return res;
        };
        connectDb();
    }
}
