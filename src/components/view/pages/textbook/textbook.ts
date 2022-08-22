import Control from 'control';
import Page from '../page';
import Card from '../common/card/card';
import { createPageHeader } from '../common/pageHeader/pageHeader';

// пока без апи
const example = {
    id: '2',
    group: 1,
    page: 1,
    word: 'chanel',
    image: 'https://rs-lang-react.herokuapp.com/files/01_1205.jpg',
    audio: 'https://rs-lang-react.herokuapp.com/files/01_1205.mp3',
    audioMeaning: 'https://rs-lang-react.herokuapp.com/files/01_1205_meaning.mp3',
    audioExample: 'https://rs-lang-react.herokuapp.com/files/01_1205_example.mp3',
    textMeaning: 'A channel is a long, deep space between two edges.',
    textExample: 'The river cut a channel through the rocks.',
    transcription: '[ʧǽnl]',
    wordTranslate: 'канал',
    textMeaningTranslate: 'Канал - это длинное глубокое пространство между двумя краями',
    textExampleTranslate: 'Река пробила канал сквозь скалы',
};

export default class Textbook extends Page {
    constructor(className: string) {
        super(className);
    }

    render(container: HTMLElement, data?: IWord[]) {
        const header = createPageHeader('TextBook');
        const cardList = this.drawCards(data || undefined);
        this.container.append(header, cardList.node);
        container.append(this.container);
    }

    drawCards(data: IWord[] | undefined) {
        const cardList = new Control(this.container, 'div', 'textbook__words');
        if (!data) {
            const arr = [example, example];
            arr.forEach((i) => {
                const obj = i as IWord;
                const card = new Card(obj);
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
