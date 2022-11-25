import moduleAlias from 'module-alias';

const dirName = __dirname;
const configFolderLocation = '/config';
const finalDirNameLocation = dirName.replace(configFolderLocation, '');

/**
 * Used to add aliases to project directories because there's no alias handling on JS
 */
moduleAlias.addAliases({
    '@initialSetup': `${finalDirNameLocation}/initialSetup`,
    '@config': `${finalDirNameLocation}/config`,
    '@infrastructure': `${finalDirNameLocation}/infrastructure`,
    '@domains': `${finalDirNameLocation}/domains`,
    '@environment': `${finalDirNameLocation}/environment`,
    '@modules': `${finalDirNameLocation}/modules`,
    '@msConfig': `${finalDirNameLocation}/MsConfig`,
    '@seeders': `${finalDirNameLocation}/seeders`,
    '@shared': `${finalDirNameLocation}/shared`,
    '@core': `${finalDirNameLocation}//core-node/infrastructure`,
});
