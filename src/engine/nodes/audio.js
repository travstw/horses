import { BehaviorSubject, Subject } from 'rxjs';
export class Audio {
    // context;
    // decodedBuffer;
    // node;
    // isReady = false;
    // audioReady$ = new BehaviorSubject(false);
    // ended$ = new Subject();

    /**
     * Creates Audio node
     * @param {context, rawBuffer, params} opts
     */
    constructor(opts) {
        this.context = opts.context;
        this.type = 'audio';
        this.isReady = false;
        this.audioReady$ = new BehaviorSubject(false);
        this.ended$ = new Subject();

        this.context.decodeAudioData(opts.buffer).then(buffer => {
            this.decodedBuffer = buffer;
            this.createSourceNode(opts.params);
        });
    }

    createSourceNode(params = {}) {
        this.node = this.context.createBufferSource();
        this.node.buffer = this.decodedBuffer;
        this.node.loop = params.loop || true;
        this.isReady = true;
        this.audioReady$.next(true);
        this.node.onended = (event) => {
            this.ended$.next(true);
        };
    }

    connect(output) {
        console.log(output, this.node);
        this.node.connect(output.node);
    }

    ended() {
        return this.ended$;
    }

    start(time) {
        // buffer isn't decoded yet... don't try to play
        if (!this.isReady) {
            return;
        }

        this.node.start(time);
    }

    stop(time) {
        this.node.stop(time);
    }

    getAudioParams() {
        return {
            audio : {
                detune: this.node.detune,
                playbackRate: this.node.playbackRate
            }
        };
    }

    audioReady() {
        return this.audioReady$;
    }
}