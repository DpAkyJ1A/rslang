import Control from 'control';
import { createSideMenu } from './side-menu/side-menu';

export const createMain = (root: HTMLElement) => {
    const main = new Control(root, 'main', 'main');
    createSideMenu(main.node);
};
