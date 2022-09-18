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
import { IStatistics, IWord } from '../api/interfaces';
import AuthInit from './pages/auth/authinit';
import MainPage from './pages/main-page/main-page';
import GamesPage from './pages/games-page/games-page';
import TeamPage from './pages/team-page/team-page';
import NoAccessPage from './pages/no-access-page/no-access-page';

export default class AppView {
    private root: HTMLElement;
    private mainPage: MainPage;
    private textbook: TextbookPage;
    private dictionaryPage: DictionaryPage;
    private games: GamesPage;
    private statsPage: StatsPage;
    private teamPage: TeamPage;
    private errorPage: ErrorPage;
    private noAccessPage: NoAccessPage;
    main: Control;
    constructor(root: HTMLElement) {
        this.root = root;
        this.mainPage = new MainPage();
        this.textbook = new TextbookPage();
        this.dictionaryPage = new DictionaryPage();
        this.games = new GamesPage();
        this.statsPage = new StatsPage();
        this.teamPage = new TeamPage();
        this.errorPage = new ErrorPage();
        this.noAccessPage = new NoAccessPage();
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
        this.main.node.innerHTML = ``;
        const wordArr = data ? data : [];
        switch (state.view) {
            case 'main':
                this.mainPage.render(this.main.node);
                break;
            case 'textbook':
                this.textbook.render(this.main.node, state, wordArr);
                break;
            case 'dictionary':
                this.dictionaryPage.render(this.main.node, wordArr);
                break;
            case 'games':
                this.games.render(this.main.node, { id: state.user.id, token: state.user.token });
                break;
            case 'stats':
                this.statsPage.render(this.main.node);
                break;
            case 'team':
                this.teamPage.render(this.main.node);
                break;
            case 'auth':
                this.drawAuthPage();
                break;
            default:
                this.errorPage.render(this.main.node);
        }
    }
    drawNoAccessPage(name: string) {
        this.main.node.innerHTML = ``;
        this.noAccessPage.render(this.main.node, name);
    }
    drawStatsPage(state: IState, data: IStatistics | null | undefined) {
        this.main.node.innerHTML = ``;
        this.statsPage.render(this.main.node, data);
    }
    drawAuthPage() {
        const auth = new AuthInit(this.main.node);
        auth.start();
    }
}
