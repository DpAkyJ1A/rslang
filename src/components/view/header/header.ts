import Control from 'control';
import { createHeaderAuth } from './__auth/header__auth';

export const createHeader = (root: HTMLElement, data: { isAuth: boolean; name: string }) => {
    const header = new Control(root, 'header', 'header');
    const headerWrapper = new Control(header.node, 'div', 'header__h1-wrapper');
    const headerLink = new Control(headerWrapper.node, 'a', 'header__h1-link')
    headerLink.node.setAttribute('href', '#main');
    new Control(headerLink.node, 'h1', 'header__h1', 'RSLang');
    createHeaderAuth(header.node, data);
    return header.node;
};
