
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

    disconnect(output) {
        this.node.disconnect(output);
    }

    getAllAudioParams() {
        return {
            gain: {
                gain: this.node.gain,
            }
        }
    }

    getAudioParam(param) {
        // Even though there is only one param, still use the arg as a key in case it's the wrong value.
        // Caller handles undefined.
        return {
            gain: this.node.gain,
        }[param]
    }
}