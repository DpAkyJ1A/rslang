import Control from 'control';

export const createMain = (root: HTMLElement) => {
    const main = new Control(root, 'main', 'main');
    new Control(main.node, 'h1', 'main__header', 'Main');
};
