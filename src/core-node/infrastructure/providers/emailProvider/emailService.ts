import mailjetLibrary, { Email, ConnectOptions, ConfigOptions } from 'node-mailjet';
import { IEmailDataToSend } from './interface/IEmailDataToSend';

const CONST_MJ_APIKEY_PUBLIC = 'aefb0126202a69822a47d74620c6db8a';
const CONST_MJ_APIKEY_SECRET = '3c6cb5492aa9d4c9515e038f39f8b1f8';
const CONST_EMAIL_SERVICE_CONFIG: {
    action: string;
    options: ConfigOptions;
} = {
    action: 'send',
    options: {
        version: 'v3.1',
    },
};

export const sendEmail = async (emailDataToSend: IEmailDataToSend, connectOptions?: ConnectOptions): Promise<Email.PostResponseData> => {
    const mailjet = mailjetLibrary.connect(CONST_MJ_APIKEY_PUBLIC, CONST_MJ_APIKEY_SECRET, connectOptions);
    const mailJetRequest: Email.PostResource = mailjet.post(CONST_EMAIL_SERVICE_CONFIG.action, CONST_EMAIL_SERVICE_CONFIG.options);
    const mailJetResponse = await mailJetRequest.request(emailDataToSend.sendParams);
    return mailJetResponse.body;
};
