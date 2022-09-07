import { SprintGameLaunchMode } from 'components/games/sprint/types';
import Control from 'control';

export default class WrapperGamePage extends Control {
    topToolBar: Control;
    closeBtn: Control;
    fullScreenBtn: Control;
    content: Control;
    constructor() {
        super(null, 'div', 'audio-game');
        this.topToolBar = new Control(this.node, 'div', 'audio-game__top-bar');
        this.closeBtn = new Control(this.topToolBar.node, 'div', 'audio-game__close');
        this.fullScreenBtn = new Control(this.topToolBar.node, 'div', 'audio-game__fullscreen');
        this.closeBtn.node.innerHTML = `
        <svg viewBox="0 0 24 24"><g id="info"/><g id="icons"><path d="M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z" id="exit"/></g></svg>
        `;
        this.fullScreenBtn.node.innerHTML = `
        <svg viewBox="0 0 24 24">
        <path d="M3 5C3 3.89543 3.89543 3 5 3H7C7.27614 3 7.5 3.22386 7.5 3.5C7.5 3.77614 7.27614 4 7 4H5C4.44772 4 4 4.44772 4 5V7C4 7.27614 3.77614 7.5 3.5 7.5C3.22386 7.5 3 7.27614 3 7V5ZM12.5 3.5C12.5 3.22386 12.7239 3 13 3H15C16.1046 3 17 3.89543 17 5V7C17 7.27614 16.7761 7.5 16.5 7.5C16.2239 7.5 16 7.27614 16 7V5C16 4.44772 15.5523 4 15 4H13C12.7239 4 12.5 3.77614 12.5 3.5ZM3.5 12.5C3.77614 12.5 4 12.7239 4 13V15C4 15.5523 4.44772 16 5 16H7C7.27614 16 7.5 16.2239 7.5 16.5C7.5 16.7761 7.27614 17 7 17H5C3.89543 17 3 16.1046 3 15V13C3 12.7239 3.22386 12.5 3.5 12.5ZM16.5 12.5C16.7761 12.5 17 12.7239 17 13V15C17 16.1046 16.1046 17 15 17H13C12.7239 17 12.5 16.7761 12.5 16.5C12.5 16.2239 12.7239 16 13 16H15C15.5523 16 16 15.5523 16 15V13C16 12.7239 16.2239 12.5 16.5 12.5Z"/>
        </svg>
        `;
        this.content = new Control(this.node, 'div', 'audio-game__content content');
    }

    clearContentNode() {
        this.content.node.innerHTML = '';
    }
}
