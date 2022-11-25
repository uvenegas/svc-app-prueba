module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^jose/(.*)$': '<rootDir>/node_modules/jose/dist/node/cjs/$1',
    },
    verbose: true,
    clearMocks: true,
    collectCoverage: true,
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    coverageThreshold: {
        global: {
            statements: 5,
            branches: 5,
            functions: 5,
            lines: 5,
        },
    },
    moduleNameMapper: {
        '^@initialSetup(.*)$': '<rootDir>/src/initialSetup$1',
        '^@config(.*)$': '<rootDir>/src/config$1',
        '^@infrastructure(.*)$': '<rootDir>/src/infrastructure$1',
        '^@domains(.*)$': '<rootDir>/src/domains$1',
        '^@environment(.*)$': '<rootDir>/src/environment$1',
        '^@modules(.*)$': '<rootDir>/src/modules$1',
        '^@msConfig(.*)$': '<rootDir>/src/MsConfig$1',
        '^@seeders(.*)$': '<rootDir>/src/seeders$1',
        '^@shared(.*)$': '<rootDir>/src/shared$1',
        '^@core(.*)$': '<rootDir>/src/core-node/infrastructure$1',
    },
};
