import Control from '../../../control';

export default class Loader {
    private loader: Control;
    private wrapper: Control;

    constructor(container: HTMLElement) {
        this.wrapper = new Control(container, 'div', 'loader__wrapper');
        this.loader = new Control(this.wrapper.node, 'span', 'loader');
    }

    get getLoader() {
        return this.loader;
    }

    destroy() {
        this.wrapper.node.remove();
    }
}
