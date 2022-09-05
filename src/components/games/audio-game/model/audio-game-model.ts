import ApiService from '../../../api/api';
import { IWord } from '../../../api/interfaces';
import { shuffleArray } from '../../../utils/shuffleArray';

export class AudioGameModel extends ApiService {
    constructor() {
        super();
    }

    // добавила к твоему массиву еще поле картинок
    async getWordsForGame(group: number, page?: number) {
        const pageToLoad = page ? page : Math.floor(Math.random() * 30);
        const wordsInit = await super.getWords(pageToLoad, group);
        
        const wordsEng = wordsInit.map((obj: IWord) => obj.word);
        const wordsRus = wordsInit.map((obj: IWord) => obj.wordTranslate);
        const ids = wordsInit.map((obj: IWord) => obj.id);
        const image = wordsInit.map((obj: IWord) => obj.image);
        const audio = wordsInit.map((obj: IWord) => obj.audio);
        const truthyWordsQty = Math.floor(10 + Math.random() * 5);
        const output = [];
        for (let i = 0; i < truthyWordsQty; i++) {
            const trueWord = {
                word: wordsEng[i],
                wordTranslate: wordsRus[i],
                answer: true,
                id: ids[i],
                image: image [i],
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
                wordTranslateActual: wordsRus[i + truthyWordsQty],
                image: image [i + truthyWordsQty],
                audio: audio[i + truthyWordsQty],
            };
            output.push(falseWord);
        }
        return shuffleArray(output);  
    }
}
