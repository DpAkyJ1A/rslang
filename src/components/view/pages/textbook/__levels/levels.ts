import Control from 'control';

const levelList: LevelList = {
    a1: 'A0/A1 (Beginner/Elementary) ',
    a2: 'A2 (Pre-Intermediate) ',
    b1: 'B1 (Intermediate) ',
    b2: 'B2 (Upper-Intermediate) ',
    b3: 'C1 (Advanced) ',
    b4: 'C2 (Proficient) ',
};

export const createLevels = () => {
    const block = new Control(null, 'div', 'textbook__levels');
    const wrapper = new Control(block.node, 'div', 'textbook__level-wrapper');
    for (const key of Object.keys(levelList)) {
        new Control(wrapper.node, 'button', 'textbook__level-btn btn-reset', levelList[key]);
    }
    return block.node;
};

interface LevelList {
    [N: string]: string;
}
