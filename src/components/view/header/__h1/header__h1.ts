import Control from 'control';

export const createHeaderH1 = (header: HTMLElement) => {
    new Control(header, 'h1', 'header__h1', 'RSLang');
};
