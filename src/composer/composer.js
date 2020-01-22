import { BehaviorSubject, Subject } from 'rxjs';
import { Logger } from '../logger';
import { getRandomInteger } from '../utils';
import { AutomationService } from './services/automation-service';
import { Scheduler } from './services/scheduler-service';
import { NodeFactory } from '../engine/node-factory';
import { Channel } from '../engine/channel';
export class Composer {
    constructor(context, stereoBus, impulseService, settingsService, mediaService) {
        this.context = context;
        this.channels = [];
        this.logger = new Logger();
        this.scheduleEvent$ = new Subject();
        this.endedEvent$ = new Subject();
        this.playEvent$ = new Subject();
        this.currentPlaying$ = new BehaviorSubject([]);
        this.mediaService = mediaService;
        this.settingsService = settingsService;
        this.impulseService = impulseService;
        this.stereoBus = stereoBus;

        this.settingsService.settings$.subscribe((settings) => {
            this.settings = settings;
        });
    }

    async init() {
        this.secondsPerMeasure = (60.0 / this.settings.song.bpm) * 4;
        this.mediaService.setTracks(this.settings.tracks);
        this.scheduler = new Scheduler(this.settings.song.numSchedulers, this.scheduleEvent$, ...this.settings.song.schedulerRange);
        this.scheduleEvent$.subscribe(() => this.onScheduleEvent());
        this.endedEvent$.subscribe((id) => this.onEndedEvent(id));

        this.envelope = NodeFactory.createNode('gain', { context: this.context});
        this.stereoBus.connect(this.envelope.node);
        AutomationService.setValueAtTime(this.envelope, 'gain', 0.0, 0);
        AutomationService.linearRampToValueAtTime(this.envelope, 'gain', 1.0, this.context.currentTime + this.settings.song.length);

        if (this.settings.song.mode === 'structured') {
            await this.loadStaticTracks();
        }

    }

    start() {
        // delay start of randomized tracks to let intro play... doesn't have to be perfect.
        // can also limit what tracks will play in the beginning using the envelope
        // start immediately if in free mode...
        const duration = this.settings.song.mode === 'free' ? 0 : 15000;
        setTimeout(() => {
            this.scheduler.start(duration ? undefined : true);
        }, duration);

    }

    async loadStaticTracks() {
        const tracks = this.mediaService.tracks;
        for (let i = 0; i < tracks.length; i++) {
            if (tracks[i].static) {
                const name = tracks[i].title;
                this.logger.log(`Loading Track '${name}'`);

                const buffer = await this.getBuffer(i);

                // no audio file... just bail
                if (!buffer) {
                    return;
                }
                const audio = NodeFactory.createNode('audio', {context: this.context, name, buffer});

                const channelOptions = {
                    context: this.context,
                    automationService: AutomationService,
                    logger: this.logger,
                    audio,
                    nodes: [],
                    name: audio.name,
                    playEvent$: this.playEvent$,
                    endedEvent$: this.endedEvent$,
                    drift: 0,
                    secondsPerMeasure: this.secondsPerMeasure,
                    startMeasureOffset: tracks[i].startMeasureOffset,
                    fadeIn: 15,
                }
                this.createChannel(channelOptions);
            }
        }
        return;
    }

    async onScheduleEvent() {
        const tracks = this.mediaService.getFilteredTrackList((track) => {
            let types;
            let subtypes = ['main', 'ambient'];

            if (this.settings.song.tracks === 'vocals') {
                types = ['vocals', 'nature'];
            } else if (['instrumental', 'ambient'].includes(this.settings.song.tracks)) {
                types = ['instrumental', 'nature'];
                if (this.settings.song.tracks === 'ambient') {
                    subtypes = ['ambient'];
                }
            } else {
                types = ['vocals', 'instrument', 'nature'];
            }

            const include = (this.settings.song.mode === 'free');
            // console.log(types, include);

            return (track.static === include)
                && (this.envelope.value > track.playThreshold)
                && types.includes(track.type)
                && subtypes.includes(track.subtype);
        });

        // no tracks match play criteria... bail
        if (!tracks.length) {
            return;
        }

        const index = getRandomInteger(0, tracks.length - 1);
        const name = tracks[index].title;

        console.log(name, tracks);
        const buffer = await this.getBuffer(index);

        // no audio file... just bail
        if (!buffer) {
            return;
        }
        const audio = NodeFactory.createNode('audio', {context: this.context, name, buffer});

        const channelOptions = {
            context: this.context,
            automationService: AutomationService,
            logger: this.logger,
            audio,
            nodes: [],
            name: audio.name,
            playEvent$: this.playEvent$,
            endedEvent$: this.endedEvent$,
            drift: 0,
            secondsPerMeasure: this.secondsPerMeasure,
            duration: 30,
            fadeIn: 10,
            fadeOut: 10
        }
        this.createChannel(channelOptions);
    }

    async getBuffer(index) {
        try {
           return await this.mediaService.getTrack(index);
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
        this.stereoBus.disconnect(channel.output);
        this.logger.log(`Track '${channel.name}' ended`);
        this.channels = this.channels.filter(c => c.id !== id);
    }

    setFadeTimes() {

    }
}