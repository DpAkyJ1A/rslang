import { shuffleArray } from '../../../utils/shuffleArray';
import { AudioGameModel } from '../model/audio-game-model';
import {
    AudioGameLaunchMode,
    AudioGameStages,
    IAudioGameState,
    IGameProps,
    IGameResult,
    IGameWord,
    TAudioViewCb,
} from '../types/audiocall-types';
import audioWin from '../../../../assets/sounds/right.wav';
import audioLoose from '../../../../assets/sounds/wrong.wav';

const playWin = new Audio(audioWin);
const playLoose = new Audio(audioLoose);
export default class AudioGameController extends AudioGameModel {
    private state: IAudioGameState;
    private drawContent: TAudioViewCb;
    private gameState: IGameProps;
    private gameResult: IGameResult;

    constructor(launchMode: AudioGameLaunchMode, cb: TAudioViewCb, userId?: string) {
        super();
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
        this.state.stage = AudioGameStages.welcome;
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
        this.gameResult.right = [];
        this.gameResult.wrong = [];
        for(let i = 0; i < words.length; i++) {
                this.updateGameContentField(words[i]);
        }
        
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
        this.state.stage = AudioGameStages.game;
        this.startGame(event.detail.group);
        this.state.group = event.detail.group;
        window.removeEventListener('startGame', this.handleStartGame as EventListener);
    }

    handleTimeout() {
        this.state.stage = AudioGameStages.results;
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


// для отображение правильного ответа класс word-correct 
// неправильного класс word-wrong

// после показа ответа меняем контент внутри audio-game__sound-btn с свгшки на 
// new Control(null, 'img', 'audio-game__img').node.setAttrr... src; -стиль не добавлен
// new Control(null, 'p', 'audio-game__answer', '').node.setAttrr... src; - стиль добавлен