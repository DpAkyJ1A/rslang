import SprintGame from '../../../../games/sprint/sprint';
import { SprintGameLaunchMode } from '../../../../games/sprint/types/index';
import Control from '../../../control';
import { route } from '../../../side-menu/side-menu-item/side-menu-item';

export const createGameLinks = (group: number, page: number, user: { id: string; token: string }) => {
    const wrapper = new Control(null, 'div', 'game-link');
    const dropdown = new Control(wrapper.node, 'ul', 'game-link__dropdown');
    const placeholder = new Control(wrapper.node, 'div', 'game-link__placeholder');
    placeholder.node.innerHTML = `
    <svg viewBox="0 0 24 24"<g><path d="M18,6h-5c0-1.7-1.3-3-3-3H6C5.4,3,5,2.6,5,2s0.4-1,1-1h13.5C19.8,1,20,0.8,20,0.5S19.8,0,19.5,0H6C4.9,0,4,0.9,4,2   s0.9,2,2,2h4c1.1,0,2,0.9,2,2H6c-3.3,0-6,2.7-6,6v8c0,2.2,1.8,4,4,4c1.1,0,2.1-0.4,2.8-1.2l4.6-4.7c0.2-0.1,0.3-0.2,0.5-0.2   s0.4,0.1,0.5,0.2l4.6,4.7c0.7,0.7,1.7,1.2,2.8,1.2c2.2,0,4-1.8,4-4v-8C24,8.7,21.3,6,18,6z M22,20c0,1.1-0.9,2-2,2   c-0.6,0-1.1-0.2-1.4-0.6l-4.5-4.5c0,0-0.9-0.9-2.1-0.9s-2.1,0.9-2.1,0.9l-4.5,4.5C5.1,21.8,4.6,22,4,22c-1.1,0-2-0.9-2-2v-8   c0-2.2,1.8-4,4-4h12c2.2,0,4,1.8,4,4V20z"/><circle cx="17" cy="15" r="1"/><circle cx="17" cy="11" r="1"/><circle cx="15" cy="13" r="1"/><circle cx="19" cy="13" r="1"/><path d="M9,12H8v-1c0-0.6-0.4-1-1-1s-1,0.4-1,1v1H5c-0.6,0-1,0.4-1,1s0.4,1,1,1h1v1c0,0.6,0.4,1,1,1s1-0.4,1-1v-1h1   c0.6,0,1-0.4,1-1S9.6,12,9,12z"/></g></svg>
      `;
    const audioGame = new Control(dropdown.node, 'a', 'game-link__item game-link__item_audio');
    (audioGame.node as HTMLAnchorElement).href = '/#games';
    audioGame.node.setAttribute('data-group', `${group}`);
    audioGame.node.innerHTML = `
    <svg viewBox="0 0 48 48"><path clip-rule="evenodd" d="M39,42h-6c-2.762,0-5-2.238-5-5v-2c0-2.762,2.238-5,5-5h4l0,0h5  c0-8.537,0-25.029,0-25c0-1.104-0.896-2-2-2c-0.107,0-0.211,0.015-0.313,0.032L21.344,8.094l-0.002-0.006l-0.029,0.042  C20.548,8.41,20,9.138,20,10v30v2c0,2.762-2.238,5-5,5H9c-2.762,0-5-2.238-5-5v-2c0-2.762,2.238-5,5-5h4l0,0h5V10l0,0  c0-1.749,1.13-3.22,2.693-3.763l-0.006-0.018L39,1.125l0.005,0.012C39.323,1.054,39.654,1,40,1c2.209,0,4,1.791,4,4l0,0v30v2  C44,39.762,41.762,42,39,42z M18,40L18,40v-3h-4l0,0H9c-1.656,0-3,1.343-3,3v2c0,1.657,1.344,3,3,3h6c1.656,0,3-1.343,3-3V40z   M42,35C42,35,42,35,42,35v-3h-4l0,0h-5c-1.657,0-3,1.343-3,3v2c0,1.657,1.343,3,3,3h6c1.657,0,3-1.343,3-3V35z"/></svg>
    `;
    const sprintGame = new Control(dropdown.node, 'a', 'game-link__item game-link__item_sprint');
    (sprintGame.node as HTMLAnchorElement).href = '/#games';
    sprintGame.node.setAttribute('data-group', `${group}`);
    sprintGame.node.innerHTML = `
    <svg height="56" viewBox="0 0 48 48" width="56" xmlns="http://www.w3.org/2000/svg"><path d="M30 2h-12v4h12v-4zm-8 26h4v-12h-4v12zm16.05-13.23l2.85-2.85c-.86-1.03-1.8-1.97-2.83-2.83l-2.85 2.85c-3.07-2.46-6.98-3.94-11.23-3.94-9.95 0-17.99 8.06-17.99 18s8.04 18 17.99 18 18.01-8.06 18.01-18c0-4.25-1.48-8.15-3.95-11.23zm-14.05 25.23c-7.73 0-14-6.27-14-14s6.27-14 14-14 14 6.27 14 14-6.27 14-14 14z"/></svg>
    `;
    sprintGame.node.onclick = (e: Event) => {
        route(e);
        startGame(e, { group, page, user });
    };
    // audioGame.node.onclick = startGame;
    return wrapper.node;
};

const startGame = (e: Event, props: { group: number; page: number; user: { id: string; token: string } }) => {
    const target = e.target as HTMLButtonElement;
    const btn = target.closest('a') as HTMLAnchorElement;
    const container = document.querySelector('.main') as HTMLElement;
    if (btn.classList.contains('game-link__item_sprint')) {
        const sprint = new SprintGame(SprintGameLaunchMode.textbook, container, props.user, {
            group: props.group,
            page: props.page,
        });
        sprint.start();
    } else {
        // audiocall
    }
};
