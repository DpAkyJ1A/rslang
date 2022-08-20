import Control from 'control';

export const createSideMenuItem = (sideMenuList: HTMLElement, title: string, iconName: string) => {
    const listItem = new Control(sideMenuList, 'li', 'side-menu-item');
    const listItemLink = new Control(listItem.node, 'a');
    listItemLink.node.setAttribute('href', `/${title.toLowerCase()}`);
    listItemLink.node.onclick = route;

    new Control(listItemLink.node, 'b');
    new Control(listItemLink.node, 'b');
    const listItemIconBox = new Control(listItemLink.node, 'span', 'side-menu-item__icon');
    const icon = new Control(listItemIconBox.node, 'ion-icon');
    icon.node.setAttribute('name', iconName);
    new Control(listItemLink.node, 'span', 'side-menu-item__title', title);
};

const route = (event: Event) => {
    event = event || window.event;
    event.preventDefault();
    const target = event.currentTarget as HTMLAnchorElement;
    window.history.pushState({}, '', target.href);
    handleLocation();
};

interface IRoutes {
    404: string;
    [key: string]: string;
}

const routes: IRoutes = {
    404: '',
    '/главная': '',
    '/учебник': '',
    '/словарь': '',
    '/игры': '',
    '/статистика': '',
    '/команда': '',
};

const handleLocation = async () => {
    const path: string = window.location.pathname;
    const route = routes[path] || routes['404'];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById('main')!.innerHTML = html;
};

handleLocation();
