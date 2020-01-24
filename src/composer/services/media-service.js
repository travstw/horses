
import { getAudioBuffer } from '../../utils';

export class MediaService {

    getTrack(filename) {
        return getAudioBuffer(`src/assets/audio/${filename}`);
    }

    getImpulse(filename) {
        return getAudioBuffer(`src/assets/audio/impulses/${filename}`);
    }
}