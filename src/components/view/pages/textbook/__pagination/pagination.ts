import Control from 'control';

const NUMBER_OF_PAGES = 30;
const TOTAL_ELEMENTS_TO_DiSPLAY = 9;

export const createPgnEl = (page: number) => {
    const wrapper = new Control(null, 'div', 'textbook__pagination pagination');
    const list = new Control(wrapper.node, 'ul', 'pagination__list');

    for (let i = 0; i < TOTAL_ELEMENTS_TO_DiSPLAY; i++) {
        const item = new Control(wrapper.node, 'li', 'pagination__item');
        if (i === 0) {
            item.node.innerHTML = `
              <a href="">
                <svg class="pagination__icon" focusable="false" viewbox="0 0 24 24" aria-hidden="true"><path d="M14 7l-5 5 5 5V7z"></path></svg>
              </a>
            `;
        }
        if (i === TOTAL_ELEMENTS_TO_DiSPLAY - 1) {
            item.node.innerHTML = `
              <a href="">
                <svg class="pagination__icon" focusable="false" viewbox="0 0 24 24" aria-hidden="true"><path d="M10 17l5-5-5-5v10z"></path></svg>
              </a>
            `;
        }
        if (i === TOTAL_ELEMENTS_TO_DiSPLAY - 2) {
            item.node.innerHTML = `
              <li class="pagination__item">
                <a href="">${NUMBER_OF_PAGES}</a>
              </li>
          `;
        }
        if (i === 1) {
            item.node.innerHTML = `
                <li class="pagination__item">
                  <a href="">1</a>
                </li>
            `;
        } else {
            if ((i === 2 && page !== 1) || (i === 6 && page !== NUMBER_OF_PAGES)) {
                item.node.innerHTML = `
                    <li class="pagination__item">
                      <a href="">...</a>
                    </li>
                `;
            }
            if ((i === 2 && page === 1) || (i === 7 && page === NUMBER_OF_PAGES)) {
                item.node.innerHTML = `
                    <li class="pagination__item">
                      <a href="">2</a>
                    </li>
                `;
            }
            if (i === 3) {
                item.node.innerHTML = `
                  <li class="pagination__item">
                    <a href="">${page - 1}</a>
                  </li>
                `;
            }
            if (i === 4) {
                item.node.innerHTML = `
                  <li class="pagination__item">
                    <a href="">${page}</a>
                  </li>
                `;
            }
            if (i === 5) {
                item.node.innerHTML = `
                  <li class="pagination__item">
                    <a href="">${page + 1}</a>
                  </li>
                `;
            }
        }
        list.node.append(item.node);
    }

    return wrapper.node;
};
