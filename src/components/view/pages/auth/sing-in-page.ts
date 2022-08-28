import Control from "../../control";
import Page from "../page";

export default class SignInView extends Control {
        h2;
        inputMail;
        inputPass;
        buttonSubmit;
        registration;
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'section', 'auth__wrapper');
        this.h2 = new Control(this.node, 'h2', 'auth__h2', 'Введите данные для регистрации');
        this.inputMail = new Control<HTMLInputElement>(this.node, 'input', 'auth__input');
        Object.assign(this.inputMail.node, {
            placeholder: 'E-mail',
            id: 'username',
            required: true,
            type: 'email',
            value: ''
        });
        this.inputPass = new Control(this.node, 'input', 'auth__input');
        Object.assign(this.inputPass.node, {
            placeholder: 'Пароль',
            id: 'password',
            required: true,
            type: 'password',
            value: '',
            minlength: '8'
        });
        this.buttonSubmit = new Control(this.node, 'button', 'auth__button colored', 'Создать аккаунт');
        this.buttonSubmit.node.setAttribute('type', 'submit');
        this.registration = new Control(this.node, 'p', 'auth__registration', 'Вернуться на страницу логина');
    }
}