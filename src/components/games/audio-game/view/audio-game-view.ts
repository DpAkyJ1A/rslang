import { IState } from 'components/controller/controller';
import { IGameResult, IGameWord, SprintGameLaunchMode } from 'components/games/sprint/types';
import { createStartGameControls } from '../../../games/sprint/view/__controls/controls';
import Control from '../../../view/control';
import { AudioGameLaunchMode, AudioGameStages, IAudioGameResult, IAudioGameScore, IAudioGameWord } from '../types';
import WrapperGamePage from './welcome-page-view';

const baseUrl = 'https://rs-lang-team-156.herokuapp.com/';

export default class AudioView {
    public wrapper: WrapperGamePage;
    constructor() {
        this.wrapper = new WrapperGamePage();
        this.wrapper.fullScreenBtn.node.onclick = this.enableFullscreen;
        this.wrapper.closeBtn.node.onclick = this.closeGame;
    }

    enableFullscreen = () => {
        if (this.wrapper.node.requestFullscreen) {
            this.wrapper.node.requestFullscreen();
        }
    };

    drawWrapper(container: HTMLElement) {
        container.append(this.wrapper.node);
    }

    drawContent(
        gameStage: AudioGameStages,
        launchMode: SprintGameLaunchMode,
        gameWord?: IAudioGameWord,
        gameScore?: IAudioGameScore,
        gameResult?: IAudioGameResult
    ) {
        this.wrapper.clearContentNode();
        console.log(gameStage);
        switch (gameStage) {
            case AudioGameStages.welcome:
                this.drawWelcomePage(launchMode);
                break;
            case AudioGameStages.game:
                this.drawGame(gameWord as IAudioGameWord, gameScore as IAudioGameScore);
                break;
            case AudioGameStages.results:
                this.drawResults(gameScore as IAudioGameScore, gameResult as IAudioGameResult);
                break;
            default:
        }
    }

    drawWelcomePage(launchMode: SprintGameLaunchMode) {
        new Control(this.wrapper.content.node, 'h1', 'content__title', 'Audiocall');
        const descr = new Control(this.wrapper.content.node, 'p', 'content__description');
        const gameDescr = new Control(descr.node, 'span');
        const controlDescr = new Control(descr.node, 'span');
        gameDescr.node.innerHTML = `
            "Аудиовызов" - это очень крутая штука, описание нужно поискать.
        `;
        controlDescr.node.innerHTML = `
                <br>- Используйте мышь, чтобы выбрать.
                <br> - Используйте клавиши:<br>
                 - "s" для старта<br>
                 - "<" для выбора "true"<br>
                 - ">" для выбора "false"<br>
                 - "space" чтобы сыграть заново
                 `;
        const controls = createStartGameControls(launchMode);
        this.wrapper.content.node.append(controls);
    }

    drawGame(gameWord: IAudioGameWord, gameScore: IAudioGameScore) {
        const result = new Control(this.wrapper.content.node, 'h1', 'content__title');
        result.node.innerHTML = `
            Result: ${gameScore.score}
        `;
        const list = new Control(this.wrapper.content.node, 'ul', 'content__success-list');
        for (let i = 0; i < 3; i++) {
            const item = new Control(list.node, 'li', 'content__success-item');
            item.node.innerHTML = `
                <svg><path d="M7.667 12H2v8H0V0h12l.333 2H20l-3 6 3 6H8l-.333-2z"/></svg>
            `;
            if ((i === 0 && gameScore.row === 1) || (i === 0 && gameScore.row > 1)) {
                item.node.classList.add('content__success-item_win');
            } else if ((i === 1 && gameScore.row === 2) || (i === 1 && gameScore.row > 2)) {
                item.node.classList.add('content__success-item_win');
            } else if (i === 2 && gameScore.row > 2) {
                item.node.classList.add('content__success-item_win');
            }
        }
        const audioIcon = new Control(this.wrapper.content.node, 'div', 'content__audio-icon');
        audioIcon.node.innerHTML = `
            <svg><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>   
        `;
        const audioSource = new Control(audioIcon.node, 'audio');
        (audioSource.node as HTMLAudioElement).src = `${baseUrl}${gameWord.audio}`;
        audioIcon.node.onclick = this.playAnswer;
        new Control(this.wrapper.content.node, 'h3', 'content__translate_ru game-hidden', `${gameWord.wordTranslate}`);
        new Control(this.wrapper.content.node, 'h3', 'content__translate_en game-hidden', `${gameWord.word}`);
        const wordImg = new Control(this.wrapper.content.node, 'div', 'content__img game-hidden');
        wordImg.node.innerHTML = `
            <img src="${baseUrl}${gameWord.img}" alt="${gameWord.wordTranslate}"></img>
        `;
        const optionsBlock = new Control(this.wrapper.content.node, 'div', 'content__answers');
        gameWord.options.forEach((word: string) => {
            const answerBtn = new Control(optionsBlock.node, 'button', 'content__answers-btn', `${word}`);
            answerBtn.node.dataset['answer'] = word === gameWord.wordTranslate ? 'true' : 'false';
            answerBtn.node.onclick = this.fireAnswerClick;
        });
        const dismissBtn = new Control(
            this.wrapper.content.node,
            'button',
            'content__answers-btn content__answers-btn_dismiss',
            'пропустить'
        );
        dismissBtn.node.dataset['answer'] = 'dismiss';
        dismissBtn.node.onclick = this.fireAnswerClick;
    }

    drawResults(gameScore: IAudioGameScore, gameResult: IAudioGameResult) {
        const result = new Control(this.wrapper.content.node, 'h1', 'content__title');
        result.node.innerHTML = `
            Result: ${gameScore.score}
        `;
        const resultsWrapper = new Control(this.wrapper.content.node, 'div', 'content__results');
        new Control(resultsWrapper.node, 'span', 'content__result-label', `Знаю (${gameResult.right.length}):`);
        const rightAnswers = new Control(resultsWrapper.node, 'ul', 'content__result-list content__result-list_true');
        new Control(resultsWrapper.node, 'span', 'content__result-label', `Выучить (${gameResult.wrong.length}):`);
        const wrongAnswers = new Control(resultsWrapper.node, 'ul', 'content__result-list content__result-list_false');

        gameResult.right.forEach((word: IAudioGameWord) => {
            const item = new Control(rightAnswers.node, 'li', 'content__result-item');
            const wordTranslate = word.wordTranslate;
            const iconAudio = new Control(item.node, 'span', 'item-word');
            iconAudio.node.innerHTML = `
                <svg class="content__iconAudio"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>
                <audio src="${baseUrl}${word.audio}">
                </audio>
            `;
            iconAudio.node.onclick = this.playAudio;
            new Control(item.node, 'span', 'item-word', `${word.word}`);
            new Control(item.node, 'span', 'item-word', `${wordTranslate}`);
            const icon = new Control(item.node, 'span', 'item-icon');
            icon.node.innerHTML = `
            <svg height="15px" version="1.1" viewbox="0 0 18 15" width="18px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#000000" id="Core" transform="translate(-423.000000, -47.000000)"><g id="check" transform="translate(423.000000, 47.500000)"><path d="M6,10.2 L1.8,6 L0.4,7.4 L6,13 L18,1 L16.6,-0.4 L6,10.2 Z" id="Shape"/></g></g></g></svg>
            `;
        });

        gameResult.wrong.forEach((word: IAudioGameWord) => {
            const item = new Control(wrongAnswers.node, 'li', 'content__result-item');
            const wordTranslate = word.wordTranslate;
            const iconAudio = new Control(item.node, 'span', 'item-word');
            iconAudio.node.innerHTML = `
                <svg class="content__iconAudio"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>
                <audio src="${baseUrl}${word.audio}">
                </audio>
            `;
            iconAudio.node.onclick = this.playAudio;
            new Control(item.node, 'span', 'item-word', `${word.word}`);
            new Control(item.node, 'span', 'item-word', `${wordTranslate}`);
            const icon = new Control(item.node, 'span', 'item-icon');
            icon.node.innerHTML = `
            <svg class="bi bi-exclamation-square" fill="red" height="16" viewbox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/></svg>
            `;
        });

        const buttonBlock = new Control(this.wrapper.content.node, 'div', 'button__block');
        const againBtn = new Control(buttonBlock.node, 'button', 'button__again', 'Again');
        const backBtn = new Control(buttonBlock.node, 'button', 'button__back', 'Back to Games');
        backBtn.node.onclick = this.closeGame;
        againBtn.node.onclick = this.restartGame;
    }

    closeGame = () => {
        this.wrapper.destroy();
        (document.querySelector('.games-page')?.childNodes as NodeListOf<HTMLElement>).forEach((node) => {
            node.style.display = 'flex';
        })
    };

    restartGame() {
        // this.wrapper.destroy();
        const event = new Event('restartGame');
        document.dispatchEvent(event);
    }

    fireAnswerClick = (e: Event) => {
        console.log('znen');
        this.wrapper.content.node.querySelectorAll('.game-hidden').forEach((el) => {
            el.classList.remove('game-hidden');
        });
        const target = e.target as HTMLElement;
        const event = new CustomEvent('answerBtn', {
            detail: { answer: target.dataset['answer'] },
        });
        target.dispatchEvent(event);
    };

    playAnswer = (e: Event) => {
        const target = e.target as HTMLElement;
        const el = target.closest('div') as HTMLElement;
        el.querySelector('audio')?.play();
    };

    playAudio(event: Event) {
        const target = event.target as HTMLElement;
        const spanWrapper = target.closest('span') as HTMLElement;
        if (spanWrapper.classList.contains('play-mode')) {
            spanWrapper.classList.remove('play-mode');
            document.querySelectorAll('audio').forEach((i) => {
                i.pause();
                i.load();
            });
            return;
        }

        document.querySelectorAll('audio').forEach((i) => {
            i.pause();
            i.load();
            i.closest('span')?.classList.remove('play-mode');
        });

        spanWrapper.classList.add('play-mode');
        spanWrapper.querySelector('audio')?.play();
        (spanWrapper.querySelector('audio') as HTMLAudioElement).onended = () => {
            spanWrapper.classList.remove('play-mode');
        };
    }
}
