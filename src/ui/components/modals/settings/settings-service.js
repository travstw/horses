import { getJsonFile } from '../../../../utils';
import { BehaviorSubject } from 'rxjs';

export class SettingsService {
    constructor() {
        this.settings;
        this.settings$ = new BehaviorSubject(undefined);

        this.settings$.subscribe((settings) => this.settings = settings);
    }

    async getSettings() {
        try {
            const settings = await getJsonFile('../../settings.json');
            this.update(settings);
            this.publish();
            this.initDom();
            return;
        } catch (e) {
            throw new Error('Failed to fetch settings');
        }
    }

    update(settings) {
        this.settings = settings;
    }

    publish() {
        this.settings$.next(this.settings);
    }


    initDom() {
        const length = document.getElementById('song-length');
        length.value = this.settings.song.length / 60;

        const envelope = document.getElementById('envelope');
        envelope.value = this.settings.song.envelope;

        const envelopeCoEff = document.getElementById('envelope-coeff');
        envelopeCoEff.value = this.settings.song.envelopeCoEff;

        const driftEnvelope = document.getElementById('drift-envelope');
        driftEnvelope.value = this.settings.song.driftEnvelope;

        const driftCoEff = document.getElementById('drift-coeff');
        driftCoEff.value = this.settings.song.driftCoEff;

        const decayEnvelope = document.getElementById('decay-envelope');
        decayEnvelope.value = this.settings.song.decayEnvelope;

        const decayCoEff = document.getElementById('decay-coeff');
        decayCoEff.value = this.settings.song.decayCoEff;

        const apply = document.getElementById('settings-submit');

        length.addEventListener('change', (e) => {
            const settings = {...this.settings};
            settings.song.length = e.target.value !== 'infinite' ? +e.target.value * 60 : undefined;
            this.update(settings);
        });

        envelope.addEventListener('change', (e) => {
            const settings = {...this.settings};
            settings.song.envelope = e.target.value;
            this.update(settings);
        });

        envelopeCoEff.addEventListener('change', (e) => {
            const settings = {...this.settings};
            settings.song.envelopeCoEff = e.target.value;
            this.update(settings);
        });

        driftEnvelope.addEventListener('change', (e) => {
            const settings = {...this.settings};
            settings.song.driftEnvelope = e.target.value;
            this.update(settings);
        });

        driftCoEff.addEventListener('change', (e) => {
            const settings = {...this.settings};
            settings.song.driftCoEff = e.target.value;
            this.update(settings);
        });

        decayEnvelope.addEventListener('change', (e) => {
            const settings = {...this.settings};
            settings.song.decayEnvelope = e.target.value;
            this.update(settings);
        });

        decayCoEff.addEventListener('change', (e) => {
            const settings = {...this.settings};
            settings.song.decayCoEff = e.target.value;
            this.update(settings);
        });

        apply.addEventListener('click', () => {
            this.publish();
        });

    }
}