import { Audio } from './audio.js';
import { Gain } from './gain.js';
import { Pan } from './pan.js';

export class NodeFactory {
    static createNode(type, opts) {
        switch (type) {
            case 'audio':
                return new Audio(opts);
            case 'gain':
                console.log(opts);
                return new Gain(opts);
            case 'pan':
                return new Pan(opts);
            default:
                console.error(`${type} is not a known node type`);
         }
    }
}