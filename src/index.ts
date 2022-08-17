import 'Components/view/index.scss';
import './scss/main.scss';
import englishImg from './assets/images/english.jpg';
import { headerCreate } from './components/view/header/header';

const root = document.querySelector('#root')! as HTMLElement;

headerCreate(root);

const img = document.createElement('img') as HTMLImageElement;
img.src = englishImg;

root.append(img);
