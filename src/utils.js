
export const getAudioBuffer = (path) => {
    const request = new Request(path);

    return fetch(request).then(response => {
        return response.arrayBuffer();
    })
}

export const getJsonFile = () => {

    const request = new Request('src/assets/settings.json');

    return fetch(request).then(response => {
        return response.json();
    })
}

export const getRandomInteger = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
