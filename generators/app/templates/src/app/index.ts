interface IApp {
    start(): void;
}

class App implements IApp {
    private title: string;

    constructor() {
        this.title = 'App';
    }

    start(): void {
        console.log('Start ' + this.title);
    }
}
