import Control from 'control';
import { createHeaderH1 } from './__h1/header__h1';

export const createHeader = (root: HTMLElement) => {
    const header = new Control(root, 'header', 'header');
    createHeaderH1(header.node);
};
