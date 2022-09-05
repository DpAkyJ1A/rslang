import SprintController from './controller/controller';
import { IGameProps, IGameResult, IGameWord, ISprintGameState, SprintGameLaunchMode } from './types/index';
import SprintView from './view/view';

export default class SprintGame {
    private controller: SprintController;
    private view: SprintView;
    private container: HTMLElement;
    // private userId: string;
    // private props: { group: number; page: number };

    constructor(
        launchMode: SprintGameLaunchMode,
        container: HTMLElement,
        user: { id: string; token: string },
        props?: { group: number; page: number } | undefined
    ) {
        this.view = new SprintView();
        this.controller = new SprintController(
            launchMode,
            (state: ISprintGameState, word?: IGameWord, propsGame?: IGameProps, result?: IGameResult) =>
                this.view.drawContent(state, word, propsGame, result),
            user,
            props
        );
        this.container = container;
    }

    start() {
        this.view.drawWrapper(this.container);
        this.controller.updateGameContentField();
        this.controller.listen();
    }
}
