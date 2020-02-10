import { BehaviorSubject, Subject } from 'rxjs';
import { Logger } from '../logger';
import { getRandomInteger } from '../utils';
import { AutomationService } from './services/automation-service';
import { SchedulerService } from './services/scheduler-service';
import { NodeFactory } from '../engine/node-factory';
import { Channel } from '../engine/channel';

const DEFAULT_FADEOUT_LENGTH = 30;
export class Composer {
    constructor(context, stereoBus, impulseService, settingsService, mediaService) {
        this.context = context;
        this.channels = [];
        this.logger = new Logger();
        this.suicideTimer;
        this.scheduleEvent$ = new Subject();
        this.endedEvent$ = new Subject();
        this.songEnded$ = new Subject();
        this.playEvent$ = new Subject();
        this.currentPlaying$ = new BehaviorSubject([]);
        this.mediaService = mediaService;
        this.settingsService = settingsService;
        this.impulseService = impulseService;
        this.stereoBus = stereoBus;

        this.settingsService.settings$.subscribe((settings) => {
            this.settings = settings;
            if (!this.tracks) {
                this.tracks = this.settings.tracks;
            }

            this.updateOnSettingsChange();

        });
    }

    async init() {
        this.startTime = this.context.currentTime;
        this.secondsPerBeat = (60.0 / this.settings.song.bpm);
        this.schedulerService = new SchedulerService(this.scheduleEvent$, this.settingsService.settings$);
        this.scheduleEvent$.subscribe((event) => this.onScheduleEvent(event));
        this.endedEvent$.subscribe((id) => this.onEndedEvent(id));
        AutomationService.cancelScheduledValues(this.stereoBus.output, 'gain', 0);
        this.stereoBus.output.value = 1;

        // set fade out if song has a defined length...
        if (this.settings.song.length) {
            const fadeOutStart = this.settings.song.length - DEFAULT_FADEOUT_LENGTH;
            this.stereoBus.setFadeOut(fadeOutStart, DEFAULT_FADEOUT_LENGTH);
        }

        // use a dummy gain node to create envelopes
        this.envelope = NodeFactory.createNode('gain', { context: this.context});
        this.envelope.value = 0.0;
        this.stereoBus.connect(this.envelope.node);
        this.updateEnvelope(this.envelope, this.settings.song.envelope);

        // drift envelope
        this.driftEnvelope = NodeFactory.createNode('gain', { context: this.context});
        this.driftEnvelope.value = 0.0;
        this.stereoBus.connect(this.driftEnvelope.node);
        this.updateEnvelope(this.driftEnvelope, this.settings.song.driftEnvelope);

        this.setSuicideTimer();

        await this.loadStaticTracks();
    }

    updateOnSettingsChange() {
        // only update in real time if song has already started... otherwise handled in init
        if (this.settings && this.settings.changed && this.startTime) {
            switch(this.settings.changed.type) {
                case 'length':
                    this.updateStereoBusFadeOut();
                    this.setSuicideTimer(); // update timer
                    // have to update all envelopes when length changes
                    this.updateEnvelope(this.envelope, this.settings.song.envelope);
                    this.updateEnvelope(this.driftEnvelope, this.settings.song.driftEnvelope);
                    break;
                case 'envelope':
                    this.updateEnvelope(this.envelope, this.settings.song.envelope);
                    break;
                case 'driftEnvelope':
                    this.updateEnvelope(this.driftEnvelope, this.settings.song.driftEnvelope);
                    break;
                case 'mode':
                    if (this.settings.song.mode === 'free') {
                        this.killChannelsByQuery((channel) => {
                            return !!channel.trackMetadata.static;
                        });
                    } else {
                        this.loadStaticTracks();
                    }
                    break;
                case 'tracks':
                    const trackTypes = this.settings.song.tracks;
                    // console.log('type', trackTypes);
                    const types = trackTypes === 'all' ? ['vocals', 'instrument', 'ambient'] : trackTypes.split('-');

                    this.killChannelsByQuery((channel) => {
                        return !types.includes(channel.trackMetadata.type);
                    });
                    break;
                case 'level':
                    const tracks = this.channels.filter(c => c.trackMetadata.type === this.settings.changed.field);
                    if (tracks.length) {
                        const type = this.settings.song.trackTypes.find(t => t.type === this.settings.changed.field);
                        tracks.forEach(t => {
                            t.output.value = t.output.value * (type.level / 100);
                            AutomationService.cancelScheduledValues(t.output, 'gain', 0);
                        });
                    }

            }
        }
    }

    start() {
        // delay start of randomized tracks to let intro play... doesn't have to be perfect.
        // can also limit what tracks will play in the beginning using the envelope
        // start immediately if in free mode...
        const duration = this.settings.song.mode === 'free' ? 0 : 15000;
        setTimeout(() => {
            this.schedulerService.start(!!duration);
        }, duration);

    }

    stop(time) {
        this.killChannelsByQuery((ch) => true, time);
        this.schedulerService.stop();
        this.channels = [];
        clearTimeout(this.suicideTimer);
        this.songEnded$.next(true);
    }

    setSuicideTimer() {
        if (this.suicideTimer) {
            clearTimeout(this.suicideTimer);
        }

        // add 10 seconds to allow the fade
        const length = this.settings.song.length;
        // set to infinite... stay alive
        if (!length) {
            return;
        }

        this.suicideTimer = setTimeout(() => {
            this.stop(5);
        }, (length) * 1000);
    }

    ended() {
        return this.songEnded$;
    }

    async loadStaticTracks() {
        const mode = this.settings.song.mode;
        const types = mode === 'structured' ? ['instrument', 'ambient', 'vocals', 'nature'] : ['nature'];
        for (let i = 0; i < this.tracks.length; i++) {
            if (this.tracks[i].static && types.includes(this.tracks[i].type)) {
                const track = this.tracks[i];
                const name = track.title;
                this.logger.log(`Loading Track '${name}'`);

                const buffer = await this.getBuffer(track.filename);

                // no audio file... just bail
                if (!buffer) {
                    return;
                }
                const audio = NodeFactory.createNode('audio', {context: this.context, name, buffer});
                const { fadeIn } = this.getFadeTimes();

                const channelOptions = {
                    context: this.context,
                    logger: this.logger,
                    trackMetadata: track,
                    audio,
                    nodes: [],
                    name,
                    playEvent$: this.playEvent$,
                    endedEvent$: this.endedEvent$,
                    drift: 0,
                    secondsPerBeat: this.secondsPerBeat,
                    fadeIn,
                    settings: this.settings
                }
                this.createChannel(channelOptions);
            }
        }
        return;
    }

    async onScheduleEvent(event) {
        // console.log('event', event);
        const trackTypes = this.settings.song.tracks;
        // console.log('type', event);
        const types = trackTypes === 'all' ? ['vocals', 'instrument', 'ambient'] : trackTypes.split('-');
        if (!types.includes(event)) {
            return;
        }

        const tracks = this.tracks.filter((track) => {
            const include = this.settings.song.mode === 'free' ? true : !track.static;
            const thresholdReached = this.envelope.value >= track.playThreshold;
            const typeMatch = track.type === event

            // console.log(event, include, thresholdReached, typeMatch)
            return include && thresholdReached && typeMatch;
        });

        // no tracks match play criteria... bail
        if (!tracks.length) {
            return;
        }

        const index = getRandomInteger(0, tracks.length - 1);
        const track = tracks[index];
        const name = track.title;

        const buffer = await this.getBuffer(track.filename);

        // no audio file... just bail
        if (!buffer) {
            return;
        }
        const audio = NodeFactory.createNode('audio', {context: this.context, name, buffer});
        const { fadeIn, fadeOut} = this.getFadeTimes();
        const duration = this.getDuration();
        const drift = this.getTheDrift(track);

        const channelOptions = {
            context: this.context,
            logger: this.logger,
            trackMetadata: track,
            audio,
            nodes: [],
            name: name,
            playEvent$: this.playEvent$,
            endedEvent$: this.endedEvent$,
            drift,
            secondsPerBeat: this.secondsPerBeat,
            duration,
            fadeIn,
            fadeOut,
            settings: this.settings
        }
        this.createChannel(channelOptions);
    }

    async getBuffer(filename) {
        try {
           return await this.mediaService.getTrack(filename);
        } catch (e) {
            // something happened fetching the file... just log it and move on.
            console.error(e)
            return;
        }
    }

    createChannel(options) {
        const channel = new Channel(options);
        this.channels.push(channel);
        this.stereoBus.connect(channel.output.node);
    }

    onEndedEvent(id) {
        // clean up and remove reference to channel with ended audio
        const channel = this.channels.find((c) => c.id === id);
        // this shouldn't happen...
        if (!channel) {
            return;
        }

        this.stereoBus.disconnect(channel.output);
        this.logger.log(`Track '${channel.name}' ended`);
        this.channels = this.channels.filter(c => c.id !== id);
    }

    // reset envelope automation to go from current value to end value with new time or curve
    updateEnvelope(envelope, value) {
        // console.log(this.envelope.value);
        AutomationService.cancelScheduledValues(envelope, 'gain', 0);
        const length = !this.settings.song.length ? 300 : this.settings.song.length;
        const timeOffset = length - (this.context.currentTime - this.startTime) - DEFAULT_FADEOUT_LENGTH;
        const gain = envelope.value;
        switch (value) {
            // We reset envelope values on change to either .5 or 1 so there will always be some travel
            case 'linear':
                if (gain > .5) {
                    envelope.value = this.startTime ? 0.5 : 0
                }
                AutomationService.linearRampToValueAtTime(envelope, 'gain', 1.0, this.context.currentTime + timeOffset);
                break;
            case 'exponential':
                if (gain > .5) {
                    envelope.value = this.startTime ? 0.5 : 0
                }
                AutomationService.exponentialRampToValueAtTime(envelope, 'gain', 1.0, this.context.currentTime + timeOffset);
                break;
            case 'flat':
                // TODO use the coefficient to set this value... just open it up for now
                envelope.value = 1;
                break;
            case 'exponentialReverse':
                if (gain < .5) {
                    envelope.value = this.startTime ? 0.5 : 1
                }
                AutomationService.exponentialRampToValueAtTime(envelope, 'gain', 0.0, this.context.currentTime + timeOffset);
                break;
            case 'linearReverse':
                if (gain < .5) {
                    envelope.value = this.startTime ? 0.5 : 1
                }
                AutomationService.linearRampToValueAtTime(envelope, 'gain', 0.0, this.context.currentTime + timeOffset);
                break;
        }
    }

    updateStereoBusFadeOut() {
        if (!this.settings.song.length) {
            this.stereoBus.cancelFadeOut();
            return;
        }
        let newFadeOutTime = this.settings.song.length - (this.context.currentTime - this.startTime);
        // if user selects length shorter than song has already been playing, start fade immediately
        newFadeOutTime = newFadeOutTime > 0 ? newFadeOutTime : DEFAULT_FADEOUT_LENGTH;
        this.stereoBus.setFadeOut(newFadeOutTime, DEFAULT_FADEOUT_LENGTH);
    }

    killChannelsByQuery(query, time = 10) {
        this.channels
            .filter(query)
            .forEach(fc => {
                AutomationService.cancelScheduledValues(fc.output, 'gain', 0);
                AutomationService.linearRampToValueAtTime(fc.output, 'gain', 0, this.context.currentTime + time);

                fc.stop(this.context.currentTime + time);
            });
    }

    getFadeTimes() {
        return {
            fadeIn: getRandomInteger(this.settings.song.trackFadeRange[0], this.settings.song.trackFadeRange[1]),
            fadeOut: getRandomInteger(this.settings.song.trackFadeRange[0], this.settings.song.trackFadeRange[1]),
        };
    }

    getDuration() {
        return getRandomInteger(this.settings.song.trackDurationRange[0], this.settings.song.trackDurationRange[1])
    }

    getTheDrift(track) {

        // currently, flat sets the evenlope value to 1 and stays there.
        // if flat gets smarter, an update to this will be a TODO
        if (this.settings.song.driftEnvelope === 'flat' || !track.drift) {
            return 0;
        }

        const driftEnvelope = this.driftEnvelope.value;
        const driftType = this.settings.song.driftType;
        const driftAmount = this.settings.song.driftCoEff;
        const driftMultiplier = Math.random() * Math.floor(driftEnvelope * 10 * driftAmount);

        // console.log(driftEnvelope, driftType, driftAmount, driftMultiplier);
        const quantizeMultiplier = driftEnvelope * driftAmount;
        if (driftType === 'quantized') {
            if (quantizeMultiplier > .90) {
                return this.secondsPerBeat * 4 / 2;
            } else if (quantizeMultiplier > .80) {
                return this.secondsPerBeat * 4 / 4;
            } else if (quantizeMultiplier > .70) {
                return this.secondsPerBeat * 4 / 8;
            } else if (quantizeMultiplier > .60) {
                return this.secondsPerBeat * 4 / 16;
            } else if (quantizeMultiplier > .50) {
                return this.secondsPerBeat * 4 / 32;
            } else if (quantizeMultiplier > .40) {
                return this.secondsPerBeat * 4 / 64;
            } else if (quantizeMultiplier > .30) {
                return this.secondsPerBeat * 4 / 128;
            } else if (quantizeMultiplier > .20) {
                return this.secondsPerBeat * 4 / 256;
            } else {
                return 0;
            }
         } else {
            return driftMultiplier / 10;
        }


    }
}