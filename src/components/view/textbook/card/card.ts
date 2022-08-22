import Control from 'control';

export default class Card {
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
    node: HTMLElement;
    baseUrl: string;
    constructor(data: IWord) {
        this.id = data.id;
        this.group = data.group;
        this.page = data.page;
        this.word = data.word;
        this.image = data.image;
        this.audio = data.audio;
        this.audioMeaning = data.audioMeaning;
        this.audioExample = data.audioExample;
        this.textMeaning = data.textMeaning;
        this.textExample = data.textExample;
        this.transcription = data.transcription;
        this.wordTranslate = data.wordTranslate;
        this.textMeaningTranslate = data.textMeaningTranslate;
        this.textExampleTranslate = data.textExampleTranslate;
        this.node = document.createElement('div');
        this.node.className = 'textbook__card card';
        this.baseUrl = 'https://rs-lang-team-156.herokuapp.com/';
        this.playAudio = this.playAudio.bind(this);
    }

    render() {
        const preview = new Control(this.node, 'div', 'card__preview');
        preview.node.innerHTML = `
            <img class="card__img" src="${this.image}" alt="${this.word}">
        `;

        const content = new Control(this.node, 'div', 'card__content');
        const header = new Control(content.node, 'div', 'card__header');
        header.node.innerHTML = `
            <svg class="card__icon card__icon_folder"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>
            <h3 class="card__word">${this.word} - ${this.transcription}</h3>
            <svg class="card__icon card__icon_play" onClick="() => this.playAudio()"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>
            <audio src="${this.audio}"></audio>
            <audio src="${this.audioMeaning}"></audio>
            <audio src="${this.audioExample}"></audio>
        `;
        (header.node.querySelector('.card__icon_play') as HTMLElement).onclick = this.playAudio;
        new Control(content.node, 'h4', 'card__translation', `${this.wordTranslate}`);
        const meaning = new Control(content.node, 'div', 'card__example');
        meaning.node.innerHTML = `
            <h3>${this.textMeaning}</h3>
            <h4 class="card__translation">
            ${this.textMeaningTranslate}
            </h4>          
        `;
        const example = new Control(content.node, 'div', 'card__example');
        example.node.innerHTML = `
            <h3>${this.textExample}</h3>
            <h4 class="card__translation">
            ${this.textExampleTranslate}
            </h4>          
        `;
        const controls = new Control(content.node, 'div', 'card__controls');
        controls.node.innerHTML = `
            <button class="btn-reset">hard</button>
            <button class="btn-reset">learned</button>
        `;

        return this.node;
    }

    playAudio(event: Event) {
        const target = event.target as HTMLElement;
        const icon = target.closest('svg');
        icon?.classList.toggle('play-mode');

        const audioArray = Array.from((target.closest('div') as HTMLElement).querySelectorAll('audio'));
        let audioArrayPos = 0;

        if (target.classList.contains('play-mode')) {
            audioArray[0].play();
            startSoundTimer();
        } else {
            audioArray.forEach((i) => {
                i.pause();
                i.load();
            });
        }

        function startSoundTimer() {
            const audioTimer = setInterval(() => {
                if (audioArray[audioArrayPos].currentTime >= audioArray[audioArrayPos].duration) {
                    if (audioArrayPos < audioArray.length - 1) {
                        audioArrayPos += 1;
                        audioArray[audioArrayPos].play();
                    } else {
                        clearInterval(audioTimer);
                    }
                }
            }, 10);
        }
    }
}

interface IWord {
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
}
