export class Track {
    // static;
    // drift;
    // decay;
    // type;
    // subtype;
    // filename;
    // title;

    constructor(obj) {
        if (obj) {
            for (let key in obj) {
                this[key] = obj[key];
            }
        }
    }
}