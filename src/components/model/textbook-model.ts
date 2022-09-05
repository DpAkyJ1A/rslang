import ApiService from '../api/api';
import { IUserWordResp, IWord } from '../api/interfaces';
import { IState } from '../controller/controller';

export default class TextbookModel extends ApiService {
    constructor() {
        super();
    }

    async gerWordsForTextbook(state: IState) {
        const data = await super.getWords(state.textbook.page, state.textbook.group);
        if (!state.user.isAuth) {
            return data;
        } else {
            const userWords = await super.getUserWords(state.user.id, state.user.token);
            // const dataIds = data.map((word: IWord) => word.id);
            // const userWordsIds = userWords.map((word: IUserWordResp) => word.wordId);
            // const crossWords = dataIds.filter((id: string) => userWordsIds.indexOf(id) !== -1);
            // if (!crossWords.length) return data;
            return data.reduce((acc: IWord[], curr: IWord) => {
                userWords.forEach((word: IUserWordResp) => {
                    if (curr.id === word.wordId) Object.assign(curr, { status: word.difficulty });
                });
                acc.push(curr);
                return acc;
            }, []);
        }
    }

    async updateTextbookUserWord(data: { id: string; type: string; userId: string; userToken: string }) {
        // console.log(data);
        try {
            const word = await super.getUserWordById(data.userId, data.id, data.userToken);
            if (word.difficulty === data.type) {
                super.deleteUserWord(data.userId, data.id, data.userToken).then((res) => console.log(res));
            } else {
                super
                    .updateUserWord(data.userId, { difficulty: data.type }, data.id, data.userToken)
                    .then((res) => console.log(res));
            }
            console.log(word);
        } catch (error) {
            if ((error as Error).message === '404') {
                const res = await super.createUserWord(data.userId, data.id, { difficulty: data.type }, data.userToken);
                console.log(res);
            }
        }
    }

    async gerWordsForDictionary(state: IState) {
        const userWords = (await super.getUserWords(state.user.id, state.user.token)) as IUserWordResp[];
        const words: IWord[] = [];
        for (const item of userWords) {
            const word = (await super.getWordsById(item.wordId)) as IWord;
            Object.assign(word, { status: item.difficulty });
            words.push(word);
        }
        return words;
    }
}
