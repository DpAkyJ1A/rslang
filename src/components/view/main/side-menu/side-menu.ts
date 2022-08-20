import Control from 'control';
import { createSideMenuItem } from './side-menu-item/side-menu-item';
import { createSideMenuToggle } from './__toggle/side-menu__toggle';

export const createSideMenu = (main: HTMLElement) => {
  const sideMenu = new Control(main, "nav", "side-menu");

  createSideMenuToggle(sideMenu.node);
  
  const sideMenuList = new Control(sideMenu.node, "ul");

  createSideMenuItem(sideMenuList.node, "Главная", "home-outline");
  createSideMenuItem(sideMenuList.node, "Учебник", "book-outline");
  createSideMenuItem(sideMenuList.node, "Словарь", "globe-outline");
  createSideMenuItem(sideMenuList.node, "Игры", "game-controller-outline");
  createSideMenuItem(sideMenuList.node, "Статистика", "stats-chart-outline");
  createSideMenuItem(sideMenuList.node, "Команда", "people-outline");

  addActiveClassToSelectedListItem(sideMenuList.node);
}

function addActiveClassToSelectedListItem(sideMenuList: HTMLElement) {
  const list = sideMenuList.childNodes as NodeListOf<HTMLElement>;
  for (let i = 0; i < list.length; i++) {
    list[i].onclick = function () {
      let j = 0;
      while (j < list.length) {
        list[j++].className = 'side-menu-item';
      }
      list[i].className = 'side-menu-item active';
    }
  }
}