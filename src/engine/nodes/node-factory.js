import { Audio } from './audio.js';
import { Gain } from './gain.js';
import { Pan } from './pan.js';
import { Delay } from './delay.js';
import { Distortion } from './distortion.js';

export class NodeFactory {
    static createNode(type, opts) {
        switch (type) {
            case 'audio':
                return new Audio(opts);
            case 'gain':
                return new Gain(opts);
            case 'pan':
                return new Pan(opts);
            case 'delay':
                return new Delay(opts);
            case 'distortion':
                return new Distortion(opts);
            default:
                console.error(`${type} is not a known node type`);
         }
    }
}