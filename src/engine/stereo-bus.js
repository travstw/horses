
export class StereoBus {
    // context;
    // input;
    // stereoOut;
    // nodes;

    /**
     * @param {context} opts
     */
    constructor(opts) {
        this.context = opts.context;
        this.input = this.context.createGain();
        this.output = this.context.createGain();
        this.nodes = [this.input, ...opts.nodes || [], this.output];

        this.patchSignalChain();
    }

    patchSignalChain() {
        for (let i = 0; i < this.nodes.length; i++) {
            if (i === 0) {
                continue;
            }
            this.nodes[i - 1].connect(this.nodes[i]);
        }

        this.output.connect(this.context.destination);
    }

    connect(node) {
        node.connect(this.input);
    }

    disconnect(node) {
        node.disconnect(this.input);
    }

    getOutputAudioParams() {
        return this.nodes.reduce((params, node) => {
            const nodeParams = node.getAudioParms();
            Object.assign(params, nodeParams);
            return params;
        }, {});
    }
}