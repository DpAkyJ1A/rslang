import { IUser } from "../api/interfaces";
import AuthModel from "../model/auth-model";
import AuthorizationView from "../view/pages/auth/authorizationView";
import SignInView from "../view/pages/auth/sign-view";

export default class AuthController {
    view: AuthorizationView;
    model: AuthModel;
    constructor(view: AuthorizationView, model: AuthModel) {
        this.view = view;
        this.model = model;
    }
    start() {
        this.view.authView.buttonSubmit.node.addEventListener('click', this.getUserData);
        this.view.authView.registration.node.addEventListener('click', this.goToSignIn);
        this.view.signInView.login.node.addEventListener('click', this.goToAuth);
    }
    goToSignIn = () => {
        this.view.drawSignInView();
    }
    goToAuth = () => {
        this.view.drawAuthInView();
    }
    // validateUserData(data: IUser) {
    //     if(data.email === '') {
    //         this.view.errMail.node.textContent = 'Поле не может быть пустым, введите e-mail';
    //         this.view.buttonSubmit.node.setAttribute('disabled', 'disabled');
    //     }
    //     else if(data.password === '') {
    //         this.view.errPass.node.textContent = 'Поле не может быть пустым, введите пароль';
    //         this.view.buttonSubmit.node.setAttribute('disabled', 'disabled');
    //     }
    //     else if(data.password.length !== 8) {
    //         this.view.errPass.node.textContent = 'Пароль должен содержать 8 символов';
    //         this.view.buttonSubmit.node.setAttribute('disabled', 'disabled');
    //     }
    //     else return data;
    // }
    getUserData() {
        // const mail = this.view.inputMail.node.value;
        // const pass = this.view.inputPass.node.value;
        // this.validateUserData({mail, pass});
        console.log('kate');
    }

}