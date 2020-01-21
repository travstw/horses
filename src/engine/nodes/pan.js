
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

    disconnect(output) {
        this.node.disconnect(output);
    }

    getAllAudioParams() {
        return {
            pan: {
                pan: this.node.pan,
            }
        }
    }

    getAudioParam(param) {
        return {
            pan: this.node.pan,
        }[param];
    }
}