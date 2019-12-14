import { NodeFactory } from './nodes/node-factory.js';

export class Channel {
    context;
    audio;
    nodes = [];
    output;
    name;
    analyser;
    audioReady = false;

    /**
     * @param {context, audio, nodes, name} opts
     */
    constructor(opts) {
        this.context = opts.context;
        this.audio = opts.audio;
        this.name = opts.name;
        this.output = NodeFactory.createNode('gain', {context: this.context});
        this.nodes = [this.audio, ...opts.nodes, this.output];
        this.analyser = this.context.createAnalyser();

        this.patchSignalChain();

        // make sure audio is decoded before trying to play
        this.audio.audioReady().subscribe((ready) => this.audioReady = ready);
    }

    patchSignalChain() {
        console.log(this.nodes);
        for (let i = 0; i < this.nodes.length; i++) {
            if (i === 0) {
                continue;
            }
            this.nodes[i - 1].connect(this.nodes[i]);
        }
    }

    start(time = 0) {
        if (!this.audioReady) {
            return;
        }
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