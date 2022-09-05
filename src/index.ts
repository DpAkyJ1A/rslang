import 'Components/view/index.scss';
import Control from './components/view/control';
import { App } from './components/app/app';
import { IState } from './components/controller/controller';

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

// const chartJS = new Control(body, 'script');
// chartJS.node.setAttribute('src', 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js');

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

// const birds = new Control(body, 'script');
// birds.node.setAttribute('type', 'module');
// birds.node.setAttribute('src','three.r119.min.js');

// const birdsBody = new Control(body, 'script');
// birdsBody.node.setAttribute('type', 'module');
// birdsBody.node.setAttribute('src','vanta.birds.min.js');
