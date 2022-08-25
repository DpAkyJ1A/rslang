import 'Components/view/index.scss';
import Control from './components/view/control';
import { createLayout } from './components/view/app';

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

createLayout(root);
