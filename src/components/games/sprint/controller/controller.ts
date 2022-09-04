import { SprintModel } from '../model/model';
import {
    IGameProps,
    IGameResult,
    IGameWord,
    ISprintGameState,
    SprintGameLaunchMode,
    SprintGameStages,
    TSprintViewCb,
} from '../types/index';

import audioWin from '../../../../assets/sounds/right.wav';
import audioLoose from '../../../../assets/sounds/wrong.wav';

const playWin = new Audio(audioWin);
const playLoose = new Audio(audioLoose);

export default class SprintController extends SprintModel {
    private state: ISprintGameState;
    private drawContent: TSprintViewCb;
    private gameState: IGameProps;
    private gameResult: IGameResult;

    constructor(launchMode: SprintGameLaunchMode, cb: TSprintViewCb, userId?: string) {
        super();
        this.drawContent = cb;
        this.state = {
            mode: launchMode,
            stage: SprintGameStages.welcome,
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
        this.handleTimeout = this.handleTimeout.bind(this);
        this.handleStartGame = this.handleStartGame.bind(this);
        this.handleRestartGame = this.handleRestartGame.bind(this);
        window.addEventListener('keyup', (e: KeyboardEvent) => {
            e.stopPropagation();
            e.stopImmediatePropagation();
            const content = document.querySelector('.content');
            if (!content) return;
            switch (e.code) {
                case 'ArrowLeft':
                    (content.querySelector('.content__answer-button_true') as HTMLButtonElement)?.click();
                    break;
                case 'ArrowRight':
                    (content.querySelector('.content__answer-button_false') as HTMLButtonElement)?.click();
                    break;
                case 'KeyS':
                    (content.querySelector('.content__start-btn') as HTMLButtonElement)?.click();
                    break;
                case 'Space':
                    (content.querySelector('.button__again') as HTMLButtonElement)?.click();
                    break;
                default:
                    return;
            }
        });
        window.addEventListener('startGame', this.handleStartGame as EventListener);
        document.addEventListener('sprintTimeout', this.handleTimeout);
        document.addEventListener('restartGame', this.handleRestartGame);
        // document.addEventListener('toggleSound', (e: Event) => {
        //     e.stopImmediatePropagation();
        //     e.stopPropagation();
        //     this.state.sound = !this.state.sound;
        // });
    }

    handleRestartGame() {
        this.state.stage = SprintGameStages.welcome;
        this.gameState.score = 0;
        this.gameState.row = 0;
        this.updateGameContentField();
        window.addEventListener('startGame', this.handleStartGame as EventListener);
        document.addEventListener('sprintTimeout', this.handleTimeout);
    }

    updateGameContentField(word?: IGameWord) {
        this.drawContent(this.state, word || undefined, this.gameState || undefined, this.gameResult);
    }

    async startGame(group: number) {
        const words = (await super.getWordsForGame(group)) as IGameWord[];
        let i = 0;
        this.gameResult.right = [];
        this.gameResult.wrong = [];
        const loop = () => {
            if (i < words.length) {
                this.updateGameContentField(words[i]);
                (document.querySelectorAll('.content__answer-button') as NodeList).forEach((btn) => {
                    btn.addEventListener('answerBtn', ((event: CustomEvent) => {
                        const answer = event.detail.answer === 'False' ? false : true;
                        if (this.state.sound) {
                            this.playSound(answer === words[i].answer);
                        }
                        this.handleAnswer({ word: words[i], answer: answer });
                        i++;
                        loop();
                    }) as EventListener);
                });
            } else {
                this.state.stage = SprintGameStages.results;
                this.updateGameContentField(undefined);
            }
        };
        if (i === 0) loop();
    }

    handleAnswer(data: { word: IGameWord; answer: boolean }) {
        if (data.answer === data.word.answer) {
            switch (this.gameState.row) {
                case 0:
                    this.gameState.row += 1;
                    this.gameState.score += 20;
                    break;
                case 1:
                    this.gameState.row += 1;
                    this.gameState.score += 20;
                    break;
                case 2:
                    this.gameState.row += 1;
                    this.gameState.score += 60;
                    break;
                case 3:
                    this.gameState.row = 1;
                    this.gameState.score += 20;
                    break;
                default:
            }
            this.gameResult.right.push(data.word);
        } else {
            this.gameResult.wrong.push(data.word);
            this.gameState.row = 0;
        }
    }

    playSound(answer: boolean) {
        try {
            playWin.load();
            playLoose.pause();
        } finally {
            answer ? playWin.play() : playLoose.play();
        }
    }

    handleStartGame(event: CustomEvent) {
        this.state.stage = SprintGameStages.game;
        this.startGame(event.detail.group);
        this.state.group = event.detail.group;
        window.removeEventListener('startGame', this.handleStartGame as EventListener);
    }

    handleTimeout() {
        this.state.stage = SprintGameStages.results;
        this.updateGameContentField();
        document.removeEventListener('sprintTimeout', this.handleTimeout);
    }

    listen() {
        document.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;
            if (!target.closest('div')?.classList.contains('sprint-game__sound')) return;
            console.log('nenSound');
            this.state.sound = !this.state.sound;
            target.classList.toggle('sprint-game__sound_active');
        });
    }
}
