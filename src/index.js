
import { Composer } from '../src/composer/composer';
import { VideoService } from '../src/video/video-service';
import { MediaService } from '../src/composer/services/media-service';
import { ModalService } from '../src/modals/modal-service';
import { SettingsService } from '../src/settings/settings-service';
import { NodeFactory } from '../src/engine/node-factory';
import { StereoBus } from '../src/engine/stereo-bus';
class SystemBuilder {
    constructor() {
        this.build();
    }

    async build() {
        this.videoService = new VideoService();
        this.mediaService = new MediaService();
        this.modalService = new ModalService();
        this.settingsService = new SettingsService();
        await this.settingsService.fetchSettings();

        this.context = new AudioContext();


        const impulse = this.settingsService.getSetting((settings) => {
            return settings['impulses'].find((i) => !!i.default);
        });

        try {
            await new Promise(async (resolve, reject) => {
                const buffer = await this.mediaService.getImpulse(impulse.filename);
                const stereoBusReverb = NodeFactory.createNode('reverb', { context: this.context, buffer });
                this.stereoBus = new StereoBus({context: this.context, settingsService: this.settingsService, reverb: stereoBusReverb});
                stereoBusReverb.ready().subscribe(ready => {
                    if (ready) {
                        resolve();
                    }
                });
            });
        } catch(e) {
            console.error(e);
        }

        this.composer = new Composer(this.context, this.stereoBus, this.settingsService, this.mediaService);
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

