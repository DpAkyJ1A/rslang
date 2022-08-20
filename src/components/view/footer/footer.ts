import Control from 'control';

export const createFooter = (root: HTMLElement) => {
    const footer = new Control(root, 'footer', 'footer');
    new Control(footer.node, 'h1', 'footer__header', 'Footer');
};
