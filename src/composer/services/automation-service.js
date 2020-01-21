

// helper method
const setAudioParam = (node, param) => typeof param === 'string' ? node.getAudioParam(param) : param;

export class AutomationService {

    static setValueAtTime(node, param, value, time) {
        const audioParam = setAudioParam(node, param);
        if (!audioParam) {
            console.error('No audio param found', node.name, param);
            return;
        }
        audioParam.setValueAtTime(value, time);
    }

    static linearRampToValueAtTime(node, param, value, time) {
        const audioParam = setAudioParam(node, param);
        if (!audioParam) {
            console.error('No audio param found', node.name, param);
            return;
        }

        audioParam.linearRampToValueAtTime(value, time);
    }

    static exponentialRampToValueAtTime(node, param, value, time) {
        const audioParam = setAudioParam(node, param);
        if (!audioParam) {
            console.error('No audio param found', node.name, param);
            return;
        }

        audioParam.linearRampToValueAtTime(value, time);
    }

    static setTargetAtTime(node, param, target, startTime, timeConstant) {
        const audioParam = setAudioParam(node, param);
        if (!audioParam) {
            console.error('No audio param found', node.name, param);
            return;
        }

        audioParam.setTargetAtTime(target, startTime, timeConstant);
    }

    static setValueCurveAtTime(node, param, values, startTime, duration) {
        const audioParam = setAudioParam(node, param);
        if (!audioParam) {
            console.error('No audio param found', node.name, param);
            return;
        }

        audioParam.setValueCurveAtTime(values, startTime, duration);
    }

    static cancelScheduledValues(node, param, startTime) {
        const audioParam = setAudioParam(node, param);
        if (!audioParam) {
            console.error('No audio param found', node.name, param);
            return;
        }

        audioParam.cancelScheduledValues(startTime);
    }

    static cancelAndHoldAtTime(node, param, cancelTime) {
        const audioParam = this.setAudioParam(node, param);
        if (!audioParam) {
            console.error('No audio param found', node.name, param);
            return;
        }

        audioParam.cancelAndHoldAtTime(cancelTime);
    }
}

