import Control from 'control';
import { headerH1Create } from './__h1/header__h1';

export const headerCreate = (root: HTMLElement) => {
    const header = new Control(root, 'header', 'header');
    headerH1Create(header.node);
};
