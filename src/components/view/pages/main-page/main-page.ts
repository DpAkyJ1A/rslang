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
        new Control(this.container, 'p', 'main-page__description', 'Работает регулярность (5 минут в день!) + наше приложение RSLang.');
        const mainBgWrapper = new Control(this.container, 'div', 'main-page__bg-wrapper');

        const link1Dwn = new Control(mainBgWrapper.node, 'a', 'bnt__link content__white');
        const div1Dwn = new Control(link1Dwn.node, 'div', 'btn__wrapper switched-pink btn_yellow');
        new Control(div1Dwn.node, 'p', 'btn__content', 'Зайди сюда - здесь не надо ничего учить. Просто играй!');
        new Control(div1Dwn.node, 'div', 'btn__img-games'); //сюда картинку

        const link2Dwn = new Control(mainBgWrapper.node, 'a', 'bnt__link content__grey');
        const div2Dwn = new Control(link2Dwn.node, 'div', 'btn__wrapper switched-blue btn_coral');
        new Control(div2Dwn.node, 'p', 'btn__content', 'Сюда не нажимай, не смотри свои великие достижения');
        new Control(div2Dwn.node, 'div', 'btn__img-stats'); //сюда картинку

    }
}