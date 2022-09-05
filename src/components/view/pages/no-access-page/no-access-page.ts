import Control from 'control';
import Page from '../page';

export default class NoAccessPage extends Page {
    constructor() {
        super('no-access-page');
    }

    public render(container: HTMLElement, closedPage?: string) {
        this.container.innerHTML = '';
        new Control(this.container, 'h2', 'log-in-message').node.innerHTML = `
        <a href="#auth">Log in</a> to view your ${closedPage}
    `;

        super.render(container);
    }
}
