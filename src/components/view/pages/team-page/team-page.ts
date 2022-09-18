import Control from 'control';
import Page from './../page';
import { createPageHeader } from '../common/pageHeader/pageHeader';

export default class TeamPage extends Page {
    constructor() {
        super('team-page');
    }
    public render(container: HTMLElement) {
        this.container.innerHTML = '';
        this.createTeamPage();
        container.append(this.container);
    }

    createTeamPage() {
        const header = createPageHeader('Команда разработчиков', false);
        this.container.append(header);
        const containerCards = new Control(this.container, 'div', 'team__cards');
        const teamCards1 = new Control(containerCards.node, 'div', 'team-card');
        const teamCards2 = new Control(containerCards.node, 'div', 'team-card');
        const teamCards3 = new Control(containerCards.node, 'div', 'team-card');

        const frontSide1 = new Control(teamCards1.node, 'div', 'team-card__front-side').node;
        const backSide1 = new Control(teamCards1.node, 'div', 'team-card__back-side').node;

        new Control(frontSide1, 'div', 'team-card__avatar1');
        const nameMember1 = new Control(frontSide1, 'div', 'team-card__name');
        new Control(nameMember1.node, 'h3', '', 'Алексей');
        const ghLink1 = new Control(frontSide1, 'a', '');
        ghLink1.node.setAttribute('href', 'https://github.com/DpAkyJ1A');
        new Control(
            ghLink1.node,
            'p',
            'gh-logo'
        ).node.innerHTML = `<svg class="team-icon" width="50px" height="50px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="icon">
        <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"/>
      </svg>`;
        new Control(frontSide1, 'p', 'team-card__role', 'team lead&frontend developer');

        new Control(backSide1, 'div', 'team-card__avatar1');
        const nameMember1Back = new Control(backSide1, 'div', 'team-card__name');
        new Control(nameMember1Back.node, 'h3', '', 'Алексей');
        const ghLink1Back = new Control(backSide1, 'a', '');
        ghLink1Back.node.setAttribute('href', 'https://github.com/DpAkyJ1A');
        new Control(
            ghLink1Back.node,
            'p',
            'gh-logo'
        ).node.innerHTML = `<svg class="team-icon" width="50px" height="50px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="icon">
        <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"/>
      </svg>`;
        new Control(backSide1, 'p', 'team-card__role', 'team lead&frontend developer');

        new Control(
            backSide1,
            'p',
            'team-card__description',
            'Студент KHNU, 4 курс. В свободное время fontend и workout, этим летом мне подчинился силовой выход в стойку на брусьях💪. Играю на пианино и укулеле. Люблю фронтенд за мгновенный результат своей работы - пару строк и менюшка выезжает.'
        );

        const desc1 = new Control(frontSide1, 'p', 'team-card__description');
        desc1.node.innerHTML = `
            <ul>
                <li>- Настройка проекта</li>
                <li>- Словарь</li>
                <li>- Статистика</li>
                <li>- Общий дизайн</li>
                <li>- Шапка, подвал, меню</li>
            </ul>
        `;

        const frontSide2 = new Control(teamCards2.node, 'div', 'team-card__front-side').node;
        const backSide2 = new Control(teamCards2.node, 'div', 'team-card__back-side').node;

        new Control(frontSide2, 'div', 'team-card__avatar2');
        const nameMember2 = new Control(frontSide2, 'div', 'team-card__name');
        new Control(nameMember2.node, 'h3', '', 'Екатерина');
        const ghLink2 = new Control(nameMember2.node, 'a', '');
        ghLink2.node.setAttribute('href', 'https://github.com/Katrinstom');
        new Control(
            ghLink2.node,
            'p',
            'gh-logo'
        ).node.innerHTML = `<svg class="team-icon" width="50px" height="50px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="icon">
        <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"/>
      </svg>`;
        new Control(frontSide2, 'p', 'team-card__role', 'frontend developer');

        new Control(backSide2, 'div', 'team-card__avatar2');
        const nameMember2Back = new Control(backSide2, 'div', 'team-card__name');
        new Control(nameMember2Back.node, 'h3', '', 'Екатерина');
        const ghLink2Back = new Control(nameMember2Back.node, 'a', '');
        ghLink2Back.node.setAttribute('href', 'https://github.com/Katrinstom');
        new Control(
            ghLink2Back.node,
            'p',
            'gh-logo'
        ).node.innerHTML = `<svg class="team-icon" width="50px" height="50px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="icon">
        <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"/>
      </svg>`;
        new Control(backSide2, 'p', 'team-card__role', 'frontend developer');

        new Control(
            backSide2,
            'p',
            'team-card__description',
            'Действующий руководитель двух медицинских учреждений. Внедряя SCRUM и IT-разработки в медицину, погрузилась в общение с командами разработчиков, захотелось стать разработчиком самой. Frontend - это только начало!'
        );

        const desc2 = new Control(frontSide2, 'p', 'team-card__description');
        desc2.node.innerHTML = `
            <ul>
                <li>- API</li>
                <li>- Авторизация и регистрация</li>
                <li>- Общий дизайн</li>
                <li>- Главная страница</li>
                <li>- Страница "команда разработчиков"</li>
            </ul>
        `;

        const frontSide3 = new Control(teamCards3.node, 'div', 'team-card__front-side').node;
        const backSide3 = new Control(teamCards3.node, 'div', 'team-card__back-side').node;

        new Control(frontSide3, 'div', 'team-card__avatar3');
        const nameMember3 = new Control(frontSide3, 'div', 'team-card__name');
        new Control(nameMember3.node, 'h3', '', 'Антон');
        const ghLink3 = new Control(nameMember3.node, 'a', '');
        ghLink3.node.setAttribute('href', 'https://github.com/rmnvch');
        new Control(
            ghLink3.node,
            'p',
            'gh-logo'
        ).node.innerHTML = `<svg class="team-icon" width="50px" height="50px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="icon">
        <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"/>
      </svg>`;
        new Control(frontSide3, 'p', 'team-card__role', 'frontend developer');

        new Control(backSide3, 'div', 'team-card__avatar3');
        const nameMember3Back = new Control(backSide3, 'div', 'team-card__name');
        new Control(nameMember3Back.node, 'h3', '', 'Антон');
        const ghLink3Back = new Control(nameMember3Back.node, 'a', '');
        ghLink3Back.node.setAttribute('href', 'https://github.com/rmnvch');
        new Control(
            ghLink3Back.node,
            'p',
            'gh-logo'
        ).node.innerHTML = `<svg class="team-icon" width="50px" height="50px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="icon">
        <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"/>
      </svg>`;
        new Control(backSide3, 'p', 'team-card__role', 'frontend developer');

        new Control(
            backSide3,
            'p',
            'team-card__description',
            'Собираю группу! Могу на гитаре и немного на барабанах, нужны бас и вокал.. P.S. Фронтэнд - это круто. Люблю рекурсию и регулярные выражения, в свободное время каррирую функции.'
        );

        const desc3 = new Control(frontSide3, 'p', 'team-card__description');
        desc3.node.innerHTML = `
            <ul>
                <li>- Учебник</li>
                <li>- Игра "Спринт"</li>
                <li>- Игра "Аудио вызов"</li>
                <li>- Роутинг</li>
                <li>- Общий дизайн</li>
            </ul>
        `;
    }
}
