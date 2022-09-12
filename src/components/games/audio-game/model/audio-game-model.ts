import ApiService from '../../../api/api';
import {
    IStatistics,
    IUserWord,
    IUserWordResp,
    IWord,
    IStatsPerDay,
    IGameStats,
    IOptionalStats,
} from '../../../api/interfaces';
import { shuffleArray } from '../../../utils/shuffleArray';
import { IGameResult, IGameWord } from '../../../games/sprint/types/index';
import { IAudioGameResult, IAudioGameWord } from '../types';

export class AudioGameModel extends ApiService {
    constructor() {
        super();
    }
    async getWordsForGame(group: number, page?: number) {
        const pageToLoad = page ? page : Math.floor(Math.random() * 30);
        const wordsInit = await super.getWords(pageToLoad, group);
        const output = this.shuffleWordsForAudioGame(wordsInit);
        return shuffleArray(output);
    }

    async getWordsForGameAuth(group: number, page: number, user: { id: string; token: string }) {
        const wordsInit = (await super.getWords(page, group)) as IWord[];
        const userWords = await super.getUserWords(user.id, user.token);
        const noLearnedWords = this.reduceLearnedWords(wordsInit, userWords);
        let currPage = page - 1;
        while (noLearnedWords.length !== wordsInit.length || currPage === page) {
            currPage < 0 ? (currPage = 29) : currPage;
            const wordsInitLoop = (await super.getWords(currPage, group)) as IWord[];
            const noLearnedWordsLoop = this.reduceLearnedWords(wordsInitLoop, userWords);
            if (noLearnedWordsLoop.length > wordsInit.length - noLearnedWords.length) {
                noLearnedWords.push(...noLearnedWordsLoop.slice(-(wordsInit.length - noLearnedWords.length)));
            } else {
                noLearnedWords.push(...noLearnedWordsLoop);
            }
            currPage--;
        }
        const output = this.shuffleWordsForAudioGame(noLearnedWords);
        return shuffleArray(output);
    }

    private reduceLearnedWords(wordsInit: IWord[], userWords: IUserWordResp[]) {
        const userWordsLearnedIds = userWords
            .filter((word: IUserWordResp) => word.difficulty === 'learned')
            .map((word: IUserWordResp) => word.wordId);
        const output = wordsInit.reduce((acc: IWord[], curr: IWord) => {
            if (!userWordsLearnedIds.includes(curr.id)) {
                acc.push(curr);
            }
            return acc;
        }, []);
        return output;
    }

    private shuffleWordsForAudioGame(wordsInit: IWord[]) {
        const wordsEng = wordsInit.map((obj: IWord) => obj.word);
        const wordsRus = wordsInit.map((obj: IWord) => obj.wordTranslate);
        const ids = wordsInit.map((obj: IWord) => obj.id);
        const audio = wordsInit.map((obj: IWord) => obj.audio);
        const output = [];
        for (let i = 0; i < wordsEng.length; i++) {
            const copyArr = wordsRus.filter((word, index) => index !== i);
            const falseOptions = Array.from(Array(4).fill(1)).map((num) => {
                return copyArr[Number(num) * Math.floor(Math.random() * copyArr.length)];
            });
            const answerOptions = shuffleArray([wordsRus[i], ...falseOptions]);
            const gameWordObj = {
                word: wordsEng[i],
                wordTranslate: wordsRus[i],
                id: ids[i],
                audio: audio[i],
                options: answerOptions,
                img: wordsInit[i].image,
            };
            output.push(gameWordObj);
        }

        return output;
    }

    updateDataForStats(
        user: { id: string; token: string },
        gameName: 'sprint' | 'audio',
        score: number,
        data: IAudioGameResult
    ) {
        let newWords = 0;
        let learnedWords = 0;
        const numberOfQuestions = data.right.length + data.wrong.length;

        const testPromises = data.right.map((word) =>
            this.getUserWordById(user.id, word.id, user.token)
                .then((wordU) => {
                    console.log(wordU);
                    if (wordU.optional) {
                        const answerCount = wordU.optional.rightAnswers + 1;
                        const gameCount = wordU.optional.audioAppearances + 1;
                        const sprintGame = wordU.optional.sprintAppearances || 0;
                        if (answerCount === 3) {
                            this.updateUserWord(
                                user.id,
                                {
                                    difficulty: 'learned',
                                    optional: {
                                        rightAnswers: answerCount,
                                        sprintAppearances: sprintGame,
                                        audioAppearances: gameCount,
                                    },
                                },
                                word.id,
                                user.token
                            ).then((data) => console.log('add to learned', data));
                            learnedWords++;
                        } else {
                            this.updateUserWord(
                                user.id,
                                {
                                    difficulty: 'hard',
                                    optional: {
                                        rightAnswers: answerCount,
                                        sprintAppearances: sprintGame,
                                        audioAppearances: gameCount,
                                    },
                                },
                                word.id,
                                user.token
                            ).then((data) => console.log('updated', data));
                        }
                    } else {
                        this.updateUserWord(
                            user.id,
                            {
                                difficulty: 'process',
                                optional: { rightAnswers: 1, sprintAppearances: 0, audioAppearances: 1 },
                            },
                            word.id,
                            user.token
                        );
                    }
                })
                .catch((error) => {
                    if ((error as Error).message === '404') {
                        this.createUserWord(
                            user.id,
                            word.id,
                            {
                                difficulty: 'process',
                                optional: { rightAnswers: 1, sprintAppearances: 0, audioAppearances: 1 },
                            },
                            user.token
                        ).then(() => console.log('new word!!'));
                        newWords++;
                    }
                })
        );
        Promise.allSettled(testPromises).then(() =>
            this.handleStatsUpdate(
                { id: user.id, token: user.token },
                {
                    learnedWords: learnedWords,
                    numberOfQuestions: numberOfQuestions,
                    numberOfCorrectAnswers: data.right.length,
                    longerSeriesOfAnswers: data.longestRow,
                }
            )
        );

        data.wrong.forEach(async (word: IAudioGameWord) => {
            try {
                const wordU = (await this.getUserWordById(user.id, word.id, user.token)) as IUserWord;
                if (wordU.optional) {
                    const gameCount = wordU.optional.audioAppearances + 1;
                    const sprintGame = wordU.optional.sprintAppearances || 0;
                    this.updateUserWord(
                        user.id,
                        {
                            difficulty: 'hard',
                            optional: { rightAnswers: 0, sprintAppearances: sprintGame, audioAppearances: gameCount },
                        },
                        word.id,
                        user.token
                    ).then(() => console.log('hard again'));
                } else {
                    this.updateUserWord(
                        user.id,
                        {
                            optional: { rightAnswers: 0, sprintAppearances: 0, audioAppearances: 1 },
                            difficulty: 'hard',
                        },
                        word.id,
                        user.token
                    ).then((data) => console.log(data, 'add to hard'));
                }
            } catch (error) {
                if ((error as Error).message === '404') {
                    await this.createUserWord(
                        user.id,
                        word.id,
                        {
                            difficulty: 'hard',
                            optional: { rightAnswers: 0, sprintAppearances: 0, audioAppearances: 1 },
                        },
                        user.token
                    ).then(() => console.log('new word!! but hard'));
                    newWords++;
                }
            }
        });
        // this.handleStatsUpdate(
        //     { id: user.id, token: user.token },
        //     { newWords: newWords, learnedWords: learnedWords, rightProc: rightProcent, longestRow: data.longestRow }
        // );
    }

    async handleStatsUpdate(
        user: { id: string; token: string },
        results: {
            learnedWords: number;
            numberOfQuestions: number;
            numberOfCorrectAnswers: number;
            longerSeriesOfAnswers: number;
        }
    ) {
        try {
            const date = new Date();
            const currentDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}` as string;
            const userStats = (await super.getUserStatistics(user.id, user.token)) as IStatistics;
            // if (!userStats) {
            //     userStats = {
            //         learnedWords: 0,
            //         optional: {
            //             sprint: {
            //                 learnedWords: [{ date: currentDate, stat: 0 }],
            //                 numberOfQuestions: [{ date: currentDate, stat: 0 }],
            //                 numberOfCorrectAnswers: [{ date: currentDate, stat: 0 }],
            //                 longerSeriesOfAnswers: [{ date: currentDate, stat: 0 }],
            //             },
            //             audio: {
            //                 learnedWords: [{ date: currentDate, stat: 0 }],
            //                 numberOfQuestions: [{ date: currentDate, stat: 0 }],
            //                 numberOfCorrectAnswers: [{ date: currentDate, stat: 0 }],
            //                 longerSeriesOfAnswers: [{ date: currentDate, stat: 0 }],
            //             },
            //         },
            //     };
            // }
            // Выбираю игру
            const userGameStats: IGameStats = userStats.optional.audio as IGameStats;

            let userLastUpdDate = '';
            if (userGameStats.numberOfQuestions) {
                userLastUpdDate = userGameStats.numberOfQuestions[userGameStats.numberOfQuestions.length - 1].date;
            }

            const newGameStats: IGameStats = {
                learnedWords: [{ date: currentDate, stat: 0 }],
                numberOfQuestions: [{ date: currentDate, stat: 0 }],
                numberOfCorrectAnswers: [{ date: currentDate, stat: 0 }],
                longerSeriesOfAnswers: [{ date: currentDate, stat: 0 }],
            };
            //Обновление выученных слов вообще
            const learnedWordsUpd = userStats.learnedWords || 0 + results.learnedWords;
            // Если дата последнего изменения сегодняшняя, обновляем данные
            if (currentDate === userLastUpdDate) {
                // Обновление колличества выученных слов в игре
                const learnedWords = userGameStats.learnedWords as IStatsPerDay[];
                const learnedWordsToday = learnedWords[learnedWords.length - 1].stat;
                learnedWords[learnedWords.length - 1].stat = learnedWordsToday + results.learnedWords;
                newGameStats.learnedWords = learnedWords;
                // Обновление колличества заданных вопросов
                const numberOfQuestions = userGameStats.numberOfQuestions as IStatsPerDay[];
                const numberOfQuestionsToday = numberOfQuestions[numberOfQuestions.length - 1].stat;
                numberOfQuestions[numberOfQuestions.length - 1].stat =
                    numberOfQuestionsToday + results.numberOfQuestions;
                newGameStats.numberOfQuestions = numberOfQuestions;
                // Обновление колличества вопросов на которые был дан правильный ответ
                const numberOfCorrectAnswers = userGameStats.numberOfCorrectAnswers as IStatsPerDay[];
                const numberOfCorrectAnswersToday = numberOfCorrectAnswers[numberOfCorrectAnswers.length - 1].stat;
                numberOfCorrectAnswers[numberOfCorrectAnswers.length - 1].stat =
                    numberOfCorrectAnswersToday + results.numberOfCorrectAnswers;
                newGameStats.numberOfCorrectAnswers = numberOfCorrectAnswers;
                // Обновление самой длинной последовательности правильных ответов
                const longerSeriesOfAnswers = userGameStats.longerSeriesOfAnswers as IStatsPerDay[];
                const longerSeriesOfAnswersToday = longerSeriesOfAnswers[longerSeriesOfAnswers.length - 1].stat;
                longerSeriesOfAnswers[longerSeriesOfAnswers.length - 1].stat =
                    longerSeriesOfAnswersToday > results.longerSeriesOfAnswers
                        ? longerSeriesOfAnswersToday
                        : results.longerSeriesOfAnswers;
                newGameStats.longerSeriesOfAnswers = longerSeriesOfAnswers;
            }
            // Если даты нет или она не совпадает с текущей, создаем новые обьекты типа IStatsPerDay с текущей датой
            else {
                // Обновление колличества выученных слов в игре
                const learnedWords = userGameStats.learnedWords as IStatsPerDay[];
                const learnedWordsToday = { date: currentDate, stat: results.learnedWords } as IStatsPerDay;
                learnedWords.push(learnedWordsToday);
                newGameStats.learnedWords = learnedWords;
                // Обновление колличества заданных вопросов
                const numberOfQuestions = userGameStats.numberOfQuestions as IStatsPerDay[];
                const numberOfQuestionsToday = { date: currentDate, stat: results.numberOfQuestions } as IStatsPerDay;
                numberOfQuestions.push(numberOfQuestionsToday);
                newGameStats.numberOfQuestions = numberOfQuestions;
                // Обновление колличества вопросов на которые был дан правильный ответ
                const numberOfCorrectAnswers = userGameStats.numberOfCorrectAnswers as IStatsPerDay[];
                const numberOfCorrectAnswersToday = {
                    date: currentDate,
                    stat: results.numberOfCorrectAnswers,
                } as IStatsPerDay;
                numberOfCorrectAnswers.push(numberOfCorrectAnswersToday);
                newGameStats.numberOfCorrectAnswers = numberOfCorrectAnswers;
                // Обновление самой длинной последовательности правильных ответов
                const longerSeriesOfAnswers = userGameStats.longerSeriesOfAnswers as IStatsPerDay[];
                const longerSeriesOfAnswersToday = {
                    date: currentDate,
                    stat: results.longerSeriesOfAnswers,
                } as IStatsPerDay;
                longerSeriesOfAnswers.push(longerSeriesOfAnswersToday);
                newGameStats.longerSeriesOfAnswers = longerSeriesOfAnswers;
            }
            const sprintOldStat = userStats.optional.sprint;
            console.log(sprintOldStat, newGameStats);
            super.putUserStatistics(user.id, user.token, {
                learnedWords: learnedWordsUpd,
                optional: {
                    sprint: sprintOldStat,
                    audio: newGameStats,
                },
            });
        } catch (e) {
            const date = new Date();
            const currentDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}` as string;
            super.putUserStatistics(user.id, user.token, {
                learnedWords: 0,
                optional: {
                    sprint: {
                        learnedWords: [{ date: currentDate, stat: 0 }],
                        numberOfQuestions: [{ date: currentDate, stat: 0 }],
                        numberOfCorrectAnswers: [{ date: currentDate, stat: 0 }],
                        longerSeriesOfAnswers: [{ date: currentDate, stat: 0 }],
                    },
                    audio: {
                        learnedWords: [{ date: currentDate, stat: results.learnedWords }],
                        numberOfQuestions: [{ date: currentDate, stat: results.numberOfQuestions }],
                        numberOfCorrectAnswers: [{ date: currentDate, stat: results.numberOfCorrectAnswers }],
                        longerSeriesOfAnswers: [{ date: currentDate, stat: results.longerSeriesOfAnswers }],
                    },
                },
            });
        }
    }
}
