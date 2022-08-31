import { createHeader } from './header/header';
import { createSideMenu } from './side-menu/side-menu';
import { createFooter } from './footer/footer';
import Textbook from './pages/textbook/textbook';
import Control from './control';
import { IState } from '../controller/controller';
import { IWord } from '../api/interfaces';
import SprintGame from '../games/sprint/sprint';
import { SprintGameLaunchMode } from '../games/sprint/types/index';

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

    drawCurrentView(state: IState, data?: IWord[]) {
        this.main.node.innerHTML = ``;
        const wordArr = data ? data : [];
        switch (state.view) {
            case 'textbook':
                this.textbook.render(this.main.node, wordArr);
                break;
            case 'games':
                this.drawGamesPage();
                break;
            default:
                new Control(this.main.node, 'div', `${state.view}`, `Hello!! I'm ${state.view} page`);
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
