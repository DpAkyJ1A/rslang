import 'Components/view/index.scss';
import './scss/main.scss';
import englishImg from './assets/images/english.jpg';
import { headerCreate } from './components/view/header/header';
import { createSideMenu } from './components/view/main/side-menu/side-menu';

const root = document.querySelector('#root')! as HTMLElement;

headerCreate(root);
createSideMenu(root);

const img = document.createElement('img') as HTMLImageElement;
img.src = englishImg;

root.append(img);
