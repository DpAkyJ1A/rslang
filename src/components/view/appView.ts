import { createHeader } from './header/header';
import { createSideMenu } from './side-menu/side-menu';
import { createFooter } from './footer/footer';
import { createScrollUpBtn } from './pages/common/scrollUpBtn/scrollUpBtn';
import TextbookPage from './pages/textbook-page/textbook-page';
import DictionaryPage from './pages/dictionary-page/dictionary-page';
import StatsPage from './pages/stats-page/stats-page';
import ErrorPage from './pages/error-page/error-page';
import Control from './control';
import { IState } from '../controller/controller';
import { IWord } from '../api/interfaces';
import SprintGame from '../games/sprint/sprint';
import { SprintGameLaunchMode } from '../games/sprint/types/index';
import AuthInit from './pages/auth/authinit';
import MainPage from './pages/main-page/main-page';

export default class AppView {
    private root: HTMLElement;
    private mainPage: MainPage;
    private textbook: TextbookPage;
    private dictionaryPage: DictionaryPage;
    private statsPage: StatsPage;
    private errorPage: ErrorPage;
    main: Control;
    constructor(root: HTMLElement) {
        this.root = root;
        this.mainPage = new MainPage();
        this.textbook = new TextbookPage();
        this.dictionaryPage = new DictionaryPage();
        this.statsPage = new StatsPage();
        this.errorPage = new ErrorPage();
        this.main = new Control(null, 'div', 'main');
    }

    drawStaticInterface(data: { isAuth: boolean; name: string }) {
        createHeader(this.root, data);
        createSideMenu(this.root);
        this.root.append(this.main.node);
        createFooter(this.root);
        this.root.append(createScrollUpBtn(this.main.node));
    }

    drawCurrentView(state: IState, data?: IWord[]) {
        console.log(state);
        this.main.node.innerHTML = ``;
        const wordArr = data ? data : [];
        switch (state.view) {
            case 'main':
                this.mainPage.render(this.main.node);
                break;
            case 'textbook':
                this.textbook.render(this.main.node, wordArr);
                break;
            case 'dictionary':
                this.dictionaryPage.render(this.main.node, wordArr);
                break;
            case 'games':
                this.drawGamesPage();
                break;
            case 'stats':
                this.statsPage.render(this.main.node);
                break;
            case 'auth':
                this.drawAuthPage();
                break;
            default:
                this.errorPage.render(this.main.node);
        }
    }

    drawGamesPage() {
        const btn = new Control(this.main.node, 'button', '', 'Sprint');
        let sprint: SprintGame | null;
        btn.node.onclick = () => {
            // const className = 'SprintGame';
            // const test = document.getElementsByClassName(className) as HTMLCollection;
            // console.log(test);
            // for (const item of test) {
            //     item.classList.remove(className);
            // }
            // if (sprint) {
            //     sprint = null;
            //     console.log('exists!');
            //     console.log(sprint);
            // }
            sprint = new SprintGame(SprintGameLaunchMode.textbook, this.main.node);
            sprint.start();
        };
    }

    drawAuthPage() {
        const auth = new AuthInit(this.main.node);
        auth.start();
    }
}
