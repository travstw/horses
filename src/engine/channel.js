import * as uuid from 'uuid/v1';
import { NodeFactory } from './nodes/node-factory.js';

export class Channel {
    // context;
    // audio;
    // nodes = [];
    // output;
    // name;
    // analyser;

    /**
     * @param {context, audio, nodes, name} opts
     */
    constructor(opts) {
        this.id = uuid();
        this.context = opts.context;
        this.logger = opts.logger;
        this.audio = opts.audio;
        this.name = opts.name;
        this.endedEvent$ = opts.endedEvent$;
        this.output = NodeFactory.createNode('gain', {context: this.context});
        this.nodes = [this.audio, ...opts.nodes, this.output];
        this.analyser = this.context.createAnalyser();
        this.drift = opts.drift;
        this.secondsPerMeasure = opts.secondsPerMeasure;
        this.startMeasureOffset = opts.startMeasureOffset;
        this.duration = opts.duration;
        this.fadeIn = opts.fadeIn;
        this.fadeOut = opts.fadeOut;

        // make sure audio is decoded before trying to play
        this.audio.audioReady().subscribe((ready) => {
            if (ready) {
                this.patchSignalChain();
                this.output.node.gain.setValueAtTime(0, this.context.currentTime);

                const startTime = this.calculateStartOffset(this.startMeasureOffset, this.drift);

                this.start(startTime);
                this.output.node.gain.linearRampToValueAtTime(1.0, startTime + this.drift + this.fadeIn);

                if (this.duration) {
                    this.output.node.gain.setTargetAtTime(0, startTime + (this.duration - this.fadeOut),
                    this.fadeOut / 3 );
                }

                // Only set a stop point if there's a duration... otherwise play forever
                if (this.duration) {
                    this.stop(startTime + this.drift + this.duration);
                }


                this.audio.ended().subscribe(() => {
                    this.audio = null;
                    this.endedEvent$.next(this.id);
                });
            }
        });
    }

    calculateStartOffset(offset = 1, drift = 0) {

        let startOffset;
        if (offset) {
            startOffset = (this.secondsPerMeasure * 4.0) * offset;
        } else {
            startOffset = (this.secondsPerMeasure * 4.0);
        }

        let startTime;

        // context has been running for less time than 4 measures
        if (this.context.currentTime < startOffset) {
            startTime = startOffset;
            console.log(this.name, Math.floor(startTime/ (this.secondsPerMeasure * 4)));
        } else {
            const nextMeasure = Math.floor(this.context.currentTime / startOffset) + 1;
            startTime = nextMeasure * startOffset;
            console.log(this.name, nextMeasure);
        }

        // this.logger.log(`Track '${this.name}' scheduled to start in ${startTime.toFixed(4)} seconds`);

        return startTime;

    }

    playing() {}

    patchSignalChain() {
        for (let i = 0; i < this.nodes.length; i++) {
            if (i === 0) {
                continue;
            }
            this.nodes[i - 1].connect(this.nodes[i]);
        }
    }

    start(time = 0) {
        this.audio.start(time);
    }

    stop(time = 0) {
        this.audio.stop(time);
    }

    getChannelAudioParams() {
        return this.nodes.reduce((params, node) => {
            const nodeParams = node.getAudioParams();
            Object.assign(params, nodeParams);
            return params;
        }, {});
    }
}