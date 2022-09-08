import { SprintGameLaunchMode, SprintGameStages } from 'components/games/sprint/types';
import { AudioGameModel } from '../model/audio-game-model';
import { AudioGameStages, IAudioGameResult, IAudioGameWord } from '../types';
import AudioView from '../view/audio-game-view';

import audioWin from '../../../../assets/sounds/right.wav';
import audioLoose from '../../../../assets/sounds/wrong.wav';

const playWin = new Audio(audioWin);
const playLoose = new Audio(audioLoose);

export default class AudioGameController extends AudioGameModel {
    private view;
    private state;
    private gameResult: IAudioGameResult;
    private gameState;
    constructor(
        view: AudioView,
        launchMode: SprintGameLaunchMode,
        user: { id: string; token: string },
        source: { group: number; page: number } | undefined
    ) {
        super();
        this.view = view;
        this.state = {
            mode: launchMode,
            stage: AudioGameStages.welcome,
            user: user,
            source: source,
        };
        this.gameResult = {
            right: [],
            wrong: [],
            longestRow: 0,
            currentRow: 0,
        };
        this.gameState = {
            score: 0,
            row: 0,
        };
        window.addEventListener('startGame', this.handleStartGame as EventListener);
        document.addEventListener('restartGame', this.handleRestartGame);
    }

    handleStartGame = (event: CustomEvent) => {
        this.state.stage = AudioGameStages.game;
        this.startGame(event.detail?.group || undefined);
        // this.state.group = event.detail.group;
        window.removeEventListener('startGame', this.handleStartGame as EventListener);
    };

    handleRestartGame = () => {
        this.state.stage = AudioGameStages.welcome;
        this.gameState.score = 0;
        this.gameState.row = 0;
        this.gameResult.currentRow = 0;
        this.gameResult.longestRow = 0;
        this.updateGameContentField();
        window.addEventListener('startGame', this.handleStartGame as EventListener);
    };

    async startGame(group?: number) {
        let words: IAudioGameWord[];
        if (group) {
            words = (await super.getWordsForGame(group)) as IAudioGameWord[];
        } else {
            if (!this.state.user?.id) {
                words = await super.getWordsForGame(
                    this.state.source?.group as number,
                    this.state.source?.page as number
                );
            } else {
                words = await super.getWordsForGameAuth(
                    this.state.source?.group as number,
                    this.state.source?.page as number,
                    this.state.user
                );
            }
        }
        let i = 0;
        this.gameResult.right = [];
        this.gameResult.wrong = [];
        const loop = () => {
            if (i < words.length) {
                this.updateGameContentField(words[i]);
                document.querySelector('audio')?.play();
                (document.querySelectorAll('.content__answers-btn') as NodeList).forEach((btn) => {
                    btn.addEventListener('answerBtn', ((event: CustomEvent) => {
                        if (event.detail.answer === 'dismiss') {
                            playLoose.play();
                        } else {
                            const answer = event.detail.answer === 'true' ? true : false;
                            this.playSound(answer);
                            this.handleAnswer(answer, words[i]);
                            i++;
                            setTimeout(loop, 1500);
                        }
                    }) as EventListener);
                });
            } else {
                this.state.stage = AudioGameStages.results;
                this.updateGameContentField(undefined);
            }
        };
        if (i === 0) loop();
    }

    updateGameContentField(word?: IAudioGameWord) {
        this.view.drawContent(this.state.stage, this.state.mode, word, this.gameState, this.gameResult);
        if (this.state.stage === AudioGameStages.results && this.state.user?.id)
            super.updateDataForStats(this.state.user, 'sprint', this.gameState.score, this.gameResult);
    }

    playSound(answer: boolean) {
        try {
            playWin.load();
            playLoose.pause();
        } finally {
            answer ? playWin.play() : playLoose.play();
        }
    }

    handleAnswer(answer: boolean, word: IAudioGameWord) {
        if (answer) {
            this.gameResult.currentRow += 1;
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
            this.gameResult.longestRow = this.gameResult.currentRow;
            this.gameResult.right.push(word);
        } else {
            if (this.gameResult.currentRow > this.gameResult.longestRow) {
                this.gameResult.longestRow = this.gameResult.currentRow;
            }
            this.gameResult.currentRow = 0;
            this.gameResult.wrong.push(word);
            this.gameState.row = 0;
        }
    }

    listen() {}
}
