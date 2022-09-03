import Control from 'control';
import Page from '../page';

export default class StatsPage extends Page {
    constructor() {
        super('stats-page');
    }

    public render(container: HTMLElement) {
        this.container.innerHTML = '';
        new Control(this.container, 'h2', 'error-message__header', `¯\\_(ツ)_/¯`);
        super.render(container);
    }
}
