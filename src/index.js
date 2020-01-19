
import { Composer } from '../src/composer/composer';
const context = new AudioContext();


//UI interaction
const video = document.getElementById('horses1');
const modals = document.getElementsByClassName('modals');
const modalBG = document.getElementById('modal-background');
const about = document.getElementById('about');
const settings = document.getElementById('settings');
const aboutModal = document.getElementById('about-modal');
const settingsModal = document.getElementById('settings-modal');
const modalClose = document.getElementsByClassName('modal-close');
// use 'function' to have correct 'this'
document.getElementById('start').addEventListener('click', function() {
    this.style.opacity = 0;
    video.play();
    video.style.opacity = 1;
    init();
});

about.addEventListener('click', () => {
    for (let item of modals) {
        // item.style.display = 'none';
        item.style.pointerEvents = 'none';
        item.style.opacity = 0;
    }

    // aboutModal.style.display = 'block';
    aboutModal.style.opacity = 1;
    aboutModal.style.pointerEvents = 'auto';
    modalBG.style.display = 'block';
});

settings.addEventListener('click', () => {
    for (let item of modals) {
        // item.style.display = 'none';
        item.style.pointerEvents = 'none';
        item.style.opacity = 0;
    }
    // settingsModal.style.display = 'block';
    settingsModal.style.opacity = 1;
    settingsModal.style.pointerEvents = 'auto';
    modalBG.style.display = 'block';
});

modalBG.addEventListener('click', () => {
    for (let item of modals) {
        item.style.pointerEvents = 'none';
        item.style.opacity = 0;
    }
    modalBG.style.display = 'none';
});

for (let item of modalClose) {
    item.addEventListener('click', () => {
        for (let item of modals) {
            item.style.pointerEvents = 'none';
            item.style.opacity = 0;
        }
        modalBG.style.display = 'none';
    });
}

async function init() {
    const composer = new Composer(context);
    await composer.init();
    composer.start();
}