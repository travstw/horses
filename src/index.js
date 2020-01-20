
import { Composer } from '../src/composer/composer';
import { VideoService } from '../src/ui/components/video/video-service';
import { ModalService } from '../src/ui/components/modals/modal-service';
import { SettingsService } from '../src/ui/components/modals/settings/settings-service';

let video;
let settingsService;
let context;
let composer;

// init
(async () => {
    video = new VideoService();
    new ModalService();
    settingsService = new SettingsService();
    await settingsService.getSettings();
    context = new AudioContext();
    composer = new Composer(context, settingsService.settings$);
})();

document.getElementById('start').addEventListener('click', function() {
    this.style.opacity = 0;
    start();
});



async function start() {
    await composer.init();
    composer.start();
    video.start();
}