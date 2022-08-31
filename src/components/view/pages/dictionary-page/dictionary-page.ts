import Control from 'control';
import Page from '../page';
import Card from '../common/card/card';
import { createPageHeader } from '../common/pageHeader/pageHeader';
import { createLevels } from '../common/levels/levels';
import { createPgnEl } from '../common/pagination/pagination';
import { IWord } from '../../../api/interfaces';

// пока без апи
const URL = 'https://rs-lang-team-156.herokuapp.com/';

export default class DictionaryPage extends Page {
  constructor() {
    super('dictionary');
  }

  public render(container: HTMLElement, data?: IWord[]) {
    this.container.innerHTML = '';
    const header = createPageHeader('Dictionary');
    let group, page;
    if (!data) {
      group = 0;
      page = 0;
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
