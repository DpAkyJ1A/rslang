import Control from 'control';

export const createWordGameCounterEl = (sprintQty = 0, audioQty = 0) => {
    const wrapper = new Control(null, 'div', 'card__played-qty played-qty');
    const sprint = new Control(wrapper.node, 'div', 'played-qty__sprint');
    const audio = new Control(wrapper.node, 'div', 'played-qty__audio');
    const sprintIcon = new Control(sprint.node, 'div', 'played-qty__sprint-icon');
    const audioIcon = new Control(audio.node, 'div', 'played-qty__audio-icon');
    new Control(sprint.node, 'div', 'played-qty__sprint-counter', `/ ${sprintQty}`);
    new Control(audio.node, 'div', 'played-qty__audio-counter', `/ ${audioQty}`);
    sprintIcon.node.innerHTML = `
      <svg viewBox="0 0 48 48"><path d="M30 2h-12v4h12v-4zm-8 26h4v-12h-4v12zm16.05-13.23l2.85-2.85c-.86-1.03-1.8-1.97-2.83-2.83l-2.85 2.85c-3.07-2.46-6.98-3.94-11.23-3.94-9.95 0-17.99 8.06-17.99 18s8.04 18 17.99 18 18.01-8.06 18.01-18c0-4.25-1.48-8.15-3.95-11.23zm-14.05 25.23c-7.73 0-14-6.27-14-14s6.27-14 14-14 14 6.27 14 14-6.27 14-14 14z"/></svg>
    `;
    audioIcon.node.innerHTML = `
    <svg viewBox="0 0 48 48"><path clip-rule="evenodd" d="M39,42h-6c-2.762,0-5-2.238-5-5v-2c0-2.762,2.238-5,5-5h4l0,0h5  c0-8.537,0-25.029,0-25c0-1.104-0.896-2-2-2c-0.107,0-0.211,0.015-0.313,0.032L21.344,8.094l-0.002-0.006l-0.029,0.042  C20.548,8.41,20,9.138,20,10v30v2c0,2.762-2.238,5-5,5H9c-2.762,0-5-2.238-5-5v-2c0-2.762,2.238-5,5-5h4l0,0h5V10l0,0  c0-1.749,1.13-3.22,2.693-3.763l-0.006-0.018L39,1.125l0.005,0.012C39.323,1.054,39.654,1,40,1c2.209,0,4,1.791,4,4l0,0v30v2  C44,39.762,41.762,42,39,42z M18,40L18,40v-3h-4l0,0H9c-1.656,0-3,1.343-3,3v2c0,1.657,1.344,3,3,3h6c1.656,0,3-1.343,3-3V40z   M42,35C42,35,42,35,42,35v-3h-4l0,0h-5c-1.657,0-3,1.343-3,3v2c0,1.657,1.343,3,3,3h6c1.657,0,3-1.343,3-3V35z"/></svg>
    `;
    return wrapper.node;
};
