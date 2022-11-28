/* eslint-disable camelcase */
/**
 * DTO Vaccination Request
 */
export class VaccinationRequest {
    id: number;
    name: string;
    drug_id: number;
    dose: number;
    date: string;
}