/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { Express, Request } from 'express';
import { IValidatedAT } from '../../domains/user/interface/IValidatedAT';
import { IValidateTPA } from '../../shared/utils/tokenManipulation/interface/IValidateTPA';
declare global {
    namespace Express {
        interface Request {
            apiATTokenVerified: IValidatedAT;
            apiTPATokenVerified: IValidateTPA;
        }
    }
}
