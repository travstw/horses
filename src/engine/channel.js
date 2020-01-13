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
        this.audio = opts.audio;
        this.name = opts.name;
        this.endedEvent$ = opts.endedEvent$;
        this.output = NodeFactory.createNode('gain', {context: this.context});
        this.nodes = [this.audio, ...opts.nodes, this.output];
        this.analyser = this.context.createAnalyser();
        this.startOffset = opts.startOffset;
        this.duration = opts.duration;
        this.fadeIn = opts.fadeIn;
        this.fadeOut = opts.fadeOut;

        // make sure audio is decoded before trying to play
        this.audio.audioReady().subscribe((ready) => {
            if (ready) {
                this.patchSignalChain();
                this.output.node.gain.setValueAtTime(0, 0);
                this.output.node.gain.linearRampToValueAtTime(.75, this.context.currentTime + this.fadeIn);
                this.output.node.gain.setTargetAtTime(0, this.duration - this.fadeOut, this.fadeOut / 3 );
                this.start(this.startOffset);
                this.stop(this.context.currentTime + this.duration);

                this.audio.ended().subscribe(() => this.endedEvent$.next(this.id));
            }
        });
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