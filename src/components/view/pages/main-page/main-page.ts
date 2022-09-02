import Control from 'control';
import Page from '../page';

export default class MainPage extends Page {
    constructor() {
        super('main-page');
    }
    public render(container: HTMLElement) {
        this.container.innerHTML = '';
        this.createMainPage();
        container.append(this.container);
    }

    createMainPage() {
        new Control(this.container, 'h1', 'h1-hidden', 'Приложение для изучения английского языка');
        new Control(this.container, 'h2', 'main-page__title', 'Уже 5 лет пытаешься начать учить английский язык?');
        new Control(this.container, 'p', 'main-page__description', 'Твоя цель не достигается, так как традиционные и "эффективные" подходы НЕ работают.'); 
        new Control(this.container, 'p', 'main-page__description', 'Работает: регулярность (5 минут в день!) + наше приложение RSLang.');
        const mainBgWrapper = new Control(this.container, 'div', 'main-page__bg-wrapper');
        const mainNav = new Control(mainBgWrapper.node, 'nav', 'main-page-nav');
        const ulMain = new Control(mainNav.node, 'ul', 'main-page-nav__list');
        new Control(ulMain.node, 'a', 'main-page-nav__item', 'Games').node.setAttribute('href', '/#games');
        new Control(ulMain.node, 'a', 'main-page-nav__item', 'Statistics').node.setAttribute('href', '/#stats');
    }
}