import Control from 'control';
import { route } from '../../../side-menu/side-menu-item/side-menu-item';

const levelList: LevelList = {
    0: 'A1 Elementary',
    1: 'A2 Pre-Intermediate',
    2: 'B1 Intermediate',
    3: 'B2 Upper-Intermediate',
    4: 'C1 Advanced',
    5: 'C2 Proficient',
};

export const createLevels = (group: number) => {
    const block = new Control(null, 'div', 'textbook__levels');
    const wrapper = new Control(block.node, 'div', 'textbook__level-wrapper');
    for (const key of Object.keys(levelList)) {
        const [tag, descr] = levelList[key].split(' ');
        const link = new Control(wrapper.node, 'a', `textbook__level-link textbook__level-link_${key}`);
        new Control(link.node, 'div', '', descr);
        new Control(link.node, 'span', '', tag);
        (link.node as HTMLAnchorElement).href = `/#textbook/?group=${key}&page=0`;
        if (group === +key) link.node.classList.add('textbook__level-link_active');
        link.node.onclick = route;
    }
    return block.node;
};

interface LevelList {
    [N: string]: string;
}
