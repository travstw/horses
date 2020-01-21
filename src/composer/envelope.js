export class Envelope {
    constructor(context) {
        this.context = context;
        this.node = new ConstantSourceNode(this.context, { offset: 0.0 });
        console.log(this.node);
        this.node.start(0);
    }

    get value() {
        return this.node.offset.value;
    }

    setValueAtTime(value, time) {
        console.log('hello there', value, time);
        console.log(this.node.offset);
        this.node.offset.setValueAtTime(value, time);
    }

    linearRampToValueAtTime(value, time) {
        console.log(value, time);
        this.node.offset.linearRampToValueAtTime(value, this.context.currentTime + time);
    }

    exponentialRampToValueAtTime(value, time) {
        this.node.offset.exponentialRampToValueAtTime(value, time)
    }

    setTargetAtTime(value, startTime, timeConstant) {
        this.node.offset.setTargetAtTime(value, startTime, timeConstant);
    }
}