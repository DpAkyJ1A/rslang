import Control from 'control';
import { createFooterLogo } from './__logo/footer__logo';
import { createFooterGit } from './__git/footer__git';

export const createFooter = (root: HTMLElement) => {
    const footer = new Control(root, 'footer', 'footer');
    createFooterLogo(footer.node);
    createFooterGit(footer.node, 'DpAkyJ1A');
    createFooterGit(footer.node, 'Katrinstom');
    createFooterGit(footer.node, 'rmnvch');
    new Control(footer.node, 'p', 'footer_year', '2022');
};
