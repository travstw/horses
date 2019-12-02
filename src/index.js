import { Channel } from './engine/channel.js';
import { NodeFactory } from './engine/nodes/node-factory.js';
import { StereoBus } from './engine/stereo-bus.js';
import { getAudioBuffer } from './utils.js';

const context = new AudioContext();

document.getElementById('start').addEventListener('click', () => {
    init();
});

async function init() {

    // build and play a track for testing...
    const stereoBus = new StereoBus({ context });

    const name = '../assets/audio/ace.mp3';
    const buffer = await getAudioBuffer(name);

    const audio = NodeFactory.createNode('audio', {context, buffer});

    // need to add event emitter so the channel knows when the audio is ready to play... wait 1 second for now
    setTimeout(() => {
        const channel = new Channel({context, audio, nodes: [], name});
        stereoBus.connect(channel.output);
        channel.start();
        console.log(channel.getChannelAudioParams());
    }, 1000)
}