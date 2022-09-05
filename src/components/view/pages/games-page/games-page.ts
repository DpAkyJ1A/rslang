import Control from 'control';
import SprintGame from '../../../games/sprint/sprint';
import { SprintGameLaunchMode } from '../../../games/sprint/types/index';
import Page from '../page';
import { createPageHeader } from '../common/pageHeader/pageHeader';

export default class GamesPage extends Page {
    constructor() {
        super('games-page');
    }
    public render(container: HTMLElement) {
        this.container.innerHTML = '';
        this.createGamesPage();
        container.append(this.container);
    }

    createGamesPage() {
        const header = createPageHeader('Games', false);
        this.container.append(header);
        const gamesDiv = new Control(this.container, 'div', 'games__container');
        const divGame1 = new Control(gamesDiv.node, 'div', 'games__game1');
        new Control(divGame1.node, 'button', 'games__audio-game');
        new Control(divGame1.node, 'h3', 'games__title', 'sprint');
        const divGame2 = new Control(gamesDiv.node, 'div', 'games__game2');
        const btn = new Control(divGame2.node, 'button', 'games__sprint');
        new Control(divGame2.node, 'h3', 'games__title', 'audio game');
        let sprint: SprintGame | null;
        btn.node.onclick = () => {
            sprint = new SprintGame(SprintGameLaunchMode.textbook, this.container);
            sprint.start();
        };
    }
}
