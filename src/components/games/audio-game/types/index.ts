export enum AudioGameStages {
    welcome = 'weclome',
    game = 'game',
    results = 'results',
}

export enum AudioGameLaunchMode {
    sidebar = 'sidebar',
    textbook = 'textbook',
}

export interface IAudioGameWord {
    word: string;
    wordTranslate: string;
    id: string;
    audio: string;
    options: Array<string>;
    img: string;
}

export interface IAudioGameScore {
    score: number;
    row: number;
}

export interface IAudioGameResult {
    right: IAudioGameWord[];
    wrong: IAudioGameWord[];
    longestRow: number;
    currentRow: number;
}
