/* eslint-disable @typescript-eslint/no-explicit-any */
import { MsConfig } from '@msConfig/MsConfig';
import Mongoose from 'mongoose';

/**
 * Mongo class Provider
 */
export class MongoDB {
    private connection: any;

    /**
     * Retorna la uri necesaria para la conexión a la base de datos
     * @return {string}
     */
    public getUri(): string {
        const {
            mongodb: { mongouri },
        } = MsConfig.config.database;
        const uriStringified = String(mongouri);
        return uriStringified;
    }

    /**
     * Crea la conexión con la base de datos
     * @return {Promise}
     */
    public async connect(): Promise<typeof Mongoose> {
        this.connection = await Mongoose.connect(this.getUri());
        return this.connection;
    }

    /**
     * Realiza la desconexión con la base de datos
     * @return {void}
     */
    public disconnect(): void {
        if (!this.connection) {
            return;
        }
        Mongoose.disconnect();
    }

    /**
     * Allows event listeners on database connection
     * @param {string|symbol} event  Event to listen
     * @param {function(...args: any[]): void} listener Handler function
     * @return {void}
     */
    public listenEvent(event: string | symbol, listener: (...args: any[]) => void): void {
        Mongoose.connection.on(event, listener);
    }
}
