import Control from 'control';

export const createSideMenuToggle = (sideMenu: HTMLElement) => {
    const toggle = new Control(sideMenu, 'div', 'side-menu__toggle');

    const openIcon = new Control(toggle.node, 'ion-icon', 'side-menu__toggle_open');
    openIcon.node.setAttribute('name', 'menu-outline');

    const closeIcon = new Control(toggle.node, 'ion-icon', 'side-menu__toggle_close');
    closeIcon.node.setAttribute('name', 'close-outline');

    const nav = document.querySelector('.side-menu') as HTMLElement;
    toggle.node.onclick = function () {
        toggle.node.classList.toggle('active');
        nav.classList.toggle('active');
    };
    window.onresize = (event) => {
        if (window.innerWidth < 768) {
            toggle.node.classList.remove('active');
            nav.classList.remove('active');
        }
    };
};
