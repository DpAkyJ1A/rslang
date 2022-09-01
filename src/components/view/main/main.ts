import Control from 'control';

export const createMain = (root: HTMLElement) => {
    const main = new Control(root, 'main', 'main');
    return main.node;
};
