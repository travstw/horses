import { BehaviorSubject } from "rxjs";

export class Convolver {
    constructor(opts) {
        this.context = opts.context;
        this.node = this.context.createConvolver();
        this.type = 'convolver';
        this.ready$ = new BehaviorSubject(false);

        this.context.decodeAudioData(opts.buffer).then(buffer => {
            this.node.buffer = buffer;
            this.ready$.next(true);
        });
    }

    connect(output) {
        this.node.connect(output);
    }

    disconnect(output) {
        this.node.disconnect(output);
    }

    ready() {
        return this.ready$;
    }
}