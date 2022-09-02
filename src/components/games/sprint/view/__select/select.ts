import Control from '../../../../view/control';
import { levelList } from '../../../../view/pages/common/levels/levels';

export const createSelect = (group?: number) => {
    const groupToShow = group ? group : 1;
    const wrapper = new Control(null, 'div', 'content__select select');
    const placeholder = new Control(wrapper.node, 'div', 'select__placeholder', `${levelList[groupToShow]}`);
    placeholder.node.setAttribute('data-group', `${groupToShow}`);
    const list = new Control(wrapper.node, 'div', 'select__list select__list_hidden');
    for (const level of Object.keys(levelList)) {
        const item = new Control(list.node, 'div', 'select__item', `${levelList[level]}`);
        item.node.setAttribute('data-group', `${level}`);
        item.node.onclick = handleWithinSelectListClick;
    }
    if (group) wrapper.node.classList.add('select_disabled');
    placeholder.node.onclick = toggleSelect;
    return {
        wrapper,
        placeholder,
    };
};

const toggleSelect = (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains('select__placeholder')) return;
    const list = document.querySelector('.select__list') as HTMLElement;
    list.classList.toggle('select__list_hidden');
};

const handleWithinSelectListClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const group = target.dataset.group;
    const placeholder = document.querySelector('.select__placeholder') as HTMLElement;
    placeholder.textContent = target.textContent;
    placeholder.setAttribute('data-group', `${group}`);
    document.querySelector('.select__list')?.classList.add('select__list_hidden');
};

document.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    if (!document.querySelector('.select')) return;
    if (!target.matches('.select__placeholder') && !(document.querySelector('.select__list_hidden') as HTMLElement)) {
        (document.querySelector('.select__list') as HTMLElement).classList.add('select__list_hidden');
    }
});
