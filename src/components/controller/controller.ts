import { IWord } from '../api/interfaces';
import TextbookModel from '../model/textbook-model';
import { parseHashString } from '../utils/parseHashString';
import Loader from '../view/pages/common/loader/loader';
import { updateSideMenu } from '../view/side-menu/side-menu';

export default class Controller extends TextbookModel {
    state: IState;
    drawView;
    constructor(state: IState, cbView: TCallback) {
        super();
        this.state = state;
        this.drawView = cbView;
        this.handleWordsToogle = this.handleWordsToogle.bind(this);
        document.addEventListener('event', () => {
            this.handleLocation();
        });
        window.addEventListener('popstate', () => {
            this.handleLocation();
        });
        document.addEventListener('cardWordToggle', this.handleWordsToogle as EventListener);
    }

    handleWordsToogle(e: CustomEvent) {
        const loader = new Loader(document.body);

        super
            .updateTextbookUserWord(
                Object.assign(e.detail, { userId: this.state.user.id, userToken: this.state.user.token })
            )
            .then(() => loader.destroy());
    }

    handleLocation() {
        const params = parseHashString(window.location.href);
        this.updateState(params);
        this.drawMain(params.view);
    }

    updateState(params: { [N: string]: string }) {
        this.setViewState = params.view;
        if (params['view'] === 'textbook') {
            this.setTextbookState = { group: params.group || '0', page: params.page || '0' };
        }
    }

    set setViewState(view: string) {
        this.state.view = view;
    }

    set setTextbookState(params: { group: string; page: string }) {
        this.state.textbook.group = +params.group;
        this.state.textbook.page = +params.page;
    }

    // public async getWords(page: number, group: number) {
    //     const data = await super.getWords(page, group);
    //     this.drawView(data, {
    //         group: this.state.textbook.group,
    //         page: this.state.textbook.page,
    //         view: this.state.view,
    //     });
    // }

    public async drawMain(view: string) {
        updateSideMenu(view);
        if (view === 'textbook') {
            const loader = new Loader(document.querySelector('.main') as HTMLElement);
            super.gerWordsForTextbook(this.state).then((data) => {
                loader.destroy();
                console.log(data);
                this.drawView(this.state, data);
            });
        } else if (view === 'dictionary') {
            const data = await super.getWords(this.state.dictionary.page, this.state.dictionary.group);
            this.drawView(this.state, data);
        } else {
            this.drawView(this.state);
        }
    }
}

export interface IState {
    view: string;
    textbook: {
        page: number;
        group: number;
    };
    dictionary: {
        page: number;
        group: number;
    };
    user: {
        isAuth: false;
        id: string;
        name: string;
        token: string;
    };
}

type TCallback = {
    (props: IState, data?: IWord[]): void;
};
