import { NodeFactory } from './node-factory';
import { AutomationService } from '../composer/services/automation-service';
import { ImpulseService } from '../composer/services/impulse-service';
export class StereoBus {
    // context;
    // input;
    // stereoOut;
    // nodes;

    /**
     * @param {context} opts
     */
    constructor(context, impulseService, settingsService, nodes = []) {
        this.context = context;
        this.impulseService = impulseService;
        this.settingsService = settingsService;
        this.settings;
        this.input = NodeFactory.createNode('gain', { context: this.context});
        this.output = NodeFactory.createNode('gain', { context: this.context});
        this.reverbReturnLevel = NodeFactory.createNode('gain', { context: this.context});
        this.nodes = [this.input, ...nodes, this.output];

        this.patchSignalChain();
        this.setReverb();

        this.settingsService.settings$.subscribe(settings => {
            this.settings = settings
            if (this.settings && this.settings.changed) {
                // TODO only apply settings if they actually changed...
                switch (this.settings.changed.field) {
                    case 'outputLevel':
                        const outputLevel = this.settings.song.outputLevel / 10;
                        this.setOutputLevel(outputLevel);
                        break;
                    case 'outputReverbLevel':
                        const reverbLevel = this.settings.song.outputReverbLevel / 10;
                        this.setReverbReturnLevel(reverbLevel);
                        break;
                    case 'selectedReverb':
                        this.setReverb(this.settings.song.selectedReverb);
                }
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

    async setReverb() {
        const impulse = this.settingsService.getSetting((settings) => {
            return settings['impulses'].find((i) => i.title === settings.song.selectedReverb);
        });

        if (!impulse) {
            return;
        }

        const reverb = await this.impulseService.getImpulse(impulse.filename);
        // fade out reverb before replacing it to avoid clicks
        this.setReverbReturnLevel(0.0, 0.1);
        const oldReverb = this.reverb;
        this.reverb = reverb;
        const level = this.settings.song.outputReverbLevel;
        this.setReverbReturnLevel(level, 0.5)
        this.input.connect(this.reverb.node);
        this.reverb.connect(this.reverbReturnLevel.node);
        this.reverbReturnLevel.connect(this.output.node);

        // disconnect old reverb node if it exists;
        if (oldReverb) {
            this.input.disconnect(oldReverb.node);
            oldReverb.disconnect(this.reverbReturnLevel.node);
        }


    }

    // defaults to .25 seconds so reverb can be adjusted without 'clicks' by user
    setReverbReturnLevel(level, time = 0.5) {
        const valueTime = this.context.currentTime + time;
        AutomationService.exponentialRampToValueAtTime(this.reverbReturnLevel, 'gain', level, valueTime);
    }

    // defaults to .25 seconds so level can be adjusted without 'clicks' by user
    setOutputLevel(level, time = 0.5) {
        const valueTime = this.context.currentTime + time;
        AutomationService.exponentialRampToValueAtTime(this.output, 'gain', level, valueTime);

    }

    cancelFadeOut() {
        AutomationService.cancelScheduledValues(this.output, 'gain', 0);
    }

    setFadeOut(time, duration) {
        // cancel current scheduled fade
       this.cancelFadeOut();

        const valueTime = this.context.currentTime + time;
        AutomationService.setTargetAtTime(this.output, 'gain', 0, valueTime, duration / 3);
    }

    getOutputAudioParams() {
        return this.nodes.reduce((params, node) => {
            const nodeParams = node.getAudioParams();
            Object.assign(params, nodeParams);
            return params;
        }, {});
    }
}