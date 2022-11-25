/* eslint-disable max-len */
import { IVaccination } from '@domains/vaccination/interface/IVaccination';
import { VaccinationServices } from '@domains/vaccination/service/VaccinationServices';

/**
 * Class Vaccination Controller
 */
export class VaccinationController {
    /**
     * Post Vaccination
     * @param {IVaccination.IRequestVaccination} vaccinationRequest
     * @return {Promise<IVaccination.IResponseVaccination>}
     */
    public static async postVaccination(vaccinationRequest: IVaccination.IRequestVaccination): Promise<IVaccination.IResponseVaccination> {
        const vaccination = await VaccinationServices.postVaccination(vaccinationRequest);

        return vaccination;
    }

    /**
     * Put Vaccination
     * @param {number} idVaccination
     * @param {IVaccination.IRequestVaccination} vaccinationRequest
     * @return {Promise<IVaccination.IResponseVaccination>}
     */
    public static async putVaccination(idVaccination: number, vaccinationRequest: IVaccination.IRequestVaccination): Promise<IVaccination.IResponseVaccination> {
        const vaccination = await VaccinationServices.putVaccination(vaccinationRequest);

        return vaccination;
    }

    /**
     * Get Vaccination
     * @return {Promise<IVaccination.IResponseVaccination>}
     */
    public static async getVaccination(): Promise<IVaccination.IResponseVaccination> {
        const vaccination = await VaccinationServices.getVaccination();

        return vaccination;
    }

    /**
     * Delete Vaccination
     * @param {number} idVaccination
     * @return {Promise<IVaccination.IResponseVaccination>}
     */
    public static async deleteVaccination(idVaccination: number): Promise<IVaccination.IResponseVaccination> {
        const vaccination = await VaccinationServices.putVaccination(idVaccination);

        return vaccination;
    }
}
