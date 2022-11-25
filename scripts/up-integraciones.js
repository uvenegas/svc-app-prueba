// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process');

const tasks = ['up-dockers-integracion','up-business-partner', 'up-svc-transactions', 'up-svc-mdd', 'up-preaprobados', 'up-svc-risk'];

tasks.forEach((task) => {
    const cmd = exec(`npm run ${task}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`Failed to run the "${task}"`);
            console.log(error.stack);
        }
        console.log(`Child Process STDOUT: ${stdout}`);
        console.log(`Child Process STDERR: ${stderr}`);
    });

    cmd.stdout.on('data', (data) => {
        console.log(`[${task}]: ${data.toString()}`);
    });

    cmd.stderr.on('data', (data) => {
        console.error(`[${task}]: ${data.toString()}`);
    });
});
