export interface IApp {
    start(): void;
}

export default class App implements IApp {
    private title: string;

    constructor() {
        this.title = 'App';
    }

    public start(): void {
        console.log('Start ' + this.title);
    }
}
