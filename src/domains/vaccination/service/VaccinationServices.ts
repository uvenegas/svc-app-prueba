/* eslint-disable @typescript-eslint/no-var-requires */
import { IVaccination } from '@domains/vaccination/interface/IVaccination';

/**
 * class Vaccination Services 
 */
export class VaccinationServices {
    /**
     * Post Vaccination
     * @param {IVaccination.IRequestVaccination} vaccinationRequest
     */
    public static async postVaccination(vaccinationRequest: IVaccination.IRequestVaccination){
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
            const res = await client.query('insert into vaccination(id, name, drug_id, dose, date) values(',
                vaccinationRequest.id,',',
                vaccinationRequest.name,',',
                vaccinationRequest.drug_id,',',
                vaccinationRequest.dose,',',
                vaccinationRequest.date,')');
            console.log(res);
            await client.end();
        };

        connectDb();
    }

    /**
     * Put Vaccination
     * @param {number} idVaccination
     * @param {IVaccination.IRequestVaccination} vaccinationRequest
     */
    public static async putVaccination(idVaccination: number, vaccinationRequest: IVaccination.IRequestVaccination){
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
            const res = await client.query('update vaccination set name=',vaccinationRequest.name,
                ', drug_id=',vaccinationRequest.drug_id,
                ', dose=',vaccinationRequest.dose,
                ', date=',vaccinationRequest.date,
                ' * FROM vaccination where id=',idVaccination);
            console.log(res);
            await client.end();
        };

        connectDb();
    }

    /**
     * Get Vaccination
     * @param {IVaccination.IRequestVaccination} vaccinationRequest
     */
    public static async getVaccination() {
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
            const res = await client.query('select * from vaccination');
            console.log(res);
            await client.end();
        };

        connectDb();
    }

    /**
     * Delete Vaccination
     * @param {number} idVaccination
     */
    public static async deleteVaccination(idVaccination: number){
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
            const res = await client.query('delete from * FROM vaccination where id=',idVaccination);
            console.log(res);
            await client.end();
            return res;
        };
        connectDb();
    }
}
