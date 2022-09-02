import AuthController from '../../../controller/auth-controller';
import AuthModel from '../../../model/auth-model';
import AuthorizationView from './authorizationView';

// const main = document.querySelector('.main') as HTMLElement;
//доступ к мейну подключить, пока для визуализации прицепила вниз боди

export default class AuthInit {
    view: AuthorizationView;
    model: AuthModel;
    controller: AuthController;
    constructor(parentNode: HTMLElement) {
        this.view = new AuthorizationView(parentNode);
        this.model = new AuthModel();
        this.controller = new AuthController(this.view, this.model);
    }
    start() {
        this.controller.start();
    }
}
