import Control from 'control';
import Page from '../page';
import Card from '../common/card/card';
import { createPageHeader } from '../common/pageHeader/pageHeader';
import { createLevels } from '../common/levels/levels';
import { createPgnEl } from '../common/pagination/pagination';
import { IWord } from '../../../api/interfaces';
import { createGameLinks } from '../common/gameLinks/gameLinks';

// пока без апи
const URL = 'https://rs-lang-team-156.herokuapp.com/';

export default class TextbookPage extends Page {
    constructor() {
        super('textbook-page');
    }

    public render(container: HTMLElement, data?: IWord[]) {
        this.container.innerHTML = '';
        const header = createPageHeader('TextBook');
        let group, page;
        if (!data) {
            group = 1;
            page = 1;
        } else {
            group = (data as IWord[])[0].group;
            page = (data as IWord[])[0].page;
            const levels = createLevels(group);
            const pgn = createPgnEl(page, group);
            const cardList = this.drawCards(data || []);
            const gameLinks = createGameLinks(group);
            this.container.append(header, levels, pgn, cardList.node, gameLinks);
            container.append(this.container);
        }
    }

    drawCards(data: IWord[] | []) {
        const cardList = new Control(this.container, 'div', 'textbook-page__words');
        if (!data?.length) {
            new Control(
                cardList.node,
                'div',
                'textbook-page__error',
                'Ooops..something went wrong. Check you connection'
            );
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
