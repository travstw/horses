
import { Composer } from '../src/composer/composer';
import { VideoService } from '../src/video/video-service';
import { MediaService } from '../src/composer/services/media-service';
import { ModalService } from '../src/modals/modal-service';
import { SettingsService } from '../src/settings/settings-service';
import { NodeFactory } from '../src/engine/node-factory';
import { StereoBus } from '../src/engine/stereo-bus';
import { ImpulseService } from './composer/services/impulse-service';
class SystemBuilder {
    constructor() {
        this.build();
    }

    async build() {
        this.startButton = document.getElementById('start');
        this.title = document.getElementById('title');
        this.playing = false;
        this.context = new AudioContext();
        this.videoService = new VideoService();
        this.mediaService = new MediaService();
        this.modalService = new ModalService();
        this.impulseService = new ImpulseService(this.context, this.mediaService);
        this.settingsService = new SettingsService();
        await this.settingsService.fetchSettings();
        this.stereoBus = new StereoBus(this.context, this.impulseService, this.settingsService);
        this.composer = new Composer(this.context, this.stereoBus, this.impulseService, this.settingsService, this.mediaService);
        this.composer.ended().subscribe(() => {

            this.onStopped();
        });
        this.addEventListener();
    }

    addEventListener() {

        this.startButton.addEventListener('click', (e) => {
            e.stopPropagation()

            if (this.playing) {
                this.stop();
            } else {
                this.start();
            }

        });
    }

    async start() {
        this.playing = true;
        await this.composer.init();
        this.composer.start();
        this.videoService.start();
        this.animateStartButton(true);
        this.animateTitle(true);
    }

    stop() {
        this.composer.stop();
    }

    onStopped() {
        this.playing = false;
        this.animateStartButton(false);
        this.animateTitle(false);
        this.videoService.stop();
    }

    animateStartButton(playing) {
        if (playing) {
            this.startButton.style.opacity = 0.5;
            this.startButton.style.top = '93%'
            this.startButton.innerText = 'REST';
            return;
        }
        this.startButton.style.opacity = .75;
        this.startButton.style.top = '80%'
        this.startButton.innerText = 'RIDE';

    }

    animateTitle(playing) {
        if (playing) {
            this.title.style.opacity = 0.5;
            this.title.style.top = '6%';
            return;
        }

        this.title.style.opacity = 0.7;
        this.title.style.top = '13%';
    }
}

const system = new SystemBuilder();

