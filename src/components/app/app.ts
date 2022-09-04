import Controller, { IState } from '../controller/controller';
import AppView from '../view/appView';

export class App {
    private root: HTMLElement;
    private view: AppView;
    private controller: Controller;
    constructor(root: HTMLElement, state: IState) {
        this.root = root;
        this.view = new AppView(root);
        this.controller = new Controller(state, (state, data?) => this.view.drawCurrentView(state, data));
    }

    start(data: { isAuth: boolean; name: string }) {
        this.view.drawStaticInterface(data);
        this.controller.handleLocation();
    }
}
