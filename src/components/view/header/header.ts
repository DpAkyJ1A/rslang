import Control from 'control';
import { createHeaderAuth } from './__auth/header__auth';

export const createHeader = (root: HTMLElement) => {
    const header = new Control(root, 'header', 'header');
    const headerWrapper = new Control(header.node, 'div', 'header__h1-wrapper');
    new Control(headerWrapper.node, 'h1', 'header__h1', 'RSLang');
    createHeaderAuth(header.node);
};
