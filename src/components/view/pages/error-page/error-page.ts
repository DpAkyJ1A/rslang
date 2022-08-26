import Control from 'control';
import Page from '../page';

export default class ErrorPage extends Page {
  constructor(className: string) {
    super(className);
  }

  public render(container: HTMLElement) {
    // const header = createPageHeader('TextBook');
    // const levels = createLevels();
    // const cardList = this.drawCards(data || undefined);
    // const pgn = createPgnEl(29);
    // this.container.append(header, levels, pgn, cardList.node);
    this.createErrorMessage();
    super.render(container);
  }

  private createErrorMessage() {
    new Control(this.container, "h2", "error-message__header", `¯\\_(ツ)_/¯`);
    new Control(this.container, "p", "error-message__paragraph", `404 - page not found`);
  }

  
}
