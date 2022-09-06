import Control from 'control';
import Page from '../page';
import { Chart, registerables } from 'chart.js';
import { IState } from 'components/controller/controller';
import { IStatistics } from '../../../api/interfaces';
Chart.register(...registerables);

export default class StatsPage extends Page {
    constructor() {
        super('stats-page');
    }

    public render(container: HTMLElement, data?: IStatistics | null | undefined) {
        this.container.innerHTML = '';
        if (data) {
            const learnedWords = 10;
            const correctAnswerPercent = 21;
            this.createStatsForToday(learnedWords, correctAnswerPercent);

            const sprintLearnedWords = 5;
            const sprintCorrectAnswerPercent = 12;
            const longestSeries = 6;

            const gameCardsContainer = new Control(this.container, 'div', 'game-cards-container').node;
            this.createGameStats(
                gameCardsContainer,
                'Sprint',
                sprintLearnedWords,
                sprintCorrectAnswerPercent,
                longestSeries
            );
            this.createGameStats(
                gameCardsContainer,
                'Pip',
                sprintLearnedWords,
                sprintCorrectAnswerPercent,
                longestSeries
            );

            new Control(this.container, 'h2', 'stats-page__header', `Stats for all time`);
            const chartsContainer = new Control(this.container, 'div', 'charts-container').node;

            const chart1Container = new Control(chartsContainer, 'div', 'chart1-container').node;
            let header = 'New words per day';
            const datesLabels = ['21.08', '26.08', '27.08', '31.08', '02.09', '03.09'];
            const wordsNumber = [12, 5, 13, 21, 3, 8];
            const fontColor = '#fff';
            let borderColor = 'rgb(75, 192, 192)';

            this.createLongTermStats(chart1Container, header, datesLabels, wordsNumber, fontColor, borderColor);

            const chart2Container = new Control(chartsContainer, 'div', 'chart2-container').node;
            header = 'Number of new words';
            const wordsNumber2 = [wordsNumber[0]];
            for (let i = 1; i < wordsNumber.length; i++) {
                wordsNumber2[i] = wordsNumber2[i - 1] + wordsNumber[i];
            }
            borderColor = '#ff4d89';

            this.createLongTermStats(chart2Container, header, datesLabels, wordsNumber2, fontColor, borderColor);
        } else {
            new Control(this.container, 'div', 'dictionary-page__error').node.innerHTML = `
            Unfortunately there are no stats yet<br>
            To start tracking your progress, try to play any game
            <p class="card__translation">
            К сожалению статистики пока нет<br>
            Чтобы начать отслеживать свой прогресс, попробуй сыграть в игру 
            </p>`;
        }

        super.render(container);
    }

    private createStatsForToday(learnedWords: number, correctAnswerPersent: number) {
        const statsForToday = new Control(this.container, 'div', 'today-stats').node;
        new Control(statsForToday, 'h2', 'stats-page__header', `Stats for today`);
        const statsForTodayContainer = new Control(statsForToday, 'div', 'today-stats-container').node;
        // Выученные за день слова
        const learnedWordsContainer = new Control(statsForTodayContainer, 'div', 'learned-words-container').node;
        new Control(learnedWordsContainer, 'span', 'learned-words-container__data', `${learnedWords}`);
        new Control(learnedWordsContainer, 'p', 'learned-words-container__description', 'words learned');
        // Выученные за день слова
        const correctAnswerContainer = new Control(statsForTodayContainer, 'div', 'learned-words-container').node;
        new Control(correctAnswerContainer, 'span', 'learned-words-container__data', `${correctAnswerPersent}%`);
        new Control(correctAnswerContainer, 'p', 'learned-words-container__description', 'correct answers');
    }

    private createGameStats(
        gameCardsContainer: HTMLElement,
        gameName: string,
        sprintLearnedWords: number,
        sprintCorrectAnswerPercent: number,
        longestSeries: number
    ) {
        const statsCard = new Control(gameCardsContainer, 'div', `game-stats-card ${gameName.toLowerCase()}`).node;
        new Control(statsCard, 'h3', 'game-name', `${gameName}`);
        new Control(
            statsCard,
            'p',
            'learned-words'
        ).node.innerHTML = `Learned <span>${sprintLearnedWords}</span> words`;
        new Control(
            statsCard,
            'p',
            'correct-answer-percent'
        ).node.innerHTML = `Correct answer <span>${sprintCorrectAnswerPercent}</span>%`;
        new Control(
            statsCard,
            'p',
            'longest-series'
        ).node.innerHTML = `Longest series of correct answers: <span>${longestSeries}</span>`;
    }

    private createLongTermStats(
        chartsContainer: HTMLElement,
        header: string,
        datesLabels: Array<string>,
        wordsNumber: Array<number>,
        fontColor: string,
        borderColor: string
    ) {
        const chartCanvas = new Control(chartsContainer, 'canvas').node;

        const data = {
            labels: datesLabels,
            datasets: [
                {
                    label: header,
                    data: wordsNumber,
                    borderColor: borderColor,
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    tension: 0.1,
                },
            ],
        };

        Chart.defaults.color = fontColor;
        new Chart(chartCanvas as HTMLCanvasElement, {
            type: 'line',
            data: data,
        });
    }
}
