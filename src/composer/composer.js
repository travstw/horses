import { BehaviorSubject, Subject } from 'rxjs';
import { Logger } from '../logger';
import { getRandomInteger } from '../utils';
import { Envelope } from './envelope';
import { MediaService } from './media-service';
import { Scheduler } from './scheduler';
import { StereoBus } from '../engine/stereo-bus';
import { NodeFactory } from '../engine/nodes/node-factory';
import { Channel } from '../engine/channel';
export class Composer {
    constructor(context, settings$) {
        this.context = context;
        this.channels = [];
        this.logger = new Logger();
        this.scheduleEvent$ = new Subject();
        this.endedEvent$ = new Subject();
        this.playEvent$ = new Subject();
        this.currentPlaying$ = new BehaviorSubject([]);
        this.stereoBus = new StereoBus({ context });

        settings$.subscribe((settings) => {
            this.settings = settings;
            console.log(this.settings);
        });
    }

    async init() {
        this.logger.log('Priming the horses...');
        this.secondsPerMeasure = (60.0 / this.settings.song.bpm) * 4;
        this.mediaService = new MediaService(this.settings.tracks);
        this.scheduler = new Scheduler(this.settings.song.numSchedulers, this.scheduleEvent$, ...this.settings.song.schedulerRange);
        this.scheduleEvent$.subscribe(() => this.onScheduleEvent());
        this.endedEvent$.subscribe((id) => this.onEndedEvent(id));
        await this.loadStaticTracks();
    }

    start() {
        // delay start of randomized tracks to let intro play... doesn't have to be perfect.
        // can also limit what tracks will play in the beginning using the envelope
        setTimeout(() => {
            this.envelope = new Envelope(this.context);
            this.envelope.setValueAtTime(.5, this.context.currentTime + 1);
            this.envelope.linearRampToValueAtTime(1.0, 10);
            this.scheduler.start();
        }, 15000);

    }

    async loadStaticTracks() {
        const tracks = this.mediaService.tracks;
        for (let i = 0; i < tracks.length; i++) {
            if (tracks[i].static) {
                const name = tracks[i].title;
                this.logger.log(`Loading Track '${name}'`);

                const buffer = await this.getBuffer(i);
                if (!buffer) {
                    return;
                }
                const audio = NodeFactory.createNode('audio', {context: this.context, name, buffer});
                const context = this.context;

                const channelOptions = {
                    context,
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
        this.logger.log('Schedule Event Fired');
        console.log('envelope', this.envelope.value);
        const tracks = this.mediaService.getFilteredTrackList((track) => !track.static);
        const index = getRandomInteger(0, tracks.length - 1);
        const name = tracks[index].title;

        this.logger.log(`Loading Track '${tracks[index].title}'`);

        const buffer = await this.getBuffer(index);
        if (!buffer) {
            return;
        }
        const audio = NodeFactory.createNode('audio', {context: this.context, name, buffer});
        const context = this.context;

        const channelOptions = {
            context,
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
        this.stereoBus.connect(channel.output);
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