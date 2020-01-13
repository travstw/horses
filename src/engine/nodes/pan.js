
export class Pan {
    // context;
    // node;

    constructor(opts) {
        this.context = opts.context;
        this.node = this.context.createStereoPanner();
    }

    connect(output) {
        this.node.connect(output);
    }

    getAudioParams() {
        return {
            pan: {
                pan: this.node.pan,
            }
        }
    }
}