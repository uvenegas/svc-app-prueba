/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from './loggerConfig';

/**
 * A singleton that works as the default logger for the app
 */
class AppLogger {
    private static instance: AppLogger;

    /**
     * The instance getter.
     * @return {AppLogger} The app logger instance.
     */
    public static getInstance(): AppLogger {
        if (!AppLogger.instance) {
            AppLogger.instance = new AppLogger();
        }

        return AppLogger.instance;
    }

    /**
     * Logs an info message. Should be used when you want to inform about general things.
     * @param {any} message The message.
     * @param {...any[]} args Extra args.
     */
    public info(message: any, ...args: any[]) {
        logger.info(message, ...args);
    }

    /**
     * Logs an error message. Should be used when a non fatal a error or exception has appeared.
     * @param {any} message The message.
     * @param {...any[]} args Extra args.
     */
    public error(message: any, ...args: any[]) {
        logger.error(message, ...args);
    }

    /**
     * Logs a debug message. Should be used to log debug details such as events or calls.
     * @param {any} message The message.
     * @param {...any[]} args Extra args.
     */
    public debug(message: any, ...args: any[]) {
        logger.debug(message, ...args);
    }

    /**
     * Logs a warn message. Should be used when something unusual happened but isn't an error.
     * @param {any} message The message.
     * @param {...any[]} args Extra args.
     */
    public warn(message: any, ...args: any[]) {
        logger.warn(message, args);
    }
}

export const Logger = AppLogger.getInstance();
