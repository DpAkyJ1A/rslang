import Control from 'control';
import AudioGame from '../../../games/audio-game/audio-game';
import { AudioGameLaunchMode } from '../../../games/audio-game/types/audiocall-types';
import SprintGame from '../../../games/sprint/sprint';
import { SprintGameLaunchMode } from '../../../games/sprint/types/index';
import Page from '../page';

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
        new Control(this.container, 'h2', 'games__title', 'Игры');
        const gamesDiv = new Control(this.container, 'div', 'games__container');
        const divGame1 = new Control(gamesDiv.node, 'div', 'games__game1');
        const btnAudio = new Control(divGame1.node, 'button', 'games__audio-game');
        new Control(divGame1.node, 'h3', 'games__title', 'sprint');
        const divGame2 = new Control(gamesDiv.node, 'div', 'games__game2');
        const btnSprint = new Control(divGame2.node, 'button', 'games__sprint');
        new Control(divGame2.node, 'h3', 'games__title', 'audio game');
        let sprint: SprintGame | null;
        btnSprint.node.onclick = () => {
            sprint = new SprintGame(SprintGameLaunchMode.textbook, this.container);
            sprint.start();
        }
        let audioGame: AudioGame | null;
        btnAudio.node.onclick = () => {
            audioGame = new AudioGame(AudioGameLaunchMode.textbook, this.container);
            audioGame.start();
        }
    }
}