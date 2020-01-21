import { Audio } from './nodes/audio';
import { Gain } from './nodes/gain';
import { Pan } from './nodes/pan';
import { Delay } from './nodes/delay';
import { Distortion } from './nodes/distortion';
import { ConstantSource } from './nodes/constant-source';
import { Convolver } from './nodes/convolver';

export class NodeFactory {
    static createNode(type, opts) {
        switch (type) {
            case 'audio':
                return new Audio(opts);
            case 'gain':
                return new Gain(opts);
            case 'pan':
                return new Pan(opts);
            case 'convolver':
            case 'reverb':
                return new Convolver(opts);
            case 'delay':
                return new Delay(opts);
            case 'distortion':
                return new Distortion(opts);
            case 'constantSource':
                return new ConstantSource(opts);
            default:
                console.error(`${type} is not a known node type`);
         }
    }
}