import Control from 'control';

export const createScrollUpBtn = (main: HTMLElement) => {
    const btn = new Control(null, 'button', 'scroll-up-btn', '↑');

    main.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (window.innerWidth < 1200 && (main.scrollTop > 200 || main.scrollTop > 200)) {
            btn.node.style.display = 'block';
        } else {
            btn.node.style.display = 'none';
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    btn.node.onclick = () => {
        main.scrollTop = 0; // For Safari
        main.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    return btn.node;
};
