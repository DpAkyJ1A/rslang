import Control from 'control';

export const createHeaderAuth = (header: HTMLElement) => {
    const authWrapper = new Control(header, 'div', 'header__auth-wrapper');
    const auth = new Control(authWrapper.node, 'ion-icon', 'header__auth');
    auth.node.setAttribute('name', 'person-circle-outline');
};
