import { createHeader } from './header/header';
import { createSideMenu } from './side-menu/side-menu';
import { createMain } from './main/main';
import { createFooter } from './footer/footer';

export const createLayout = (root: HTMLElement) => {
    createHeader(root);
    createSideMenu(root);
    createMain(root);
    createFooter(root);
};
