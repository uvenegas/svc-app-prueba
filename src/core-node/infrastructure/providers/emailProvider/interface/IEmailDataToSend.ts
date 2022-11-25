import { Email } from 'node-mailjet';

export interface IEmailDataToSend {
    sendParams: Email.SendParams;
}
