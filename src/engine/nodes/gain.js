
export class Gain {
    // context;
    // node;

    constructor(opts) {
        this.context = opts.context;
        this.node = this.context.createGain();
    }

    get gain() {
        return this.node.gain;
    }

    connect(output) {
        this.node.connect(output);
    }

    getAudioParams() {
        return {
            gain: {
                gain: this.node.gain,
            }
        }
    }
}