import 'Components/view/index.scss';
import Control from './components/view/control';
import { App } from './components/app/app';
import { IState } from './components/controller/controller';
import ApiService from './components/api/api';
import { ISignin } from './components/api/interfaces';

const body = document.body as HTMLBodyElement;
let root = document.querySelector('#root') as HTMLElement | null;
if (root === null) {
    root = new Control(body, 'div').node;
    root.id = 'root';
}

const ionIconModule = new Control(body, 'script');
ionIconModule.node.setAttribute('type', 'module');
ionIconModule.node.setAttribute('src', 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js');

const ionIconNoModule = new Control(body, 'script');
ionIconNoModule.node.setAttribute('nomodule', '');
ionIconNoModule.node.setAttribute('src', 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js');

const state: IState = {
    view: 'main',
    textbook: {
        page: 0,
        group: 0,
    },
    user: {
        isAuth: localStorage['tokenDataKata'] ? JSON.parse(localStorage['tokenDataKata']).isAuth : false,
        id: localStorage['tokenDataKata'] ? JSON.parse(localStorage['tokenDataKata']).userId : '',
        name: localStorage['tokenDataKata'] ? JSON.parse(localStorage['tokenDataKata']).name : '',
        token: localStorage['tokenDataKata'] ? JSON.parse(localStorage['tokenDataKata']).token : '',
    },
};

const updateUserData = async (state: IState) => {
    if (state.user.isAuth) {
        const apiService = new ApiService();
        // Пробую использовать токен
        try {
            state.user.token = JSON.parse(localStorage['tokenDataKata']).token;
            await apiService.getUserById(state.user.id, state.user.token);
        } catch {
            // При неудаче обновляю токен
            try {
                const refreshToken = JSON.parse(localStorage['tokenDataKata']).refreshToken;
                let data = await apiService.getNewToken(state.user.id, refreshToken);
                localStorage.setItem('tokenDataKata', JSON.stringify(data));
            }
            // При второй неудаче логаут
            catch {
                state.user.isAuth = false;
            }
        }
    }
};

const runApp = async (root: HTMLElement) => {
    await updateUserData(state);

    const app = new App(root, state);

    app.start({ isAuth: state.user.isAuth, name: state.user.name });
};

runApp(root);
