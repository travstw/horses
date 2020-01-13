
import { getAudioBuffer } from '../utils';

export class MediaService {
    // tracks;

    constructor(tracks) {
        this.tracks = tracks;
    }

    getTrack(index) {
        const track = this.tracks[index];
        return getAudioBuffer(`../../assets/audio/${track.filename}`);
    }

    getFilteredTrackList(filterFn) {
        return this.tracks.filter(filterFn)
    }
}