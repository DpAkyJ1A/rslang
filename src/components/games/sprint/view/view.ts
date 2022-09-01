import { IWord } from '../../../api/interfaces';
import Control from '../../../view/control';
import SprintGame from '../sprint';
import { IGameProps, IGameResult, IGameWord, ISprintGameState, SprintGameLaunchMode } from '../types/index';
import { createStartGameControls } from './__controls/controls';
import { createSelect } from './__select/select';

const baseUrl = 'https://rs-lang-team-156.herokuapp.com/';

export default class SprintView {
    private content: Control;
    private wrapper: Control;
    constructor() {
        this.wrapper = new Control(null, 'div', 'sprint-game');
        this.content = new Control(this.wrapper.node, 'div', 'sprint-game__content content');
        this.closeGame = this.closeGame.bind(this);
        this.playAudio = this.playAudio.bind(this);
    }

    drawWrapper(container: HTMLElement) {
        const closeWrapper = new Control(null, 'div', 'sprint-game__abort');
        const closeBtn = new Control(closeWrapper.node, 'div', 'sprint-game__close');
        closeBtn.node.innerHTML = `
        <svg viewBox="0 0 24 24"><g id="info"/><g id="icons"><path d="M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z" id="exit"/></g></svg>
        `;
        closeBtn.node.onclick = this.closeGame;
        this.wrapper.node.prepend(closeWrapper.node);
        container.append(this.wrapper.node);
    }

    drawContent(props: ISprintGameState, data?: IGameWord, gameProps?: IGameProps, gameResult?: IGameResult) {
        this.content.node.innerHTML = '';
        switch (props.stage) {
            case 0:
                this.drawWelcomePage(props.mode);
                break;
            case 1:
                this.drawGame(data as IGameWord, gameProps as IGameProps);
                break;
            case 2:
                this.drawResults(gameProps as IGameProps, gameResult as IGameResult);
                break;
            default:
        }
    }

    drawWelcomePage(mode: SprintGameLaunchMode) {
        new Control(this.content.node, 'h1', 'content__title', 'Sprint');
        const descr = new Control(this.content.node, 'p', 'content__description');
        const gameDescr = new Control(descr.node, 'span');
        const controlDescr = new Control(descr.node, 'span');
        gameDescr.node.innerHTML = `
            «Спринт» - это тренировка для повторения заученных слов из вашего словаря.
        `;
        controlDescr.node.innerHTML = `
                <br>- Используйте мышь, чтобы выбрать.
                <br> - Используйте клавиши:<br>
                 - "Enter" для старта<br>
                 - "<" для выбора "true"<br>
                 - ">" для выбора "false"<br>
                 - "space" чтобы сыграть заново
                 `;
        const controls = createStartGameControls();
        this.content.node.append(controls);
    }

    drawGame(data: IGameWord, props: IGameProps) {
        const result = new Control(this.content.node, 'h1', 'content__title');
        result.node.innerHTML = `
            Result: ${props.score}
        `;
        const list = new Control(this.content.node, 'ul', 'content__success-list');
        for (let i = 0; i < 3; i++) {
            const item = new Control(list.node, 'li', 'content__success-item');
            item.node.innerHTML = `
                <svg><path d="M7.667 12H2v8H0V0h12l.333 2H20l-3 6 3 6H8l-.333-2z"/></svg>
            `;
            if ((i === 0 && props.row === 1) || (i === 0 && props.row > 1)) {
                item.node.classList.add('content__success-item_win');
            } else if ((i === 1 && props.row === 2) || (i === 1 && props.row > 2)) {
                item.node.classList.add('content__success-item_win');
            } else if (i === 2 && props.row > 2) {
                item.node.classList.add('content__success-item_win');
            }
        }
        const wordsBlock = new Control(this.content.node, 'div', 'content__word');
        new Control(wordsBlock.node, 'span', 'content__word_eng', `${data.word}`);
        new Control(wordsBlock.node, 'span', 'content__word_rus', `${data.wordTranslate}`);
        const btnBlock = new Control(this.content.node, 'div', 'content__buttons');
        const trueBtn = new Control(
            btnBlock.node,
            'button',
            'content__answer-button content__answer-button_true',
            'True'
        );
        const falseBtn = new Control(
            btnBlock.node,
            'button',
            'content__answer-button content__answer-button_false',
            'False'
        );
        trueBtn.node.onclick = this.fireAnswerClick;
        falseBtn.node.onclick = this.fireAnswerClick;
    }

    drawResults(props: IGameProps, results: IGameResult) {
        const result = new Control(this.content.node, 'h1', 'content__title');
        result.node.innerHTML = `
            Result: ${props.score}
        `;
        const resultsWrapper = new Control(this.content.node, 'div', 'content__results');
        new Control(resultsWrapper.node, 'span', 'content__result-label', 'Знаю: ');
        const rightAnswers = new Control(resultsWrapper.node, 'ul', 'content__result-list content__result-list_true');
        new Control(resultsWrapper.node, 'span', 'content__result-label', 'Выучить: ');
        const wrongAnswers = new Control(resultsWrapper.node, 'ul', 'content__result-list content__result-list_false');

        results.right.forEach((word) => {
            const item = new Control(rightAnswers.node, 'li', 'content__result-item');
            const wordTranslate = word.wordTranslateActual ? word.wordTranslateActual : word.wordTranslate;
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

        results.wrong.forEach((word) => {
            const item = new Control(wrongAnswers.node, 'li', 'content__result-item');
            const wordTranslate = word.wordTranslateActual ? word.wordTranslateActual : word.wordTranslate;
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

        const buttonBlock = new Control(this.content.node, 'div', 'button__block');
        const againBtn = new Control(buttonBlock.node, 'button', 'button__again', 'Again');
        const backBtn = new Control(buttonBlock.node, 'button', 'button__back', 'Back to Games');
        backBtn.node.onclick = this.closeGame;
        againBtn.node.onclick = () => {
            this.closeGame();
            const sprint = new SprintGame(SprintGameLaunchMode.textbook);
            sprint.start();
        };
    }

    closeGame() {
        this.wrapper.destroy();
    }

    fireAnswerClick(e: Event) {
        const target = e.target as HTMLElement;
        const event = new CustomEvent('answerBtn', {
            detail: { answer: target.textContent },
            bubbles: true,
            cancelable: true,
        });
        target.dispatchEvent(event);
    }

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
