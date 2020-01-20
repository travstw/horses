import { getRandomInteger } from '../../../utils';

export class VideoService {
    constructor() {
        this.container = document.getElementById('bg-video');
        this.videos = ['horses.mp4', 'cowboy.mp4', 'fence.mp4', 'tree.mp4', 'desert.mp4'];
    }

    start() {
        const video = document.createElement('video');
        const selectedVideo = this.videos[getRandomInteger(0, this.videos.length - 1)];
        video.src = `../assets/video/${selectedVideo}`;
        video.classList.add('bg-video_content');
        // video.style.opacity = 0;
        video.style.opacity = .85;
        this.container.appendChild(video);
        video.play();
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