import AudioGameController from "./controller/audiogamecontroller";
import { AudioGameLaunchMode, IAudioGameState, IGameProps, IGameResult, IGameWord } from "./types/audiocall-types";
import AudioView from "./view/audio-game-view";

export default class AudioGame {
    private controller: AudioGameController;
    private view: AudioView;
    private container: HTMLElement;

    constructor(launchMode: AudioGameLaunchMode, container: HTMLElement, userId?: string) {
        this.view = new AudioView();
        this.controller = new AudioGameController(launchMode,
            (props: IAudioGameState, word?: IGameWord, propsGame?: IGameProps, result?: IGameResult) =>
                this.view.drawContent(props, word, propsGame, result),
            userId
        );
        this.container = container;
    }

    start() {
        this.view.drawWrapper(this.container);
        this.controller.updateGameContentField();
        this.controller.listen();
    }
}
