import Control from 'control';
import Page from '../page';

export default class ErrorPage extends Page {
    constructor() {
        super('error-page');
    }

    public render(container: HTMLElement) {
        this.container.innerHTML = '';
        this.createErrorMessage();
        super.render(container);
    }

    private createErrorMessage() {
        new Control(this.container, 'h2', 'error-message__header', `¯\\_(ツ)_/¯`);
        new Control(this.container, 'p', 'error-message__paragraph', `404 - page not found`);
    }
}
