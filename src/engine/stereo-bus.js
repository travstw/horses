import { NodeFactory } from './node-factory';
import { AutomationService } from '../composer/services/automation-service';
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
        this.settingsService = opts.settingsService;
        this.settings;
        this.input = NodeFactory.createNode('gain', { context: this.context});
        this.output = NodeFactory.createNode('gain', { context: this.context});
        this.reverb = opts.reverb;
        this.reverbReturnLevel = NodeFactory.createNode('gain', { context: this.context});
        this.nodes = [this.input, ...opts.nodes || [], this.output];

        this.patchSignalChain();

        this.settingsService.settings$.subscribe(settings => {
            this.settings = settings
            if (this.settings) {
                const outputLevel = this.settings.song.outputLevel;
                this.setOutputLevel(outputLevel);

                const reverbLevel = this.settings.song.outputReverbLevel;
                this.setReverbReturnLevel(outputLevel);
            }
        });

    }

    patchSignalChain() {
        for (let i = 0; i < this.nodes.length; i++) {
            if (i === 0) {
                continue;
            }
            this.nodes[i - 1].connect(this.nodes[i].node);
        }

        this.input.connect(this.reverb.node);
        this.reverb.connect(this.reverbReturnLevel.node);
        this.reverbReturnLevel.connect(this.output.node);

        this.connectDestination();
    }

    connectDestination() {
        this.output.node.connect(this.context.destination);
    }

    connect(node) {
        node.connect(this.input.node);
    }

    disconnect(node) {
        node.disconnect(this.input.node);
    }

    // defaults to .25 seconds so reverb can be adjusted without 'clicks' by user
    setReverbReturnLevel(level, time = 0.25) {
        const valueTime = this.context.currentTime + time;
        AutomationService.exponentialRampToValueAtTime(this.reverbReturnLevel, 'gain', level, valueTime);
    }

    // defaults to .25 seconds so reverb can be adjusted without 'clicks' by user
    setOutputLevel(level, time = 0.25) {
        const valueTime = this.context.currentTime + time;
        AutomationService.exponentialRampToValueAtTime(this.output, 'gain', level, valueTime);

    }

    getOutputAudioParams() {
        return this.nodes.reduce((params, node) => {
            const nodeParams = node.getAudioParams();
            Object.assign(params, nodeParams);
            return params;
        }, {});
    }
}