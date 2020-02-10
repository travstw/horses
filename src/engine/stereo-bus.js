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
            // set initial output level
            if (settings && !this.settings) {
                this.output.value = settings.song.outputLevel / 10;
            }
            this.settings = settings

            if (this.settings && this.settings.changed && this.settings.changed.type === 'outputLevel') {
                // TODO only apply settings if they actually changed...
                switch (this.settings.changed.field) {
                    case 'outputLevel':
                        const outputLevel = this.settings.song.outputLevel;
                        this.setOutputLevel(outputLevel);
                        break;
                    case 'outputReverbLevel':
                        const reverbLevel = this.settings.song.outputReverbLevel;
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
        AutomationService.exponentialRampToValueAtTime(this.reverbReturnLevel, 'gain', 0, 0.5);
        const oldReverb = this.reverb;
        this.reverb = reverb;
        const level = this.settings.song.outputReverbLevel;
        this.setReverbReturnLevel(level)
        this.input.connect(this.reverb.node);
        this.reverb.connect(this.reverbReturnLevel.node);
        this.reverbReturnLevel.connect(this.output.node);

        // disconnect old reverb node if it exists;
        if (oldReverb) {
            this.input.disconnect(oldReverb.node);
            oldReverb.disconnect(this.reverbReturnLevel.node);
        }


    }

    setReverbReturnLevel(level) {
        const amount = parseInt(level) / 100;

        console.log('verb', level, amount, amount * amount);
        this.reverbReturnLevel.value = amount * amount;
    }


    setOutputLevel(level) {
        const amount = parseInt(level) / 100;
        this.output.value = amount * amount;
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