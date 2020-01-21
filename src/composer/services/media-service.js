
import { getAudioBuffer } from '../../utils';

export class MediaService {

    setTracks(tracks) {
        this.tracks = tracks;
    }

    getTrack(index) {
        const track = this.tracks[index];
        return getAudioBuffer(`src/assets/audio/${track.filename}`);
    }

    getFilteredTrackList(filterFn) {
        return this.tracks.filter(filterFn)
    }

    getImpulse(name) {
        return getAudioBuffer(`src/assets/audio/impulses/${name}`);
    }
}