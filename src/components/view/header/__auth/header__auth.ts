import Control from 'control';
import { route } from '../../side-menu/side-menu-item/side-menu-item';

export const createHeaderAuth = (header: HTMLElement) => {
    const authWrapper = new Control(header, 'div', 'header__auth-wrapper');
    const link = new Control(authWrapper.node, 'a', 'header__link');
    const auth = new Control(link.node, 'ion-icon', 'header__auth');
    auth.node.setAttribute('name', 'person-circle-outline');
    link.node.setAttribute('href', '/#auth');
    link.node.onclick = route;
};
