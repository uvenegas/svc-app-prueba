/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
export namespace IDrugs {
    export interface IRequestDrugs {
        id: number;
        name: string;
        approved: boolean;
        min_dose: number;
        max_dose: number;
        avaliable_at: Date;
    }

    export interface IResponseDrugs {
        id: number;
        name: string;
        approved: boolean;
        min_dose: number;
        max_dose: number;
        avaliable_at: Date;
    }
}
