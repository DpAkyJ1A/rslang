import Control from 'control';
import Page from '../page';
import Card from '../common/card/card';
import { createPageHeader } from '../common/pageHeader/pageHeader';
import { createLevels } from '../common/levels/levels';
import { createPgnEl } from '../common/pagination/pagination';

// пока без апи
const URL = 'https://rs-lang-team-156.herokuapp.com/';
const example = {
    id: '2',
    group: 1,
    page: 1,
    word: 'chanel',
    image: 'files/01_1205.jpg',
    audio: 'files/01_1205.mp3',
    audioMeaning: 'files/01_1205_meaning.mp3',
    audioExample: 'files/01_1205_example.mp3',
    textMeaning: 'A channel is a long, deep space between two edges.',
    textExample: 'The river cut a channel through the rocks.',
    transcription: '[ʧǽnl]',
    wordTranslate: 'канал',
    textMeaningTranslate: 'Канал - это длинное глубокое пространство между двумя краями',
    textExampleTranslate: 'Река пробила канал сквозь скалы',
};

export default class TextbookPage extends Page {
    constructor(className: string) {
        super(className);
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
            this.container.append(header, levels, pgn, cardList.node);
            container.append(this.container);
        }
    }

    drawCards(data: IWord[] | []) {
        const cardList = new Control(this.container, 'div', 'textbook__words');
        if (!data?.length) {
            new Control(cardList.node, 'div', 'textbook__error', 'Ooops..something went wrong. Check you connection');
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

interface IWord {
    id: string;
    group: 0;
    page: 0;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    wordTranslate: string;
    textMeaningTranslate: string;
    textExampleTranslate: string;
}
