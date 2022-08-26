import ApiService from '../api/api';
import { IWord } from '../api/interfaces';
import { routes } from '../model/routes';

export default class Controller extends ApiService {
    state: IState;
    drawView;
    constructor(state: IState, cbView: TCallback) {
        super();
        this.state = state;
        this.drawView = cbView;
        document.addEventListener('event', () => {
            this.handleLocation();
        });
        window.addEventListener('popstate', () => {
            this.handleLocation();
        });
    }

    handleLocation() {
        const path: string = window.location.pathname;
        const view = decodeURI(path).slice(1);
        console.log(view);
        this.state.view = view;
        this.drawMain();
    }

    // public async getWords(page: number, group: number) {
    //     const data = await super.getWords(page, group);
    //     this.drawView(data, {
    //         group: this.state.textbook.group,
    //         page: this.state.textbook.page,
    //         view: this.state.view,
    //     });
    // }

    public drawMain() {
        console.log('рисуем' + ' ' + this.state.view);
        this.drawView(this.state);
    }
}

export interface IState {
    view: string;
    textbook: {
        page: number;
        group: number;
    };
}

type TCallback = {
    (props: IState, data?: IWord[]): void;
};
