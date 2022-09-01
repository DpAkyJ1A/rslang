import { IUser } from "../api/interfaces";
import AuthModel from "../model/auth-model";
import state from "../utils/state";
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
        this.view.signInView.buttonSubmit.node.addEventListener('click', this.submitSignBtnHandler);
        this.view.authView.registration.node.addEventListener('click', this.goToSignIn);
        this.view.signInView.registration.node.addEventListener('click', this.goToAuth);
        this.view.authView.buttonSubmit.node.addEventListener('click', this.loginUser);
    }
    goToSignIn = () => {
        this.view.drawSignInView();
    }
    goToAuth = () => {
        this.view.drawAuthInView();
    }
    submitAuthBtnHandler = (event: Event) => {
        event.preventDefault();
       
    }
    submitSignBtnHandler = (event: Event) => {
        event.preventDefault();
        
        const name = this.view.signInView.inputName.node.value;
        const email = this.view.signInView.inputMail.node.value;
        const password = this.view.signInView.inputPass.node.value;

        if (this.model.isValidName(name)) {
            this.view.signInView.inputName.node.style.border = 'none';
            this.view.signInView.errName.node.textContent = '';
        }
        else {
            this.view.signInView.errName.node.textContent = 'Поле должно содержать только буквы';
            this.view.signInView.inputName.node.style.border = '2px solid red';
            return;
        }
         //проверка на отсутствие пробелов, наличие улитки, точки, пустой строки
         if (this.model.isValidMail(email)) {
            this.view.signInView.inputMail.node.style.border = 'none';
            this.view.signInView.errMail.node.textContent = '';
        }
        else {
            this.view.signInView.errMail.node.textContent = 'Некорректный e-mail, введите корректный';
            this.view.signInView.inputMail.node.style.border = '2px solid red';
            return;
        }
        //проверка на 8 символов, и обязательное начилие 1 цифры
        if (this.model.isValidPassword(password)) {
            this.view.signInView.inputPass.node.style.border = 'none';
            this.view.signInView.errPass.node.textContent = '';
        }
        else {
            this.view.signInView.errPass.node.textContent = 'Пароль должен содержать 8 символов и иметь хотя бы одну цифру';
            this.view.signInView.inputPass.node.style.border = '2px solid red';
            return;
        }

        this.model.sendUserDataToBase({name, email, password}).then( () => {
            this.view.signInView.inputName.node.value = '';
            this.view.signInView.inputMail.node.value = '';
            this.view.signInView.inputPass.node.value = '';
            }
        );

        this.view.drawAuthInView();
        //проверка на успешный ответ от базы - может сделать задержку/спиннер?
        this.view.authView.successSign.node.textContent = 'Регистрация успешна! Выполните вход';
    }
    loginUser = (event: Event) => {
        event.preventDefault();
        const email = this.view.authView.inputMail.node.value;
        const password = this.view.authView.inputPass.node.value;
        this.model.sendSighInUserDataToBase({ email, password }).then( () => {
            this.view.authView.inputMail.node.value = '';
            this.view.authView.inputPass.node.value = '';
            console.log('happy!');
            //переход на страницу учебника (спинер)
        }); 
        if (this.model.isValidMail(email)) {
            this.view.authView.inputMail.node.style.border = 'none';
            this.view.authView.errMail.node.textContent = '';
        }
        else {
            this.view.authView.errMail.node.textContent = 'Некорректный e-mail, введите корректный';
            this.view.authView.inputMail.node.style.border = '2px solid red';
            return;
        }
        if (this.model.isValidPassword(password)) {
            this.view.authView.inputPass.node.style.border = 'none';
            this.view.authView.errPass.node.textContent = '';
        }
        else {
            this.view.authView.errPass.node.textContent = 'Пароль должен содержать 8 символов';
            this.view.authView.inputPass.node.style.border = '2px solid red';
            return;
        }
        this.view.authView.successSign.node.textContent = '';
    }

    logOutUser() {
        document.querySelector('.header__auth-wrapper');
        localStorage.clear();
    }
}
