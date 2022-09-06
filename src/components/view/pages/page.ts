import Control from 'control';

abstract class Page {
    protected node: Control;
    protected container: HTMLElement;

    constructor(className: string) {
        this.node = new Control(null, 'div', `${className}`);
        this.container = this.node.node;
    }

    render(container: HTMLElement) {
        container.append(this.container);
    }
}

export default Page;
