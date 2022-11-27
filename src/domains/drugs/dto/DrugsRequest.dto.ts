/* eslint-disable camelcase */
/**
 * DTO Drugs Request
 */
export class DrugsRequest {
    id: number;
    name: string;
    approved: boolean;
    min_dose: number;
    max_dose: number;
    avaliable_at: string;
}