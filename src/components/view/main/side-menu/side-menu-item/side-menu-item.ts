import Control from "control";

export const createSideMenuItem = (sideMenuList: HTMLElement, title: string, iconName: string) => {
  const listItem = new Control(sideMenuList, "li", "side-menu-item");
  const listItemLink = new Control(listItem.node, "a");
  listItemLink.node.setAttribute("href", `/${title.toLowerCase()}`);

  new Control(listItemLink.node, "b");
  new Control(listItemLink.node, "b");
  const listItemIconBox = new Control(listItemLink.node, "span", "side-menu-item__icon");
  const icon = new Control(listItemIconBox.node, "ion-icon");
  icon.node.setAttribute("name", iconName);
  new Control(listItemLink.node, "span", "side-menu-item__title", title);
}
