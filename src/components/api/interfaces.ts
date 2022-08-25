export interface IWord {
  id: string,
  group: 0,
  page: 0,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string,
}

export interface IUser {
    name?: string,
    email: string,
    password: string
  }

export interface ISignin {
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
  name: string
}  

export interface IUserWord {
  difficulty: string,
  optional: {
    word: string,
    textMeaning: string,
    textExample: string,
  }
}

export interface ISettings {
    wordsPerDay: number,
    optional: {}
}

export interface IStatistics {
    learnedWords: number,
    optional: {
      newWordsPerDaySprint?: number,
      percentCorrectOfAnswersSprint?: number,
      longerSeriaOfAnswersSprint?: number,
      newWordsPerDayAudio?: number,
      percentCorrectOfAnswersAudio?: number,
      longerSeriaOfAnswersAudio?: number,
      newWordsPerDay?: number,
      countLearnedWordsPerDay?: number,
      percentCorrectOfAnswersPerDay?: number
    }
}