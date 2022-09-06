import Control from '../../../../view/control';
import { SprintGameLaunchMode } from '../../types/index';
import { createSelect } from '../__select/select';

export const createStartGameControls = (mode: SprintGameLaunchMode) => {
    const controls = new Control(null, 'div', 'content__controls');
    const btn = new Control(controls.node, 'button', 'content__start-btn', 'Start');
    btn.node.onclick = (e: Event) => {
        fireStartBtn(e, mode);
    };
    if (mode === SprintGameLaunchMode.sideBar) {
        const select = createSelect();
        controls.node.append(select.wrapper.node, btn.node);
    }
    controls.node.append(btn.node);
    return controls.node;
};

const fireStartBtn = (e: Event, mode: SprintGameLaunchMode) => {
    const target = e.target as HTMLElement;
    let event: CustomEvent;
    if (mode === SprintGameLaunchMode.sideBar) {
        const placeholder = target.closest('div')?.querySelector('.select__placeholder') as HTMLElement;
        const group = placeholder.getAttribute('data-group');
        event = new CustomEvent('startGame', { detail: { group: group } });
    } else {
        event = new CustomEvent('startGame');
    }
    window.dispatchEvent(event);
};
