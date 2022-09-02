export default class Loader {
    private loader: HTMLElement;

    constructor() {
        this.loader = document.createElement('span');
        this.loader.classList.add('loader');
    }

    get getLoader() {
        return this.loader;
    }
}
