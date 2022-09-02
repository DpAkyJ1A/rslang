import ApiService from '../api/api';
import { ISignin, IUser } from '../api/interfaces';
import state from '../utils/state';

export default class AuthModel {
    api: ApiService;
    constructor() {
        this.api = new ApiService();
    }
    isValidName(value: string) {
        const NAME_REGEXP = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
        return NAME_REGEXP.test(value);
    }
    isValidMail(value: string) {
        const EMAIL_REGEXP =
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        return EMAIL_REGEXP.test(value.toString().toLowerCase());
    }

    isValidPassword(value: string) {
        const PASS_REGEXP = /^(?=.*\d).{8}$/;
        return PASS_REGEXP.test(value);
    }

    async sendUserDataToBase(data: IUser) {
        const response = await this.api.createUser(data);
        this.saveUserToken(response); //сохранение в локалсторадж токен
        state.userSignIn.isAuth = true;
        state.userSignIn.userId = response.id;
        state.userSignIn.name = response.name;
        state.userSignIn.email = response.email;
        state.userSignIn.token = response.token;
        state.userSignIn.refreshToken = response.refreshToken;
    }

    saveUserToken(data: ISignin) {
        localStorage.setItem('tokenDataKata', JSON.stringify(data));
    }

    async sendSighInUserDataToBase(login: IUser) {
        const response = await this.api.signInUser(login);
        this.saveUserToken(response);
        state.userSignIn.token = response.token;
        state.userSignIn.refreshToken = response.refreshToken;
    }

    async checkToken() {
        if (state.userSignIn.isAuth) {
            const id = state.userSignIn.userId;
            const res = await this.api.getNewToken(id, state.userSignIn.refreshToken);
            this.saveUserToken(res);
            state.userSignIn.token = res.token;
            state.userSignIn.refreshToken = res.refreshToken;
        }
    }

    updateToken() {
        console.log('add');
    }
}
