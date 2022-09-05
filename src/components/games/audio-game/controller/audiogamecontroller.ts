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

    }

    updateGameContentField(word?: IGameWord) {
        this.drawContent(this.state, word || undefined, this.gameState || undefined, this.gameResult);
    }

}
