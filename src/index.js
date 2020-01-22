
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
        this.context = new AudioContext();
        this.videoService = new VideoService();
        this.mediaService = new MediaService();
        this.modalService = new ModalService();
        this.impulseService = new ImpulseService(this.context, this.mediaService);
        this.settingsService = new SettingsService();
        await this.settingsService.fetchSettings();

        this.stereoBus = new StereoBus(this.context, this.impulseService, this.settingsService);
        this.composer = new Composer(this.context, this.stereoBus, this.impulseService, this.settingsService, this.mediaService);
        this.addEventListener();
    }

    addEventListener() {
        const element = document.getElementById('start');
        element.addEventListener('click', () => {
            element.style.opacity = 0;
            this.start();
        });
    }

    async start() {
        await this.composer.init();
        this.composer.start();
        this.videoService.start();
    }
}

const system = new SystemBuilder();

