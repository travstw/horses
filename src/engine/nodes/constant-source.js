export class ConstantSource {
    constructor(opts) {
        this.context = opts.context;
        // Always default to 0, so use constructor instead of context factory
        this.node = new ConstantSourceNode(this.context, { offset: 0.0 });
    }

    get value() {
        return this.node.offset.value;
    }

    connect(output) {
        this.node.connect(output);
    }

    disconnect(output) {
        this.node.disconnect(output);
    }

    start(time = 0) {
        this.node.start(time);
    }

    stop(time = 0) {
        this.node.stop(time);
    }


    getAllAudioParams() {
        return {
            constantSource: {
                offset: this.node.offset
            }
        };
    }

    getAudioParam(param) {
        // Even though there is only one param, still use the arg as a key in case it's the wrong value.
        // Caller handles undefined.
        return {
            offset: this.node.offset
        }[param];
    }

}