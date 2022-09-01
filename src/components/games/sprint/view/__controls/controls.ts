import Control from '../../../../view/control';
import { createSelect } from '../__select/select';

export const createStartGameControls = () => {
    const controls = new Control(null, 'div', 'content__controls');
    const select = createSelect();
    const btn = new Control(controls.node, 'button', 'content__start-btn', 'Start');
    btn.node.onclick = fireStartBtn;
    controls.node.append(select.wrapper.node, btn.node);
    return controls.node;
};

const fireStartBtn = (e: Event) => {
    const target = e.target as HTMLElement;
    const placeholder = target.closest('div')?.querySelector('.select__placeholder') as HTMLElement;
    const group = placeholder.getAttribute('data-group');
    const event = new CustomEvent('startGame', { detail: { group: group } });
    window.dispatchEvent(event);
};
