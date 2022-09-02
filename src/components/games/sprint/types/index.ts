export enum SprintGameStages {
    welcome,
    game,
    results,
}

export enum SprintGameLaunchMode {
    sideBar,
    textbook,
}

export interface ISprintGameState {
    mode: SprintGameLaunchMode;
    stage: SprintGameStages;
    userId?: string;
}

export type TSprintViewCb = {
    (props: ISprintGameState, word?: IGameWord, propsGame?: IGameProps, results?: IGameResult): void;
};

export interface IGameWord {
    word: string;
    wordTranslate: string;
    answer: boolean;
    id: string;
    audio: 'string';
    wordTranslateActual?: string;
}

export interface IGameProps {
    score: number;
    row: number;
}

export interface IGameResult {
    right: IGameWord[];
    wrong: IGameWord[];
}
