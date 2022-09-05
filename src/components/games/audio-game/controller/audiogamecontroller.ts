import {
    AudioGameLaunchMode,
    AudioGameStages,
    IAudioGameState,
    IGameProps,
    IGameResult,
    IGameWord,
    TAudioViewCb,
} from '../types/audiocall-types';

export default class AudioGameController {
    private state: IAudioGameState;
    private drawContent: TAudioViewCb;
    private gameState: IGameProps;
    private gameResult: IGameResult;

    constructor(launchMode: AudioGameLaunchMode, cb: TAudioViewCb, userId?: string) {
        // super();
        this.drawContent = cb;
        this.state = {
            mode: launchMode,
            stage: AudioGameStages.welcome,
            userId: userId,
            group: undefined,
            sound: false,
        };
        this.gameState = {
            score: 0,
            row: 0,
        };
        this.gameResult = {
            right: [],
            wrong: [],
        };
        // this.handleTimeout = this.handleTimeout.bind(this);
        // this.handleStartGame = this.handleStartGame.bind(this);
        // this.handleRestartGame = this.handleRestartGame.bind(this);
        // window.addEventListener('keyup', (e: KeyboardEvent) => {
        //     e.stopPropagation();
        //     e.stopImmediatePropagation();
        //     const content = document.querySelector('.content');
        //     if (!content) return;
        //     switch (e.code) {
        //         case 'ArrowLeft':
        //             (content.querySelector('.content__answer-button_true') as HTMLButtonElement)?.click();
        //             break;
        //         case 'ArrowRight':
        //             (content.querySelector('.content__answer-button_false') as HTMLButtonElement)?.click();
        //             break;
        //         case 'KeyS':
        //             (content.querySelector('.content__start-btn') as HTMLButtonElement)?.click();
        //             break;
        //         case 'Space':
        //             (content.querySelector('.button__again') as HTMLButtonElement)?.click();
        //             break;
        //         default:
        //             return;
        //     }
        // });
        // window.addEventListener('startGame', this.handleStartGame as EventListener);
        // document.addEventListener('sprintTimeout', this.handleTimeout);
        // document.addEventListener('restartGame', this.handleRestartGame);

        // document.addEventListener('toggleSound', (e: Event) => {
        //     e.stopImmediatePropagation();
        //     e.stopPropagation();
        //     this.state.sound = !this.state.sound;
        // });
    }
    updateGameContentField(word?: IGameWord) {
        this.drawContent(this.state, word || undefined, this.gameState || undefined, this.gameResult);
    }
}
