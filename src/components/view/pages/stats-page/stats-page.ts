import Control from 'control';
import Page from '../page';

export default class StatsPage extends Page {
    constructor() {
        super('stats-page');
    }

  public render(container: HTMLElement) {
    this.container.innerHTML = '';

    const learnedWords = 10;
    const correctAnswerPersent = 21;
    this.createStatsForToday(learnedWords, correctAnswerPersent);

    const sprintLearnedWords = 5;
    const sprintCorrectAnswerPercent = 12;
    const longestSeries = 6;
    this.createGameStats('Sprint', sprintLearnedWords, sprintCorrectAnswerPercent, longestSeries);
    this.createGameStats('Pip', sprintLearnedWords, sprintCorrectAnswerPercent, longestSeries);

    super.render(container);
  }
  
  private createStatsForToday(learnedWords: number, correctAnswerPersent: number) {
    const statsForToday = new Control(this.container, 'div', 'today-stats').node;
    new Control(statsForToday, 'h2', 'stats-page__header', `Stats for today`);
    const statsForTodayContainer = new Control(statsForToday, 'div', 'today-stats-container').node;
    // Выученные за день слова
    const learnedWordsContainer = new Control(statsForTodayContainer, 'div', 'learned-words-container').node;
    new Control(learnedWordsContainer, 'span', 'learned-words-container__data', `${learnedWords}`);
    new Control(learnedWordsContainer, 'p', 'learned-words-container__description', 'words learned')
    // Выученные за день слова
    const correctAnswerContainer = new Control(statsForTodayContainer, 'div', 'learned-words-container').node;
    new Control(correctAnswerContainer, 'span', 'learned-words-container__data', `${correctAnswerPersent}%`);
    new Control(correctAnswerContainer, 'p', 'learned-words-container__description', 'correct answers')
  }

  private createGameStats(gameName: string, sprintLearnedWords: number, sprintCorrectAnswerPercent: number, longestSeries: number) {
    const statsCard = new Control(this.container, 'div', `game-stats-card ${gameName.toLowerCase()}`).node;
    new Control(statsCard, 'h3', 'game-name', `${gameName}`);
    new Control(statsCard, 'p', 'learned-words', `Learned ${sprintLearnedWords} words`);
    new Control(statsCard, 'p', 'correct-answer-percent', `Correct answer ${sprintCorrectAnswerPercent}%`);
    new Control(statsCard, 'p', 'longest-series', `Longest series of correct answers: ${longestSeries}`);
  }
}
