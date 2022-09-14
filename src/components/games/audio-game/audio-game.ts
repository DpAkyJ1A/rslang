import { SprintGameLaunchMode } from '../sprint/types';
import AudioGameController from './controller/audio-game-controller';
import AudioView from './view/audio-game-view';

export default class AudioGame {
    private view: AudioView;
    private controller: AudioGameController;
    constructor(
        launchMode: SprintGameLaunchMode,
        user: { id: string; token: string },
        source?: { group: number; page: number }
    ) {
        this.view = new AudioView();
        this.controller = new AudioGameController(this.view, launchMode, user, source);
    }

    start(container: HTMLElement) {
        container.append(this.view.wrapper.node);
        this.controller.updateGameContentField();
        this.controller.listen();
    }
}
