import ApiService from '../../../api/api';
import { IUserWord, IUserWordResp, IWord } from '../../../api/interfaces';
import { shuffleArray } from '../../../utils/shuffleArray';
import { IGameResult, IGameWord } from '../types/index';

export class SprintModel extends ApiService {
    constructor() {
        super();
    }
    // 06905
    async getWordsForGame(group: number, page?: number) {
        const pageToLoad = page ? page : Math.floor(Math.random() * 30);
        const wordsInit = await super.getWords(pageToLoad, group);
        const output = this.shuffleWordsForGame(wordsInit);
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
        const output = this.shuffleWordsForGame(noLearnedWords);
        console.log(output);
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

    private shuffleWordsForGame(wordsInit: IWord[]) {
        const wordsEng = wordsInit.map((obj: IWord) => obj.word);
        const wordsRus = wordsInit.map((obj: IWord) => obj.wordTranslate);
        const ids = wordsInit.map((obj: IWord) => obj.id);
        const audio = wordsInit.map((obj: IWord) => obj.audio);
        const truthyWordsQty = Math.floor(10 + Math.random() * 5);
        const output = [];
        for (let i = 0; i < truthyWordsQty; i++) {
            const trueWord = {
                word: wordsEng[i],
                wordTranslate: wordsRus[i],
                answer: true,
                id: ids[i],
                audio: audio[i],
            };
            output.push(trueWord);
        }
        const falsyWords = wordsInit.length - truthyWordsQty;
        for (let i = 0; i < falsyWords; i++) {
            const falseWord = {
                word: wordsEng[i + truthyWordsQty],
                wordTranslate: wordsRus[Math.floor(Math.random() * truthyWordsQty)],
                answer: false,
                id: ids[i + truthyWordsQty],
                wordTranslateActual: wordsRus[i + truthyWordsQty],
                audio: audio[i + truthyWordsQty],
            };
            output.push(falseWord);
        }
        return output;
    }

    updateDataForStats(user: { id: string; token: string }, score: number, data: IGameResult) {
        let newWords = 0;
        let learnedWords = 0;
        const rightProcent = (data.right.length / (data.right.length + data.wrong.length)) * 100;

        const testPromises = data.right.map((word) =>
            this.getUserWordById(user.id, word.id, user.token).then((wordU) => {
                if (wordU.optional) {
                    if (wordU.optional.rightAnswers === 3) {
                        const answerCount = wordU.optional.rightAnswers + 1;
                        const gameCount = wordU.optional.sprintAppearances + 1;
                        this.updateUserWord(
                            user.id,
                            {
                                difficulty: 'hard',
                                optional: { rightAnswers: answerCount, sprintAppearances: gameCount },
                            },
                            word.id,
                            user.token
                        ).then(() => console.log('updated'));
                    } else {
                        const gameCount = wordU.optional.sprintAppearances + 1;
                        this.updateUserWord(
                            user.id,
                            { difficulty: 'learned', optional: { rightAnswers: 3, sprintAppearances: gameCount } },
                            word.id,
                            user.token
                        ).then(() => console.log('add to learned'));
                        learnedWords++;
                    }
                } else {
                    this.updateUserWord(
                        user.id,
                        { difficulty: 'process', optional: { rightAnswers: 1, sprintAppearances: 1 } },
                        word.id,
                        user.token
                    ).catch((error) => {
                        if ((error as Error).message === '404') {
                            this.createUserWord(
                                user.id,
                                word.id,
                                { difficulty: 'process', optional: { rightAnswers: 1, sprintAppearances: 1 } },
                                user.token
                            ).then(() => console.log('new word!!'));
                            newWords++;
                        }
                    });
                }
            })
        );
        Promise.allSettled(testPromises).then(() =>
            this.handleStatsUpdate(
                { id: user.id, token: user.token },
                { newWords: newWords, learnedWords: learnedWords, rightProc: rightProcent, longestRow: data.longestRow }
            )
        );

        // data.right.forEach(async (word: IGameWord) => {
        //     try {
        //         const wordU = (await this.getUserWordById(user.id, word.id, user.token)) as IUserWord;
        //         if (wordU.optional) {
        //             if (wordU.optional.rightAnswers === 3) {
        //                 const answerCount = wordU.optional.rightAnswers + 1;
        //                 const gameCount = wordU.optional.sprintAppearances + 1;
        //                 this.updateUserWord(
        //                     user.id,
        //                     {
        //                         difficulty: 'hard',
        //                         optional: { rightAnswers: answerCount, sprintAppearances: gameCount },
        //                     },
        //                     word.id,
        //                     user.token
        //                 ).then(() => console.log('updated'));
        //             } else {
        //                 const gameCount = wordU.optional.sprintAppearances + 1;
        //                 this.updateUserWord(
        //                     user.id,
        //                     { difficulty: 'learned', optional: { rightAnswers: 3, sprintAppearances: gameCount } },
        //                     word.id,
        //                     user.token
        //                 ).then(() => console.log('add to learned'));
        //                 learnedWords++;
        //             }
        //         } else {
        //             this.updateUserWord(
        //                 user.id,
        //                 { difficulty: 'process', optional: { rightAnswers: 1, sprintAppearances: 1 } },
        //                 word.id,
        //                 user.token
        //             );
        //         }
        //     } catch (error) {
        //         if ((error as Error).message === '404') {
        //             await this.createUserWord(
        //                 user.id,
        //                 word.id,
        //                 { difficulty: 'process', optional: { rightAnswers: 1, sprintAppearances: 1 } },
        //                 user.token
        //             ).then(() => console.log('new word!!'));
        //             newWords++;
        //         }
        //     }
        // });

        data.wrong.forEach(async (word: IGameWord) => {
            try {
                const wordU = (await this.getUserWordById(user.id, word.id, user.token)) as IUserWord;
                if (wordU.optional) {
                    const gameCount = wordU.optional.sprintAppearances + 1;
                    this.updateUserWord(
                        user.id,
                        {
                            difficulty: 'hard',
                            optional: { rightAnswers: 0, sprintAppearances: gameCount },
                        },
                        word.id,
                        user.token
                    ).then(() => console.log('hard again'));
                } else {
                    this.updateUserWord(
                        user.id,
                        { difficulty: 'hard', optional: { rightAnswers: 0, sprintAppearances: 1 } },
                        word.id,
                        user.token
                    ).then(() => console.log('add to hard'));
                }
            } catch (error) {
                if ((error as Error).message === '404') {
                    await this.createUserWord(
                        user.id,
                        word.id,
                        { difficulty: 'hard', optional: { rightAnswers: 0, sprintAppearances: 1 } },
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
        results: { newWords: number; learnedWords: number; rightProc: number; longestRow: number }
    ) {
        try {
            const userStat = await super.getUserStatistics(user.id, user.token);
            const learnedWordsUpd = userStat.learnedWords + results.learnedWords;
            const newWords = (userStat.newWordsPerDaySprint = results.newWords);
            const percentCorrectOfAnswersSprintUpd =
                userStat.percentCorrectOfAnswersSprint > results.rightProc
                    ? userStat.percentCorrectOfAnswersSprint
                    : results.rightProc;
            const longerSeriaOfAnswersSprintUpd =
                userStat.longerSeriaOfAnswersSprint > results.longestRow
                    ? userStat.longerSeriaOfAnswersSprint
                    : results.longestRow;
            super
                .putUserStatistics(user.id, user.token, {
                    learnedWords: learnedWordsUpd,
                    optional: {
                        newLearnedWordSprint: newWords,
                        percentCorrectOfAnswersSprint: percentCorrectOfAnswersSprintUpd,
                        longerSeriaOfAnswersSprint: longerSeriaOfAnswersSprintUpd,
                    },
                })
                .then((data) => console.log('user stat updated', data));
        } catch {
            super
                .putUserStatistics(user.id, user.token, {
                    learnedWords: results.learnedWords,
                    optional: {
                        newLearnedWordSprint: results.newWords,
                        percentCorrectOfAnswersSprint: results.rightProc,
                        longerSeriaOfAnswersSprint: results.longestRow,
                    },
                })
                .then((data) => console.log('user stat created', data));
        }
    }
}
