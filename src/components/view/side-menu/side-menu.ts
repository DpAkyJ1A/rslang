import Control from 'control';
import { createSideMenuItem } from './side-menu-item/side-menu-item';
import { createSideMenuToggle } from './__toggle/side-menu__toggle';

let sideMenuList: HTMLElement;

export const createSideMenu = (root: HTMLElement) => {
    const sideMenu = new Control(root, 'nav', 'side-menu');

    createSideMenuToggle(sideMenu.node);

    sideMenuList = new Control(sideMenu.node, 'ul').node;

    createSideMenuItem(sideMenuList, 'Main', 'home-outline');
    createSideMenuItem(sideMenuList, 'Textbook', 'book-outline');
    createSideMenuItem(sideMenuList, 'Dictionary', 'globe-outline');
    createSideMenuItem(sideMenuList, 'Games', 'game-controller-outline');
    createSideMenuItem(sideMenuList, 'Stats', 'stats-chart-outline');
    createSideMenuItem(sideMenuList, 'Team', 'people-outline');

    //addActiveClassToSelectedListItem(sideMenuList);
    return sideMenu.node;
};

// function addActiveClassToSelectedListItem(sideMenuList: HTMLElement) {
//     const list = sideMenuList.childNodes as NodeListOf<HTMLElement>;
//     for (let i = 0; i < list.length; i++) {
//         list[i].onclick = function () {
//             let j = 0;
//             while (j < list.length) {
//                 list[j++].className = 'side-menu-item';
//             }
//             list[i].className = 'side-menu-item active';
//         };
//     }
// }

export function updateSideMenu(view: string) {
    const list = sideMenuList.childNodes as NodeListOf<HTMLElement>;
    for (let i = 0; i < list.length; i++) {
        const listLink = list[i].querySelector(".side-menu-item__title") as HTMLSpanElement;
        const title = listLink.innerText.toLowerCase() as string;
        if (view === title) {
            let j = 0;
            while (j < list.length) {
                list[j++].className = 'side-menu-item';
            }
            list[i].className = 'side-menu-item active';
        }
    }
}