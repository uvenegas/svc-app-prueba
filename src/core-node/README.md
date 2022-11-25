# core-node SB Ecommerce

Infrastructure project to be used as git submodules in SBPay projects

### Basic Information

-   Version Node v14.15.5
-   [Acuerdos de Desarrollo](https://bitbucket.org/matikard/api-sbe-backend/wiki/Home)

### Set Up

-   Install node v14.15.5 using nvm (recommended)
-   Run in terminal `npm i`
-   run in terminal `npm run tsc`

## Using Git Submodule

To use this project with git submodule, the following commands must be run:

```
git submodule add git@bitbucket.org:matikard/core-node.git src/core-node

git submodule update --remote --recursive

npm i
```

### Recomended

-   Install NVM to handle multiple node environments.
-   Install the required node version with NVM and start the project.
