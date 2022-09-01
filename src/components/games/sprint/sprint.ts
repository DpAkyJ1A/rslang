import SprintController from './controller/controller';
import { IGameProps, IGameResult, IGameWord, ISprintGameState, SprintGameLaunchMode } from './types/index';
import SprintView from './view/view';

export default class SprintGame {
    private controller: SprintController;
    private view: SprintView;

    constructor(launchMode: SprintGameLaunchMode, userId?: string) {
        this.view = new SprintView();
        this.controller = new SprintController(
            launchMode,
            (props: ISprintGameState, word?: IGameWord, propsGame?: IGameProps, result?: IGameResult) =>
                this.view.drawContent(props, word, propsGame, result),
            userId
        );
    }

    start() {
        this.view.drawWrapper(document.body);
        this.controller.updateGameContentField();
    }
}
