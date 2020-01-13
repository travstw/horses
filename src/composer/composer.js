import { Subject } from 'rxjs';
import { getJsonFile, getRandomInteger } from '../utils';
import { MediaService } from './media-service';
import { Scheduler } from './scheduler';
import { StereoBus } from '../engine/stereo-bus';
import { NodeFactory } from '../engine/nodes/node-factory';
import { Channel } from '../engine/channel';
export class Composer {
    constructor(context) {
        this.context = context;
        this.channels = [];
        this.scheduleEvent$ = new Subject();
        this.endedEvent$ = new Subject();
        this.stereoBus = new StereoBus({ context });
        this.startTime;
    }

    async init() {
        await this.getConfig();
        this.mediaService = new MediaService(this.config.tracks);
        this.scheduler = new Scheduler(this.config.song.numSchedulers, this.scheduleEvent$, ...this.config.song.schedulerRange);
        this.scheduleEvent$.subscribe(() => this.onScheduleEvent());
        this.endedEvent$.subscribe((id) => this.onEndedEvent(id));
    }

    async getConfig() {
        try {
            const config = await getJsonFile('../../config.json');
            this.config = config;
        } catch (e) {
            throw new Error('Failed to fetch config');
        }
    }

    start() {
        this.scheduler.start();
    }

    async onScheduleEvent() {
        console.log('scheduleEvent');
        const tracks = this.mediaService.getFilteredTrackList((track) => track);
        const index = getRandomInteger(0, tracks.length - 1);
        const buffer = await this.mediaService.getTrack(index);
        const audio = NodeFactory.createNode('audio', {context: this.context, buffer});
        const context = this.context;

        const channelOptions = {
            context,
            audio,
            nodes: [],
            name: audio.name,
            endedEvent$: this.endedEvent$,
            startOffset: 0,
            duration: 20,
            fadeIn: 5,
            fadeOut: 5

        }
        const channel = new Channel(channelOptions);
        this.channels.push(channel);
        this.stereoBus.connect(channel.output);
    }

    onEndedEvent(id) {
        // clean up and remove reference to channel with ended audio
        console.log('ended', id);
        this.channels = this.channels.filter(c => c.id !== id);
    }

    setFadeTimes() {

    }
}