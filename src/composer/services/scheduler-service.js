import { getRandomInteger } from '../../utils';
export class Scheduler {

    constructor(schedulers, scheduleEvent$, settings$) {
        this.schedulers = schedulers;
        this.scheduleEvent$ = scheduleEvent$;
        this.timers = [];
        this.density = 1;
        this.started = false;
        this.settings$ = settings$;

        this.settings$.subscribe(s => {
            this.density = s.song.density;

            // if density is changed after song is started, clear recreate timers
            if (s.changed && (s.changed === 'density') && this.started) {
                this.stop();
                this.start(true);
            }
        });

    }

    schedule(scheduler, immediate) {
        // in free mode, the first schedulers should start immediately

        const duration = immediate ? 0 : getRandomInteger(scheduler.range[0], scheduler.range[1]);
        const timer = setTimeout(() => {
            this.scheduleEvent$.next(scheduler.event);
            this.timers = this.timers.reduce((timers, t) => {
                if (t === timer) {
                    return timers;
                }
                timers.push(t);
                return timers;
            }, []);
            this.schedule(scheduler);
        }, duration * 1000);  // convert seconds into ms
        this.timers.push(timer);
    }

    start(immediate) {
        console.log('scheduler started');
        this.started = true;
        this.active = true;
        this.schedulers.forEach((s) => {
            for (let i = 0; i < this.density; i++) {
                this.schedule(s, immediate);
            }
        });
    }

    stop() {
        this.timers.forEach((t) => clearTimeout(t));
        this.timers = [];
        this.active = false;
    }
}