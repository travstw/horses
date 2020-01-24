import * as uuid from 'uuid/v1';
import { AutomationService } from '../composer/services/automation-service';
import { NodeFactory } from './node-factory';

export class Channel {

    constructor(opts) {
        this.id = uuid();
        this.context = opts.context;
        this.logger = opts.logger;
        this.trackMetadata = opts.trackMetadata;
        this.audio = opts.audio;
        this.name = opts.name;
        this.endedEvent$ = opts.endedEvent$;
        this.output = NodeFactory.createNode('gain', {context: this.context});
        this.nodes = [this.audio, ...opts.nodes || [], this.output];
        this.analyser = this.context.createAnalyser();
        this.drift = opts.drift;
        this.secondsPerBeat = opts.secondsPerBeat;
        this.duration = opts.duration;
        this.fadeIn = opts.fadeIn;
        this.fadeOut = opts.fadeOut;
        this.automationService = opts.automationService;

        // make sure audio is decoded before trying to play
        this.audio.ready().subscribe((ready) => {
            if (ready) {
                this.patchSignalChain();
                AutomationService.setValueAtTime(this.output, 'gain', 0, this.context.currentTime);
                const startTime = this.calculateStartOffset();

                // console.log(this.name, startTime, this.context.currentTime);

                this.start(startTime + this.drift);
                AutomationService.linearRampToValueAtTime(this.output, 'gain', 0.75, startTime + this.drift + this.fadeIn);

                if (this.duration) {
                    AutomationService.setTargetAtTime(this.output, 'gain', 0, startTime + (this.duration - this.fadeOut),
                        this.fadeOut / 3);
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

    calculateStartOffset() {
        const offset = this.trackMetadata.startOffset || 0;
        const trackLength = this.trackMetadata.lengthInBeats;
        let playOffset = (this.secondsPerBeat * trackLength);
        let startTime;

        // context has been running for less time than 4 measures
        if (this.context.currentTime < playOffset) {
            startTime = playOffset +  (offset * this.secondsPerBeat);
        } else {
            const nextMeasure = Math.floor(this.context.currentTime / (this.secondsPerBeat * trackLength)) + 1;
            startTime = (nextMeasure * playOffset) + (offset * this.secondsPerBeat);
        }

        return startTime;
    }

    playing() {}

    patchSignalChain() {
        for (let i = 0; i < this.nodes.length; i++) {
            if (i === 0) {
                continue;
            }
            this.nodes[i - 1].connect(this.nodes[i].node);
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
            const nodeParams = node.getAllAudioParams();
            Object.assign(params, nodeParams);
            return params;
        }, {});
    }
}