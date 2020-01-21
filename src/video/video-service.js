import { getRandomInteger } from '../utils';

export class VideoService {
    constructor() {
        this.container = document.getElementById('bg-video');
        this.videos = ['horses.mp4', 'cowboy.mp4', 'fence.mp4', 'tree.mp4', 'desert.mp4'];
    }

    async start() {
        const video = document.createElement('video');
        const selectedVideo = this.videos[getRandomInteger(0, this.videos.length - 1)];
        video.src = `src/assets/video/${selectedVideo}`;
        video.classList.add('bg-video_content');
        video.style.opacity = 0;
        this.container.insertBefore(video, this.container.childNodes[0]);
        try {
            await video.play();
            video.style.opacity = .85;
        } catch (e) {
            console.error('Video could not play', e);
        }
        console.log('new video');

        setTimeout(() => {
            video.style.opacity = 0;
            setTimeout(() => {
                console.log('remove');
                this.container.removeChild(video);
            }, 2000);

            this.start();
        }, 10000);
    }

}