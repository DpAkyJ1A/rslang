import SprintController from './controller/controller';
import { IGameProps, IGameResult, IGameWord, ISprintGameState, SprintGameLaunchMode } from './types/index';
import SprintView from './view/view';

export default class SprintGame {
    private controller: SprintController;
    private view: SprintView;
    private container: HTMLElement;

    constructor(launchMode: SprintGameLaunchMode, container: HTMLElement, userId?: string) {
        this.view = new SprintView();
        this.controller = new SprintController(
            launchMode,
            (props: ISprintGameState, word?: IGameWord, propsGame?: IGameProps, result?: IGameResult) =>
                this.view.drawContent(props, word, propsGame, result),
            userId
        );
        this.container = container;
    }

    start() {
        this.view.drawWrapper(this.container);
        this.controller.updateGameContentField();
    }
}
