import Control from 'control';

export const createTextbookHeader = (title: string) => {
    const header = new Control(null, 'div', 'textbook__header', undefined);
    new Control(header.node, 'h2', 'textbook__title', `${title}`);
    const settingsToggle = new Control(header.node, 'div', 'textbook__settings settings', undefined);
    settingsToggle.node.innerHTML = `
      <span class="settings__label">Show translation</span>
      <div class="settings__toggle-wrapper">
        <input type="radio" name="rdo" id="toggle-yes" checked>
        <input type="radio" name="rdo" id="toggle-no">
        <div class="settings__switch">
          <label for="toggle-yes">Yes</label>
          <label for="toggle-no">No</label>
          <span></span>
        </div>
      </div>
    `;
    return header.node;
};

// const handleToggleClick = (event: Event) => {
//     const target = event.target as HTMLInputElement;
//     const toggleTranslation = new CustomEvent('toggleTranslation', {
//         detail: {
//             state: target.id,
//         },
//     });
//     target.dispatchEvent(toggleTranslation);
// };
