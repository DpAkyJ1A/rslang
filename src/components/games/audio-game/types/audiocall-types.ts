//пока росто переименовала теже данные, что и в спринте
export enum AudioGameStages {
    welcome,
    game,
    results,
}
export enum AudioGameLaunchMode {
    sideBar,
    textbook,
}

export interface IAudioGameState {
    mode: AudioGameLaunchMode;
    stage: AudioGameStages;
    userId?: string;
    group?: number;
    sound: boolean;
}

export type TAudioViewCb = {
    (props: IAudioGameState, word?: IGameWord, propsGame?: IGameProps, results?: IGameResult): void;
};

export interface IGameWord {
    word: string;
    wordTranslate: string;
    answer: boolean;
    id: string;
    image: string;
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
