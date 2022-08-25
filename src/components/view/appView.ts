import { createHeader } from './header/header';
import { createSideMenu } from './side-menu/side-menu';
import { createFooter } from './footer/footer';
import Textbook from './pages/textbook/textbook';
import Control from './control';

export default class AppView {
    private root: HTMLElement;
    private textbook: Textbook;
    main: Control;
    constructor(root: HTMLElement) {
        this.root = root;
        this.textbook = new Textbook('textbook');
        this.main = new Control(null, 'div', 'main');
    }

    drawStaticInterface() {
        createHeader(this.root);
        createSideMenu(this.root);
        this.root.append(this.main.node);
        createFooter(this.root);
    }

    drawCurrentView() {
        this.main.node.innerHTML = '';
        this.textbook.render(this.main.node);
    }
}

// export const createLayout = (root: HTMLElement) => {
//     createHeader(root);
//     createSideMenu(root);
//     createMain(root);
//     createFooter(root);
// };
