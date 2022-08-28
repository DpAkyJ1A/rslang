import Control from 'control';
import { IWord } from '../../api/interfaces';
import { IState } from '../../controller/controller';

abstract class Page {
    protected node: Control;
    protected container: HTMLElement;

    constructor(className: string) {
        this.node = new Control(null, 'div', `${className}`);
        this.container = this.node.node;
    }

    render(container: HTMLElement, data?: IWord[]) {
        container.append(this.container);
    }
}

export default Page;
