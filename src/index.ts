import 'Components/view/index.scss';
import Control from './components/view/control';
import { App } from './components/app/app';
import { IState } from './components/controller/controller';
import AudioGame from './components/games/audio-game/audio-game';
import { AudioGameLaunchMode } from './components/games/audio-game/types/audiocall-types';

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
    dictionary: {
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
console.log(localStorage['tokenDataKata']);

const app = new App(root, state);

app.start({ isAuth: state.user.isAuth, name: state.user.name });

interface ILocalStorageData {
    message: string;
    name: string;
    refreshToken: string;
    token: string;
    userId: string;
}

