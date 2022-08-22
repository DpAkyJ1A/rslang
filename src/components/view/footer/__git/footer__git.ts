import Control from 'control';

export const createFooterGit = async (footer: HTMLElement, gitName: string) => {
    const profilePath = `https://github.com/${gitName}`;
    const imgPath = `https://github.com/${gitName}.png?size=30`;

    const gitContainer = new Control(footer, 'a', 'footer__git-container');
    gitContainer.node.setAttribute('href', profilePath);
    const gitImg = new Control(gitContainer.node, 'span', 'footer__git');
    gitImg.node.style.backgroundImage = `url(${imgPath})`;
    new Control(gitContainer.node, 'h3', 'footer__git-name', gitName);
};
