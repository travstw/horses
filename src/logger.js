

export class Logger {
    constructor() {
        this.logs = [];
        this.element = document.getElementById('logs');
    }

    log(message) {
        // const logItem = `${new Date().toISOString()} -- ${message}`;
        // this.logs.push(logItem);
        // if (this.logs.length >  10) {
        //     this.logs.shift();
        // }

        // this.render();
    }

    render() {
        let innerHtml = '';

        this.logs.forEach((l) => {
            console.log(l);
        });

        this.element.innerHTML = innerHtml;
    }


}