import { ThrowError } from 'src/core-node/infrastructure/providers/ErrorHandling/ThrowError';
import { ConfigServices } from '@domains/drugs/service/DrugsServices';
import { IConditionEnginer } from '@domains/drugs/interface/IConditionEnginer';
import { ConfigController } from '@domains/drugs/controller/DrugsController';
import { IConditionEnginerResponse } from '@domains/drugs/interface/IConditionEnginerResponse';

describe('Test Get  Document  Dec5', () => {
    const responseGetTest: IConditionEnginer.IRules = {
        type: 'modal-update',
        platforms: [
            {
                name: 'ios',
                all: {
                    fact: 'versionApp',
                    operator: 'lessThan',
                    value: 400,
                },
                metadata: {
                    isOptional: true,
                },
            },
        ],
    };

    const responseGetErrorNoPlatformsTest: unknown = {
        type: 'moda-update',
    };

    const responseServiceTest: IConditionEnginerResponse.IResponseEnginer = {
        valid: true,
        metadata: {
            isOptional: true,
        },
    };

    test('Get configApp - Success', async () => {
        ConfigServices.getConfigApp = jest.fn().mockReturnValueOnce(responseGetTest);
        const resp = await ConfigController.getConfigApp('ios', 'modal-update', '3.0.0');
        expect(resp).toStrictEqual(responseServiceTest);
    });

    test('Get configApp - noContent', async () => {
        const spy = jest.spyOn(ThrowError, 'noContent');

        ConfigServices.getConfigApp = jest.fn().mockResolvedValue(responseGetErrorNoPlatformsTest);
        await ConfigController.getConfigApp('ios', 'modal-update', '3.0.0').catch(() => {
            expect(spy).toEqual(ThrowError.noContent);
        });
    });
});
