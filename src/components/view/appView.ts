import { createHeader } from './header/header';
import { createSideMenu } from './side-menu/side-menu';
import { createFooter } from './footer/footer';
import { createScrollUpBtn } from './pages/common/scrollUpBtn/scrollUpBtn';
import TextbookPage from './pages/textbook-page/textbook-page';
import DictionaryPage from './pages/dictionary-page/dictionary-page';
import ErrorPage from './pages/error-page/error-page';
import Control from './control';
import { IState } from '../controller/controller';
import { IWord } from '../api/interfaces';
import SprintGame from '../games/sprint/sprint';
import { SprintGameLaunchMode } from '../games/sprint/types/index';

export default class AppView {
    private root: HTMLElement;
    private textbook: TextbookPage;
    private dictionaryPage: DictionaryPage;
    private errorPage: ErrorPage;
    main: Control;
    constructor(root: HTMLElement) {
        this.root = root;
        this.textbook = new TextbookPage();
        this.dictionaryPage = new DictionaryPage();
        this.errorPage = new ErrorPage();
        this.main = new Control(null, 'div', 'main');
    }

    drawStaticInterface() {
        createHeader(this.root);
        createSideMenu(this.root);
        this.root.append(this.main.node);
        createFooter(this.root);
        this.root.append(createScrollUpBtn(this.main.node));
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
            case 'games':
                this.drawGamesPage();
                break;
            default:
                this.errorPage.render(this.main.node);
        }
    }

    drawGamesPage() {
        const btn = new Control(this.main.node, 'button', '', 'Sprint');
        btn.node.onclick = () => {
            const sprint = new SprintGame(SprintGameLaunchMode.textbook);
            sprint.start();
        };
    }
}

// export const createLayout = (root: HTMLElement) => {
//     createHeader(root);
//     createSideMenu(root);
//     createMain(root);
//     createFooter(root);
// };
