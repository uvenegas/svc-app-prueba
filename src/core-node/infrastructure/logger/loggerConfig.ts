import { createLogger, format, Logger, transports } from 'winston';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';
import { AbstractConfigSet } from 'winston/lib/winston/config';

const { combine, timestamp, colorize, errors, label, printf, prettyPrint } = format;
const { Console } = transports;

const myCustomLevels: AbstractConfigSet = {
    levels: {
        debug: 3,
        info: 2,
        warn: 1,
        error: 0,
    },
    colors: {
        info: 'green',
        warn: 'yelllow',
        error: 'red',
        debug: 'blue',
    },
};

const consoleTransportOptions: ConsoleTransportOptions = {
    level: 'debug',
    format: combine(colorize(), colorize({ all: true })),
};
const consoleTransport: transports.ConsoleTransportInstance = new Console(consoleTransportOptions);

const logger: Logger = createLogger({
    levels: myCustomLevels.levels,
    format: combine(
        combine(
            label({ label: 'LOG' }),
            errors({ stack: true }),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
            prettyPrint(),
            printf(({ label, timestamp, level, message, stack }) => {
                if (level === 'error') {
                    return `[${label}] [${timestamp}] [${level.toUpperCase()}] : ${message ? message : 'ERROR'}\n${stack}\n`;
                } else {
                    return `[${label}] [${timestamp}] [${level.toUpperCase()}] : ${message ? message : 'ERROR'}\n`;
                }
            }),
        ),
    ),
    transports: [consoleTransport],
});

export default logger;
