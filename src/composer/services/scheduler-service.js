import { getRandomInteger } from '../../utils';
export class SchedulerService {

    constructor(scheduleEvent$, settings$) {
        this.scheduleEvent$ = scheduleEvent$;
        this.started = false;
        this.settings$ = settings$;

        this.settings$.subscribe(s => {
            // initial load
            if (!this.schedulers) {
                this.schedulers = s.song.trackTypes.map(tt => new Scheduler(tt.type, tt.density, tt.schedulerRange, this.scheduleEvent$));
            }
            // if density is changed after song is started, clear and recreate timers
            // for that type
            if (s.changed && this.started && s.changed.type === 'density') {
                const field = s.changed.field;
                const setting = s.song.trackTypes.find(tt => tt.type === field);
                this.schedulers
                    .filter(ss => ss.trackType === field)
                    .forEach(ts => {
                        console.log(ts);
                        ts.updateDensity(setting.density)
                    });
            }
        });

    }

    start(immediate) {
        console.log('scheduler started');
        this.started = true;
        this.active = true;
        this.schedulers.forEach((s) => {
            s.start(immediate);
        });
    }

    stop() {
        console.log('scheduler stopped');
        this.schedulers.forEach((s) => {
            s.stop();
        });

    }
}


class Scheduler {
    constructor(trackType, density, schedulerRange, scheduleEvent$) {
        this.trackType = trackType;
        this.density = density;
        this.schedulerRange = schedulerRange;
        this.scheduleEvent$ = scheduleEvent$;
        this.timers = [];
        this.active = false;
    }

    schedule(immediate) {
        // in free mode, the first schedulers should start immediately
        console.log('scheduled');
        const duration = immediate ? 0 : getRandomInteger(this.schedulerRange[0], this.schedulerRange[1]);
        const timer = setTimeout(() => {
            this.scheduleEvent$.next(this.trackType);
            this.timers = this.timers.reduce((timers, t) => {
                if (t === timer) {
                    return timers;
                }
                timers.push(t);
                return timers;
            }, []);
            this.schedule();
        }, duration * 1000);  // convert seconds into ms
        this.timers.push(timer);
    }

    start(immediate) {
        for (let i = 0; i < this.density; i++) {
            this.schedule(immediate);
        }

        this.active = true;
    }

    stop() {
        this.timers.forEach((t) => clearTimeout(t));
        this.timers = [];
        this.active = false;
    }

    updateDensity(density) {
        this.density = density;
        this.refreshTimers();
    }

    refreshTimers() {
        // clear timers and create new ones with the new density value
        this.stop();
        this.start();
    }
}