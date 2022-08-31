import 'Components/view/index.scss';
import Control from './components/view/control';
// import { createLayout } from './components/view/appView';
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

const state = localStorage['state']
    ? JSON.parse(localStorage.getItem('state') as string)
    : {
        view: 'main',
        textbook: {
            page: 1,
            group: 1,
        },
        dictionary: {
            page: 0,
            group: 0,
        }
      };

const app = new App(root, state);
app.start();
