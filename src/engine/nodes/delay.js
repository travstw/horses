
export class Delay {
    context;
    delay;
    feedback;
    lpfNode;
    node;
    feedbackNode;

    constructor(opts) {
        this.context = opts.context;
        this.node = this.context.createDelay();
        this.feedbackNode = this.context.createGain();
        this.lpfNode = this.context.createBiquadfilter();

        this.delay = opts.delay;
        this.node.delayTime.value = this.delay;
        this.feedback = opts.feedback || 0.30;
        this.feedbackNode.gain.value = this.feedback;
        this.lpfNode.frequency.value = opts.lfp || 5000;

        this.node.connect(this.feedbackNode);
        this.feedbackNode.connect(this.lpfNode);
        this.lpfNode.connect(this.node);

    }

    connect(output) {
        this.node.connect(output.node);
    }

    getAudioParams() {
        return {
            delay: {
                delay: this.node.delayTime,
                feedback: this.feedbackNode.gain,
                lpf: this.lpfNode.frequency
            }
        }
    }
}