import Control from 'control';
import { IWord } from '../../../../api/interfaces';
import { BadgeType, createBadge } from '../badge/badge';

export default class Card {
    data: IWord;
    node: HTMLElement;
    baseUrl: string;
    isAuth: boolean;
    constructor(data: IWord, baseURL: string, isAuth?: boolean) {
        this.data = data;
        this.node = document.createElement('div');
        this.node.className = 'textbook__card card';
        this.baseUrl = baseURL;
        this.isAuth = isAuth as boolean;
        this.playAudio = this.playAudio.bind(this);
    }

    render() {
        const preview = new Control(this.node, 'div', 'card__preview');
        preview.node.style.backgroundImage = `url(${this.baseUrl}${this.data.image})`;
        // preview.node.innerHTML = `
        //     <img class="card__img" src="${this.baseUrl}${this.data.image}" alt="${this.data.word}">
        // `;

        const content = new Control(this.node, 'div', 'card__content');
        const header = new Control(content.node, 'div', 'card__header');
        header.node.innerHTML = `
            <svg class="card__icon card__icon_folder" fill="${
                folderColors[this.data.group]
            }"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>
            <h3 class="card__word">${this.data.word} - ${this.data.transcription}</h3>
            <svg class="card__icon card__icon_play" onClick="() => this.playAudio()"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>
            <audio src="${this.baseUrl}${this.data.audio}">
            </audio>
            <audio src="${this.baseUrl}${this.data.audioMeaning}">
            </audio>
            <audio src="${this.baseUrl}${this.data.audioExample}">
            </audio>
        `;
        (header.node.querySelector('.card__icon_play') as HTMLElement).onclick = this.playAudio;

        // const controls = new Control(content.node, 'div', 'card__controls');
        // controls.node.innerHTML = `
        //     <button class="card__btn card__btn_hard">Hard</button>
        //     <button class="card__btn card__btn_learned">Learned</button>
        // `;

        const wordTranslation = new Control(content.node, 'h4', 'card__translation', `${this.data.wordTranslate}`);
        const meaning = new Control(content.node, 'div', 'card__example');
        new Control(meaning.node, 'h3', '', `${this.data.textMeaning}`);
        const phraseTranslation = new Control(
            meaning.node,
            'h4',
            'card__translation',
            `${this.data.textMeaningTranslate}`
        );

        const example = new Control(content.node, 'div', 'card__example');
        new Control(example.node, 'h3', '', `${this.data.textExample}`);
        const exampleTranslation = new Control(
            example.node,
            'h4',
            'card__translation',
            `${this.data.textExampleTranslate}`
        );

        const translationDisabled = localStorage.getItem('translationDisabled') || ('false' as string);
        if (translationDisabled === 'true') {
            wordTranslation.node.classList.add('card__translation_disabled');
            phraseTranslation.node.classList.add('card__translation_disabled');
            exampleTranslation.node.classList.add('card__translation_disabled');
        }

        if (this.isAuth) {
            const badge = createBadge(this.data.status || undefined);
            this.node.setAttribute('data-id', `${this.data.id}`);
            this.node.append(badge);
        }

        return this.node;
    }

    playAudio(event: Event) {
        const target = event.target as HTMLElement;
        const icon = target.closest('svg') as SVGSVGElement;
        if (icon.classList.contains('play-mode')) {
            icon.classList.remove('play-mode');
            document.querySelectorAll('audio').forEach((i) => {
                i.pause();
                i.load();
            });
            return;
        }

        document.querySelectorAll('audio').forEach((i) => {
            i.pause();
            i.load();
            i.closest('div')?.querySelector('.play-mode')?.classList.remove('play-mode');
        });

        icon.classList.add('play-mode');

        const audioArray = Array.from((target.closest('div') as HTMLElement).querySelectorAll('audio'));

        let i = 0;
        const loop = () => {
            if (i < audioArray.length) {
                audioArray[i].play();
                audioArray[i].onended = () => {
                    i++;
                    loop();
                };
            } else {
                icon.classList.remove('play-mode');
            }
        };
        if (icon.classList.contains('play-mode')) {
            loop();
        }
    }
}

const folderColors = {
    0: '#6281a7',
    1: '#355070',
    2: '#6d597a',
    3: '#b56576',
    4: '#e56b6f',
    5: '#eaac8b',
};
