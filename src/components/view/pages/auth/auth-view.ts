import Control from '../../control';

export default class AuthView extends Control {
    h2;
    form;
    inputMail: Control<HTMLInputElement>;
    errMail;
    inputPass: Control<HTMLInputElement>;
    errPass;
    buttonSubmit;
    registration;
    successSign;
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'auth__wrapper');
        this.h2 = new Control(
            this.node,
            'h2',
            'auth__h2',
            'Войдите в личный кабинет, чтобы получить расширенный доступ к изучению языка'
        );
        this.form = new Control(this.node, 'form', 'auth__form');
        this.inputMail = new Control(this.form.node, 'input', 'auth__input');
        Object.assign(this.inputMail.node, {
            placeholder: 'E-mail',
            id: 'usermail',
            required: true,
            type: 'email',
            value: '',
        });
        this.errMail = new Control(this.form.node, 'p', 'auth__err-mail');
        this.inputPass = new Control(this.form.node, 'input', 'auth__input');
        Object.assign(this.inputPass.node, {
            placeholder: 'Пароль',
            id: 'password',
            required: true,
            type: 'password',
            value: '',
            minlength: '8',
        });
        this.errPass = new Control(this.form.node, 'p', 'auth__err-pass');
        this.buttonSubmit = new Control(this.form.node, 'button', 'auth__button colored', 'Войти');
        this.buttonSubmit.node.setAttribute('type', 'submit');
        this.registration = new Control(this.node, 'p', 'auth__registration', 'Регистрация');
        this.successSign = new Control(this.node, 'p', 'auth__access');
    }
}

//что за page? как в него влезть?
