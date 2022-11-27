import { MsConfig } from '@msConfig/MsConfig';

const backend = {
    services: {},
};

const urlHealthServices = {
    drugs: {
        drugsHealth: `${MsConfig.config.rootPath}/check-balance/health`,
    },

    user: {
        userHealth: `${MsConfig.config.rootPath}/health`,
    },

    vaccination: {
        vaccinationHealth: `${MsConfig.config.rootPath}/health`,
    },
};

export { backend, urlHealthServices };
