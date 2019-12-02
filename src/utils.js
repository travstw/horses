
export const getAudioBuffer = (path) => {
    const request = new Request(path);

    return fetch(request).then(response => {
        return response.arrayBuffer();
    })
}