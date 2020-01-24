import { getJsonFile } from '../utils';
import { BehaviorSubject } from 'rxjs';

export class SettingsService {
    constructor() {
        this.settings;
        this.settings$ = new BehaviorSubject(undefined);

        this.settings$.subscribe((settings) => {
            this.settings = settings
        });
    }

    async fetchSettings() {
        try {
            const settings = await getJsonFile();

            // Find the default reverb and set it as selectedReverb
            const reverb = settings.impulses.find(i => i.default);
            settings.song.selectedReverb = reverb ? reverb.title : '';
            this.update(settings);
            this.initDom();
            return;
        } catch (e) {
            // throw new Error('Failed to fetch settings');
            console.error(e);
        }
    }

    // get a setting based on supplied filter
    getSetting(fn) {
        return fn(this.settings);
    }

    update(settings) {
        this.settings = settings;
        // console.log(this.settings);
        this.publish();

        if (this.settings.changed) {
            this.showMessage();
        }
    }

    publish() {
        this.settings$.next(this.settings);
    }

    initDom() {

        const length = document.getElementById('settings-song-length');
        length.value = this.settings.song.length / 60;

        const density = document.getElementById('settings-density');
        density.value = this.settings.song.density;

        const mode = document.getElementById('settings-mode');
        mode.value = this.settings.song.mode;

        const tracks = document.getElementById('settings-tracks');
        tracks.value = this.settings.song.tracks;

        const envelope = document.getElementById('settings-envelope');
        envelope.value = this.settings.song.envelope;

        // const envelopeCoEff = document.getElementById('settings-envelope-coeff');
        // envelopeCoEff.value = this.settings.song.envelopeCoEff;

        const driftEnvelope = document.getElementById('settings-drift-envelope');
        driftEnvelope.value = this.settings.song.driftEnvelope;

        const driftCoEff = document.getElementById('settings-drift-coeff');
        driftCoEff.value = this.settings.song.driftCoEff;

        const driftType = document.getElementById('settings-drift-type');
        driftType.value = this.settings.song.driftType;

        // const decayEnvelope = document.getElementById('settings-decay-envelope');
        // decayEnvelope.value = this.settings.song.decayEnvelope;

        // const decayCoEff = document.getElementById('settings-decay-coeff');
        // decayCoEff.value = this.settings.song.decayCoEff;

        const reverbSelect = document.getElementById('settings-reverb-type');
        this.buildReverbSelect(reverbSelect);

        const reverbLevel = document.getElementById('settings-reverb-level');
        reverbLevel.value = this.settings.song.outputReverbLevel;

        const masterLevel = document.getElementById('settings-master-level');
        masterLevel.value = this.settings.song.outputLevel;

        // const apply = document.getElementById('settings-submit');

        length.addEventListener('change', (e) => {
            const settings = {...this.settings};
            settings.song.length = +e.target.value * 60;
            settings.changed = { field: 'length', title: 'Length' };
            this.update(settings);
        });

        density.addEventListener('change', (e) => {
            const settings = {...this.settings};
            settings.song.density = +e.target.value;
            settings.changed = { field: 'density', title: 'Density' };
            this.update(settings);
        });

        mode.addEventListener('change', (e) => {
            const settings = {...this.settings};
            settings.song.mode = e.target.value;
            settings.changed = { field: 'mode', title: 'Mode' };
            this.update(settings);
        });

        tracks.addEventListener('change', (e) => {
            const settings = {...this.settings};
            settings.song.tracks = e.target.value;
            settings.changed = { field: 'tracks', title: 'Tracks' };
            this.update(settings);
        });

        envelope.addEventListener('change', (e) => {
            const settings = {...this.settings};
            settings.song.envelope = e.target.value;
            settings.changed = { field: 'envelope', title: 'Envelope' };
            this.update(settings);
        });

        // envelopeCoEff.addEventListener('change', (e) => {
        //     const settings = {...this.settings};
        //     settings.song.envelopeCoEff = +e.target.value;
        //     settings.changed = { field: 'envelopeCoEff', title: 'Envelope Depth' };
        //     this.update(settings);
        // });

        driftEnvelope.addEventListener('change', (e) => {
            const settings = {...this.settings};
            settings.song.driftEnvelope = e.target.value;
            settings.changed = { field: 'driftEnvelope', title: 'Drift Envelope' };

            this.update(settings);
        });

        driftType.addEventListener('change', (e) => {
            const settings = {...this.settings};
            settings.song.driftType = e.target.value;
            settings.changed = { field: 'driftType', title: 'Drift Type' };

            this.update(settings);
        });

        driftCoEff.addEventListener('change', (e) => {
            const settings = {...this.settings};
            settings.song.driftCoEff = +e.target.value;
            settings.changed = { field: 'driftCoEff', title: 'Drift Depth' };

            this.update(settings);
        });

        // decayEnvelope.addEventListener('change', (e) => {
        //     const settings = {...this.settings};
        //     settings.song.decayEnvelope = e.target.value;
        //     settings.changed = { field: 'decayEnvelope', title: 'Decay Envelope' };
        //     this.update(settings);
        // });

        // decayCoEff.addEventListener('change', (e) => {
        //     const settings = {...this.settings};
        //     settings.song.decayCoEff = +e.target.value;
        //     settings.changed = { field: 'decayCoEff', title: 'Decay Depth' };
        //     this.update(settings);
        // });

        reverbSelect.addEventListener('change', (e) => {
            const settings = {...this.settings};
            const impulse = settings.impulses.find(i => i.title === e.target.value);
            settings.song.selectedReverb = impulse.title;
            settings.changed = { field: 'selectedReverb', title: 'Reverb Type' };
            this.update(settings);
        });

        reverbLevel.addEventListener('change', (e) => {
            const settings = {...this.settings};
            settings.song.outputReverbLevel = +e.target.value;
            settings.changed = { field: 'outputReverbLevel', title: 'Reverb Level' };
            this.update(settings);
        });

        masterLevel.addEventListener('change', (e) => {
            const settings = {...this.settings};
            settings.song.outputLevel = +e.target.value;
            settings.changed = { field: 'outputLevel', title: 'Master Level' };
            this.update(settings);
        });

    }

    buildReverbSelect(element) {
        for (let impulse of this.settings.impulses) {
            const option = document.createElement('option');
            option.setAttribute('value', impulse.title);
            const text = document.createTextNode(impulse.title);
            option.appendChild(text);
            element.appendChild(option);
        }

        element.value = this.settings.song.selectedReverb;
    }

    showMessage(updated) {
        const messageContainer = document.getElementById('settings-message');
        messageContainer.innerHTML = `&#936; ${this.settings.changed.title} Updated &#936;`

        messageContainer.style.opacity = '1';
        setTimeout(() => {
            messageContainer.style.opacity = '0';
        }, 2000);
    }
}