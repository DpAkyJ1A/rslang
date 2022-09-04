import ApiService from '../api/api';

export default class TextbookModel extends ApiService {
    constructor() {
        super();
    }

    async gerWordsForTextbook(page: number, group: number, userId?: string) {
        const data = await super.getWords(page, group);
        return data;
    }

    updateTextbookUserWord(userId: string, data: { wordId: string; type: string }) {
        //
    }
}
