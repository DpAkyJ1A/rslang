import Control from "control";

export const createSideMenuItem = (sideMenuList: HTMLElement, title: string, iconName: string) => {
  const listItem = new Control(sideMenuList, "li", "side-menu-item");
  new Control(listItem.node, "b");
  new Control(listItem.node, "b");
  const listItemIconBox = new Control(listItem.node, "span", "side-menu-item__icon");
  const icon = new Control(listItemIconBox.node, "ion-icon");
  icon.node.setAttribute("name", iconName);
  new Control(listItem.node, "span", "side-menu-item__title", title);
}