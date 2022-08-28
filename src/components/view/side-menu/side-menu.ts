import Control from 'control';
import { createSideMenuItem } from './side-menu-item/side-menu-item';
import { createSideMenuToggle } from './__toggle/side-menu__toggle';

export const createSideMenu = (root: HTMLElement) => {
    const sideMenu = new Control(root, 'nav', 'side-menu');

    createSideMenuToggle(sideMenu.node);

    const sideMenuList = new Control(sideMenu.node, 'ul');

    createSideMenuItem(sideMenuList.node, 'Main', 'home-outline');
    createSideMenuItem(sideMenuList.node, 'Textbook', 'book-outline');
    createSideMenuItem(sideMenuList.node, 'Dictionary', 'globe-outline');
    createSideMenuItem(sideMenuList.node, 'Games', 'game-controller-outline');
    createSideMenuItem(sideMenuList.node, 'Stats', 'stats-chart-outline');
    createSideMenuItem(sideMenuList.node, 'Team', 'people-outline');

    addActiveClassToSelectedListItem(sideMenuList.node);
    return sideMenu.node;
};

function addActiveClassToSelectedListItem(sideMenuList: HTMLElement) {
    const list = sideMenuList.childNodes as NodeListOf<HTMLElement>;
    for (let i = 0; i < list.length; i++) {
        list[i].onclick = function () {
            let j = 0;
            while (j < list.length) {
                list[j++].className = 'side-menu-item';
            }
            list[i].className = 'side-menu-item active';
        };
    }
}
