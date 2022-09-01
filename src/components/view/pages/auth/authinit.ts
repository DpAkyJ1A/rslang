import AuthController from "../../../controller/auth-controller";
import AuthModel from "../../../model/auth-model";
import Page from "../page";
import AuthorizationView from "./authorizationView";

// const main = document.querySelector('.main') as HTMLElement;
//доступ к мейну подключить, пока для визуализации прицепила вниз боди

export default class AuthInit{
    view: AuthorizationView;
    model: AuthModel;
    controller: AuthController;
    constructor() {
        this.view = new AuthorizationView(document.body);
        this.model = new AuthModel();
        this.controller = new AuthController(this.view, this.model);
    }
    start() {
        this.controller.start();
    }
}