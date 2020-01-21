export class Distortion {
    // context;
    // gain;
    // curve;
    // node;

    constructor(opts) {
        this.context = opts.context;
        this.gain = new GainParam(opts.gain);
        this.curve = this.createCurve();
        this.node = this.context.createWaveShaper();
        this.node.curve = this.createCurve();
        this.node.oversample = '2x';
    }

    connect(output) {
        this.node.connect(output);
    }

    disconnect(output) {
        this.node.disconnect(output);
    }

    // https://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion
    // TODO, search around for other sigmoid functions to use.
    createCurve() {
        const n_samples = this.context.sampleRate;
        this.curve = new Float32Array(n_samples);
        const deg = Math.PI / 180;
        let i = 0;
        let x;
        for ( ; i < n_samples; ++i ) {
            x = i * 2 / n_samples - 1;
            curve[i] = ( 3 + this.gain ) * x * 20 * deg / ( Math.PI + this.gain * Math.abs(x) );
        }
        return curve;
    }

    getAllAudioParams() {
        return {
            distortion: {
                gain: this.gain
            }
        }
    }

    getAudioParam(param) {
        // Even though there is only one param, still use the arg as a key in case it's the wrong value.
        // Caller handles undefined.
        return {
            gain: this.gain
        }[param]
    }

}

class GainParam extends AudioParam {
    // name = 'gain';
    // defaultValue = 0;
    // maxValue =  100;
    // minValue = 0;
    // value;

    constructor(gain) {
        super();
        this.name = 'gain';
        this.defaultValue = 0;
        this.maxValue =  100;
        this.minValue = 0;
        this.value = gain;
    }
}
