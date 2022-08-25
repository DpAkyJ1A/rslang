import Control from 'control';

export const createFooterLogo = (footer: HTMLElement) => {
    const footerLogoLink = new Control(footer, 'a', 'footer__logo-link');
    footerLogoLink.node.setAttribute('href', 'https://rs.school/js/');

    new Control(footerLogoLink.node, 'span', 'footer__logo');
};
