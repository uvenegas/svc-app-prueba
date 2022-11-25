import { Environment } from '../../Environment/Environment';
import { IOperations } from '@msConfig/interfaces/IOperations';
import { IIntegrations } from '@msConfig/interfaces/IIntegrations';
import { ISecrets } from '@msConfig/interfaces/ISecrets';
import { IDatabase } from '@msConfig/interfaces/IDatabase';

export interface IAppConfig {
    environment: Environment;
    projectName: string;
    rootPath: string;
    appPort: number;
    operations: IOperations;
    integrations: IIntegrations;
    database: IDatabase;
    secrets: ISecrets;
}
