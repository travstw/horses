import { Channel } from './engine/channel.js';
import { NodeFactory } from './engine/nodes/node-factory.js';
import { StereoBus } from './engine/stereo-bus.js';
import { getAudioBuffer } from './utils.js';
import { Composer } from '../src/composer/composer';

const context = new AudioContext();

document.getElementById('start').addEventListener('click', () => {
    init();
});

async function init() {
    const composer = new Composer(context);
    await composer.init();
    composer.start();

}