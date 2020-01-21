import { getRandomInteger } from '../../utils';
export class Scheduler {
    // active;
    // timers = [];
    // max;
    // min;
    // numTimers;
    // scheduleEvent$;

    constructor(numTimers, scheduleEvent$, max = 30000, min = 5000) {
        this.numTimers = numTimers;
        this.scheduleEvent$ = scheduleEvent$;
        this.max = max;
        this.min = min;
        this.timers = [];
    }

    schedule() {
        const duration = getRandomInteger(this.min, this.max);
        const timer = setTimeout(() => {
            this.scheduleEvent$.next(true);
            this.timers = this.timers.reduce((timers, t) => {
                if (t === timer) {
                    return timers;
                }
                timers.push(t);
                return timers;
            }, []);
            this.schedule();
        }, duration);
        this.timers.push(timer);
    }

    start() {
        console.log('scheduler started');
        this.active = true;
        for (let i = 0; i < this.numTimers; i++) {
            this.schedule();
        }
    }

    stop() {
        this.timers.forEach((t) => clearTimeout(t));
        this.active = false;
    }
}