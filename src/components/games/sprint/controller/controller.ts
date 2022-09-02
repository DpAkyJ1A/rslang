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
        };
        this.gameState = {
            score: 0,
            row: 0,
        };
        this.gameResult = {
            right: [],
            wrong: [],
        };
        window.addEventListener('keyup', (e: KeyboardEvent) => {
            const content = document.querySelector('.content');
            e.stopPropagation();
            if (!content) return;
            console.log(e.key);
            switch (e.code) {
                case 'ArrowLeft':
                    (content.querySelector('.content__answer-button_true') as HTMLButtonElement).click();
                    break;
                case 'ArrowRight':
                    (content.querySelector('.content__answer-button_false') as HTMLButtonElement).click();
                    break;
                case 's':
                    (content.querySelector('.content__start-btn') as HTMLButtonElement).click();
                    break;
                case 'Space':
                    (content.querySelector('.button__again') as HTMLButtonElement).click();
                    break;
                default:
                    return;
            }
        });
        window.addEventListener('startGame', ((event: CustomEvent) => {
            this.state.stage = SprintGameStages.game;
            this.startGame(event.detail.group);
        }) as EventListener);
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
}
