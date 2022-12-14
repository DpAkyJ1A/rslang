import Control from '../../control';

export default class SignInView extends Control {
    h2;
    form: Control<HTMLInputElement>;
    inputName: Control<HTMLInputElement>;
    errName;
    inputMail: Control<HTMLInputElement>;
    errMail;
    inputPass: Control<HTMLInputElement>;
    errPass;
    buttonSubmit;
    registration;
    constructor(parentNode: HTMLElement | null) {
        super(parentNode, 'div', 'sign__wrapper');
        this.h2 = new Control(this.node, 'h2', 'auth__h2', 'Введите данные для регистрации');
        this.form = new Control(this.node, 'form', 'auth__form');
        this.inputName = new Control(this.form.node, 'input', 'auth__input');
        Object.assign(this.inputName.node, {
            placeholder: 'Name',
            id: 'username',
            required: true,
            type: 'text',
            value: '',
        });
        this.errName = new Control(this.form.node, 'p', 'auth__err-name');
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
        this.buttonSubmit = new Control(this.form.node, 'button', 'auth__button colored', 'Создать аккаунт');
        this.buttonSubmit.node.setAttribute('type', 'submit');
        this.registration = new Control(this.node, 'p', 'sign__registration', 'Вернуться на страницу логина');
    }
}
