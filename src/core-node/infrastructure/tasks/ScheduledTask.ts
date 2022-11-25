/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as Scheduler from 'node-schedule';
import { Logger } from '../logger/Logger';

export abstract class ScheduledTask {
    /** The task name */
    public abstract name: string;
    private nexttimeHits = 10;
    /** A function that return the recurrence rule for the task */
    public abstract getRule(): Scheduler.RecurrenceRule;
    /** The task operation */

    public abstract task(): any;

    /**
     * Schedule the task with node schedule..
     */
    public start() {
        Logger.info(`Task \"${this.name}\" has been scheduled`);

        const rule: Scheduler.RecurrenceRule = this.getRule();

        Scheduler.scheduleJob(rule, async (fireDate: Date) => {
            Logger.info(fireDate + `Task \"${this.name}\" has been called`);

            try {
                await this.task();
            } catch (error) {
                Logger.error(error);
            }
        });

        this.logNextInvocations(this.nexttimeHits);
    }

    /**
     * Log the next task invocations according to given times.
     * @param {number} times the amount of calls quantity to log
     * @return {void} -
     */
    private logNextInvocations(times: number): void {
        const rule = this.getRule();
        let nextDate = new Date();
        let i = 1;

        Logger.info(`Task \"${this.name}\" next ${times} calls will be at`);
        while (i <= times) {
            nextDate = rule.nextInvocationDate(nextDate);

            Logger.info(`Task \"${this.name}\" Call ${i} - ${nextDate}`);
            i++;
        }
    }
}
