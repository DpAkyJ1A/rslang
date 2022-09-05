import Control from 'control';
import Page from '../page';
import Card from '../common/card/card';
import { createPageHeader } from '../common/pageHeader/pageHeader';

import { IWord } from '../../../api/interfaces';

// пока без апи
const URL = 'https://rs-lang-team-156.herokuapp.com/';

export default class DictionaryPage extends Page {
    constructor() {
        super('dictionary-page');
    }

    public render(container: HTMLElement, data?: IWord[]) {
        this.container.innerHTML = '';
        const header = createPageHeader('Dictionary');
        const cardList = this.drawCards(data || []);
        this.container.append(header, cardList.node);
        container.append(this.container);
    }

    drawCards(data: IWord[] | []) {
        const cardList = new Control(this.container, 'div', 'textbook-page__words');
        if (!data?.length) {
            new Control(cardList.node, 'div', 'dictionary-page__error').node.innerHTML = `
            Looks like the dictionary is empty<br>
            To add words here, visit the textbook and mark words you don't know yet
            <p class="card__translation">
            Кажется словарь пуст<br>
            Чтобы добавить слова отметь те, которые пока не знаешь в учебнике
            </p>`;
        } else {
            data.forEach((i) => {
                const obj = i as IWord;
                const card = new Card(obj, URL);
                cardList.node.append(card.render());
            });
        }
        return cardList;
    }
}
