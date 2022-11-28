import { MsConfig } from '@msConfig/MsConfig';

const backend = {
    services: {},
};

const urlHealthServices = {
    drugs: {
        drugsHealth: `${MsConfig.config.rootPath}/drugs/health`,
    },

    user: {
        userHealth: `${MsConfig.config.rootPath}/user/health`,
    },

    vaccination: {
        vaccinationHealth: `${MsConfig.config.rootPath}/vaccination/health`,
    },
};

export { backend, urlHealthServices };
