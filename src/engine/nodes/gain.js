

export class Gain {
    context;
    node;

    constructor(opts) {
        this.context = opts.context;
        this.node = this.context.createGain();
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