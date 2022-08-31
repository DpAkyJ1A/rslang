import { createHeader } from './header/header';
import { createSideMenu } from './side-menu/side-menu';
import { createFooter } from './footer/footer';
import Textbook from './pages/textbook/textbook';
import DictionaryPage from './pages/dictionary-page/dictionary-page';
import ErrorPage from './pages/error-page/error-page';
import Control from './control';
import { IState } from '../controller/controller';
import { IWord } from '../api/interfaces';

export default class AppView {
    private root: HTMLElement;
    private textbook: Textbook;
    private dictionaryPage: DictionaryPage;
    private errorPage: ErrorPage;
    main: Control;
    constructor(root: HTMLElement) {
        this.root = root;
        this.textbook = new Textbook('textbook');
        this.dictionaryPage = new DictionaryPage();
        this.errorPage = new ErrorPage('error-page');
        this.main = new Control(null, 'div', 'main');
    }

    drawStaticInterface() {
        createHeader(this.root);
        createSideMenu(this.root);
        this.root.append(this.main.node);
        createFooter(this.root);
    }

    drawCurrentView(state: IState, data?: IWord[]) {
        this.main.node.innerHTML = ``;
        const wordArr = data ? data : [];
        switch (state.view) {
            case 'textbook':
                this.textbook.render(this.main.node, wordArr);
                break;
            case 'dictionary':
                this.dictionaryPage.render(this.main.node, wordArr);
                break;
            default:
                this.errorPage.render(this.main.node);
        }
    }
}

// export const createLayout = (root: HTMLElement) => {
//     createHeader(root);
//     createSideMenu(root);
//     createMain(root);
//     createFooter(root);
// };
