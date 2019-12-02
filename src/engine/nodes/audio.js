
export class Audio {
    context;
    decodedBuffer;
    node;
    isReady = false;

    /**
     * Creates Audio node
     * @param {context, rawBuffer, params} opts
     */
    constructor(opts) {
        console.log(opts);
        this.context = opts.context;
        this.type = 'audio';

        this.context.decodeAudioData(opts.buffer).then(buffer => {
            this.decodedBuffer = buffer;
            this.createSourceNode(opts.params);
        });
    }

    createSourceNode(params = {}) {
        this.node = this.context.createBufferSource();
        this.node.buffer = this.decodedBuffer;
        this.node.loop = params.loop || false;
        this.isReady = true;
    }

    connect(output) {
        this.node.connect(output.node);
    }

    subscribeToEnd(callback) {
        this.node.onended = (event) => {
            callback(event);
        };
    }

    start(time) {
        // buffer isn't decoded yet... don't try to play
        if (!this.isReady) {
            return;
        }

        this.node.start(time || 0);
    }

    stop(time) {
        this.node.stop(time || 0);
    }

    getAudioParams() {
        return {
            audio : {
                detune: this.node.detune,
                playbackRate: this.node.playbackRate
            }
        };
    }
}