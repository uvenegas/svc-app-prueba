/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
export namespace IVaccination {
    export interface IRequestVaccination {
        id: number;
        name: string;
        drug_id: boolean;
        dose: number;
        date: Date;
    }

    export interface IResponseVaccination {
        id: number;
        name: string;
        drug_id: boolean;
        dose: number;
        date: Date;
    }
}
