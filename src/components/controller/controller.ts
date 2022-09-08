import { IWord, IUserWordResp, IStatistics } from '../api/interfaces';
import TextbookModel from '../model/textbook-model';
import { parseHashString } from '../utils/parseHashString';
import Loader from '../view/pages/common/loader/loader';
import { updateSideMenu } from '../view/side-menu/side-menu';

export default class Controller extends TextbookModel {
    state: IState;
    drawView;
    drawNoAccessView;
    drawStatsView;
    constructor(state: IState, cbView: TCallback, noAccessView: T2Callback, drawStats: T3Callback) {
        super();
        this.state = state;
        this.drawView = cbView;
        this.drawNoAccessView = noAccessView;
        this.drawStatsView = drawStats;
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
            const loader = new Loader(document.body);
            super.gerWordsForTextbook(this.state).then((data) => {
                loader.destroy();
                this.drawView(this.state, data);
            });
        } else if (view === 'dictionary') {
            if (this.state.user.isAuth) {
                const loader = new Loader(document.body);
                super.gerWordsForDictionary(this.state).then((data) => {
                    loader.destroy();
                    this.drawView(this.state, data);
                });
            } else {
                this.drawNoAccessView('dictionary');
            }
        } else if (view === 'stats') {
            if (this.state.user.isAuth) {
                const loader = new Loader(document.body);
                super.getUserStats(this.state).then((data) => {
                    loader.destroy();
                    console.log(data);
                    this.drawStatsView(this.state, data);
                });
                this.drawView(this.state);
            } else {
                this.drawNoAccessView('stats');
            }
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

type T2Callback = {
    (name: string): void;
};

type T3Callback = {
    (props: IState, data?: IStatistics | null): void;
};
