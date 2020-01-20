import { BehaviorSubject, Subject } from 'rxjs';
import { Logger } from '../logger';
import { getJsonFile, getRandomInteger } from '../utils';
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
            this.settings = settings
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
        this.scheduler.start();
    }

    async loadStaticTracks() {
        const tracks = this.mediaService.tracks;
        for (let i = 0; i < tracks.length; i++) {
            if (tracks[i].static) {
                const name = tracks[i].title;
                this.logger.log(`Loading Track '${name}'`);

                let buffer;
                try {
                    buffer = await this.mediaService.getTrack(i);
                } catch (e) {
                    // something happened fetching the file... just log it and move on.
                    console.error(e)
                    continue;
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
                    startMeasure: tracks[i].startMeasure,
                    duration: this.settings.song.length,
                    fadeIn: 5,
                    fadeOut: 30

                }
                const channel = new Channel(channelOptions);
                this.channels.push(channel);
                this.stereoBus.connect(channel.output);
            }
        }
        return;
    }

    async onScheduleEvent() {
        this.logger.log('Schedule Event Fired');
        const tracks = this.mediaService.getFilteredTrackList((track) => !track.static);
        const index = getRandomInteger(0, tracks.length - 1);
        const name = tracks[index].title;

        this.logger.log(`Loading Track '${tracks[index].title}'`);

        let buffer;
        try {
            buffer = await this.mediaService.getTrack(index);
        } catch (e) {
            // something happened fetching the file... just log it and move on.
            console.error(e)
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
            fadeIn: 5,
            fadeOut: 5

        }
        const channel = new Channel(channelOptions);
        this.channels.push(channel);
        this.stereoBus.connect(channel.output);
    }

    onEndedEvent(id) {
        // clean up and remove reference to channel with ended audio
        const channel = this.channels.find((c) => c.id === id);
        this.logger.log(`Track '${channel.name}' ended`);
        this.channels = this.channels.filter(c => c.id !== id);
    }

    setFadeTimes() {

    }
}