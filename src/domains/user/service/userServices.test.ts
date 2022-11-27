import { ThrowError } from 'src/core-node/infrastructure/providers/ErrorHandling/ThrowError';
import { ConfigServices } from '@domains/drugs/service/DrugsServices';

describe('Test Get  Document  Dec5', () => {
    const responseServiceTest: unknown = [
        {
            all: [
                {
                    fact: 'versionApp',
                    operator: 'greaterThanInclusive',
                    value: 476,
                },
            ],
            isOptional: true,
        },
    ];

    const responseTest: any = [
        {
            all: [
                {
                    fact: 'versionApp',
                    operator: 'greaterThanInclusive',
                    value: 476,
                },
            ],
            isOptional: true,
        },
    ];

    test('Get configApp - Success', async () => {
        ConfigServices.getConfigApp = jest.fn().mockReturnValue(responseTest);
        const resp = await ConfigServices.getConfigApp('modal-update');
        expect(resp).toEqual(responseServiceTest);
    });
    test('Get configApp - Error', async () => {
        ConfigServices.getConfigApp = jest.fn().mockReturnValue('');
        const resp = await ConfigServices.getConfigApp('');
        expect(resp).toEqual('');
    });
});
