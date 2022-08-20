import 'Components/view/index.scss';

import { createHeader } from './components/view/header/header';
import { createSideMenu } from './components/view/side-menu/side-menu';
import { createMain } from './components/view/main/main';
import { createFooter } from './components/view/footer/footer';

const root = document.querySelector('#root')! as HTMLElement;

createHeader(root);
createSideMenu(root);
createMain(root);
createFooter(root);
