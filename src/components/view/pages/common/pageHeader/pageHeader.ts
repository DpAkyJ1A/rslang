import Control from 'control';

export const createPageHeader = (title: string) => {
    const header = new Control(null, 'div', 'textbook__header');
    new Control(header.node, 'h2', 'textbook__title', `${title}`);
    const settingsToggle = new Control(header.node, 'div', 'textbook__settings settings');
    settingsToggle.node.innerHTML = `
      <span class="settings__label">Show translation</span>
      <div class="settings__toggle-wrapper">
        <input type="radio" name="rdo" id="toggle-yes">
        <input type="radio" name="rdo" id="toggle-no">
        <div class="settings__switch">
          <label for="toggle-yes">Yes</label>
          <label for="toggle-no">No</label>
          <span></span>
        </div>
      </div>
    `;

    const translationDisabled = localStorage.getItem('translationDisabled') || ('false' as string);
    console.log(translationDisabled);
    if (translationDisabled === 'false') {
        const inputYes = settingsToggle.node.querySelector('#toggle-yes') as HTMLInputElement;
        inputYes.checked = true;
    } else {
        const inputYes = settingsToggle.node.querySelector('#toggle-no') as HTMLInputElement;
        inputYes.checked = true;
        // setTimeout(() => {
        //   const cardTranslation = document.querySelectorAll('.card__translation') as NodeListOf<HTMLElement>;
        //   cardTranslation.forEach(translation => translation.classList.add('card__translation_disabled'));
        // })
    }

    settingsToggle.node.onclick = (event: Event) => {
        const target = event.target as HTMLElement;
        const cardTranslation = document.querySelectorAll('.card__translation') as NodeListOf<HTMLElement>;
        if (target.id === 'toggle-no') {
            cardTranslation.forEach((translation) => translation.classList.add('card__translation_disabled'));
            localStorage.setItem('translationDisabled', 'true');
        } else if (target.id === 'toggle-yes') {
            cardTranslation.forEach((translation) => translation.classList.remove('card__translation_disabled'));
            localStorage.setItem('translationDisabled', 'false');
        }
    };

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
