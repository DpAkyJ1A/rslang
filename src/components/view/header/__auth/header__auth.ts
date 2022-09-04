import Control from 'control';
import { route } from '../../side-menu/side-menu-item/side-menu-item';
import state from '../../../utils/state';
import AuthController from '../../../controller/auth-controller';

export const createHeaderAuth = (header: HTMLElement, data: { isAuth: boolean; name: string }) => {
    const authWrapper = new Control(header, 'div', 'header__auth-wrapper');
    if (data.isAuth) {
        new Control(authWrapper.node, 'span', '', `${data.name}`);
    }
    const link = new Control(authWrapper.node, 'a', 'header__link');
    if (data.isAuth) {
        link.node.classList.add('header__auth-wrapper_auth');
    }
    const auth = new Control(link.node, 'ion-icon', 'header__auth');
    auth.node.setAttribute('name', 'person-circle-outline');
    link.node.setAttribute('href', '/#auth');
    link.node.onclick = !link.node.classList.contains('header__auth-wrapper_auth') ? route : AuthController.logOutUser;
};
