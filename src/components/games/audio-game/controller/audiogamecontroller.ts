import { shuffleArray } from '../../../utils/shuffleArray';
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
        this.drawContent = cb;
        this.state = {
            mode: launchMode,
            stage: AudioGameStages.game,
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

    }
    updateGameContentField(word?: IGameWord) {
        this.drawContent(this.state, word || undefined, this.gameState || undefined, this.gameResult);
    }
    setAllTranslateWordsToState = () => {

    }

}

// для отображение правильного ответа класс word-correct 
// неправильного класс word-wrong

// после показа ответа меняем контент внутри audio-game__sound-btn с свгшки на 
// new Control(null, 'img', 'audio-game__img').node.setAttrr... src; -стиль не добавлен
// new Control(null, 'p', 'audio-game__answer', '').node.setAttrr... src; - стиль добавлен

