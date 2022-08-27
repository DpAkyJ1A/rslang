import Control from 'control';
import { route } from '../../../side-menu/side-menu-item/side-menu-item';

const NUMBER_OF_PAGES = 30;
const TOTAL_ELEMENTS_TO_DISPLAY = 9;

export const createPgnEl = (page: number, group: number) => {
    const wrapper = new Control(null, 'div', 'textbook__pagination pagination');
    const list = new Control(wrapper.node, 'ul', 'pagination__list');

    for (let i = 1; i <= TOTAL_ELEMENTS_TO_DISPLAY; i++) {
        const item = new Control(list.node, 'li', 'pagination__item');
        const link = new Control(item.node, 'a');
        link.node.onclick = route;

        if (i === 1) {
            link.node.innerHTML = `
              <svg class="pagination__icon" viewbox="0 0 24 24" aria-hidden="true"><path d="M14 7l-5 5 5 5V7z"></path></svg>
            `;
            if (page === 1) item.node.classList.add('pagination__item_disabled');
            (link.node as HTMLAnchorElement).href = `/#textbook/?group=${group}&page=${page - 1}`;
        } else if (i === TOTAL_ELEMENTS_TO_DISPLAY) {
            link.node.innerHTML = `
              <svg class="pagination__icon" viewbox="0 0 24 24" aria-hidden="true"><path d="M10 17l5-5-5-5v10z"></path></svg>
            `;
            if (page === NUMBER_OF_PAGES) item.node.classList.add('pagination__item_disabled');
            (link.node as HTMLAnchorElement).href = `/#textbook/?group=${group}&page=${page + 1}`;
        } else if (i === TOTAL_ELEMENTS_TO_DISPLAY - 1) {
            link.node.innerHTML = NUMBER_OF_PAGES + '';
        } else if (i === 2) {
            link.node.innerHTML = '1';
        } else {
            if (page < 5) {
                switch (i) {
                    case 3:
                        link.node.innerHTML = 2 + '';
                        break;
                    case 4:
                        link.node.innerHTML = 3 + '';
                        break;
                    case 5:
                        link.node.innerHTML = 4 + '';
                        break;
                    case 6:
                        link.node.innerHTML = 5 + '';
                        break;
                    case 7:
                        link.node.innerHTML = '...';
                        (link.node as HTMLAnchorElement).href = `/#textbook/?group=${group}&page=${page + 3}`;
                        break;
                }
            } else if (page > NUMBER_OF_PAGES - 4) {
                switch (i) {
                    case 3:
                        link.node.innerHTML = '...';
                        (link.node as HTMLAnchorElement).href = `/#textbook/?group=${group}&page=${page - 3}`;
                        break;
                    case 4:
                        link.node.innerHTML = NUMBER_OF_PAGES - 4 + '';
                        break;
                    case 5:
                        link.node.innerHTML = NUMBER_OF_PAGES - 3 + '';
                        break;
                    case 6:
                        link.node.innerHTML = NUMBER_OF_PAGES - 2 + '';
                        break;
                    case 7:
                        link.node.innerHTML = NUMBER_OF_PAGES - 1 + '';
                        break;
                }
            } else {
                switch (i) {
                    case 3:
                        link.node.innerHTML = '...';
                        (link.node as HTMLAnchorElement).href = `/#textbook/?group=${group}&page=${page - 3}`;
                        break;
                    case 4:
                        link.node.innerHTML = page - 1 + '';
                        break;
                    case 5:
                        link.node.innerHTML = page + '';
                        break;
                    case 6:
                        link.node.innerHTML = page + 1 + '';
                        break;
                    case 7:
                        link.node.innerHTML = '...';
                        (link.node as HTMLAnchorElement).href = `/#textbook/?group=${group}&page=${page + 3}`;
                        break;
                }
            }
        }
        if (Number(link.node.innerHTML) === page) item.node.classList.add('pagination__item_active');
        if (!(link.node as HTMLAnchorElement).href) {
            (link.node as HTMLAnchorElement).href = `/#textbook/?group=${group}&page=${link.node.innerHTML}`;
        }
    }
    return wrapper.node;
};
