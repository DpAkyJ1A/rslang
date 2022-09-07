import { BadgeType } from '../view/pages/common/badge/badge';

export interface IWord {
    id: string;
    group: 0;
    page: 0;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    wordTranslate: string;
    textMeaningTranslate: string;
    textExampleTranslate: string;
    // для учебника
    status?: BadgeType;
    sprintAppearance: number;
    audioAppearance?: number;
}

export interface IUser {
    name?: string;
    email: string;
    password: string;
}

export interface ISignin {
    message: string;
    token: string;
    refreshToken: string;
    userId: string;
    name: string;
}

export interface IUserWord {
    difficulty: string;
    optional?: {
        // word: string;
        // textMeaning: string;
        // textExample: string;
        sprintAppearances: number;
        audioAppearances?: number;
        rightAnswers: number;
    };
}

export interface IUserWordResp extends IUserWord {
    id: string;
    wordId: string;
}

export interface ISettings {
    wordsPerDay: number;
    optional: {
        [key: string]: string | boolean | number;
    };
}

export interface IStatistics {
    learnedWords: number;
    optional: IOptionalStats;
}

export interface IStatsPerDay {
    date: string;
    stat: number;
}

export interface IGameStats {
    learnedWords: IStatsPerDay[];
    numberOfQuestions: IStatsPerDay[];
    numberOfCorrectAnswers: IStatsPerDay[];
    longerSeriesOfAnswers: IStatsPerDay[];
}

export interface IOptionalStats {
    sprint?: IGameStats;
    audio?: IGameStats;
}
