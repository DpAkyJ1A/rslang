import Control from '../../../view/control';

const TIMER_IN_SPRINT = 20;

// make sure we have only 1 timer instance - Singleton
let instance: Timer | null;

export default class Timer extends Control {
    private wrapper: Control;
    private display: Control;
    private interval: ReturnType<typeof setInterval> | undefined;
    private count: number;
    constructor() {
        super(null, 'div', 'timer');
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        if (!instance) instance = this;

        this.wrapper = new Control(this.node, 'div', 'timer__wrapper timer__wrapper_animated');
        this.display = new Control(this.wrapper.node, 'div', 'timer__display', `00:${TIMER_IN_SPRINT}`);
        this.interval = undefined;
        this.count = TIMER_IN_SPRINT;
        return instance;
    }

    set displayValue(value: string) {
        this.display.node.textContent = value;
    }

    get displayValue() {
        return this.display.node.textContent as string;
    }

    start(container: HTMLElement) {
        container.append(this.node);
        // let count = TIMER_IN_SPRINT;
        if (!this.interval) {
            this.interval = setInterval(() => {
                this.count--;
                const value = this.count < 10 ? '0' + this.count : this.count;
                this.displayValue = `00:${value}`;
                if (this.count === 0) {
                    clearInterval(this.interval);
                    this.wrapper.node.classList.remove('timer__wrapper_animated');
                    this.reset();
                    this.alarmTimeout();
                    // this.destroy();
                }
            }, 1000);
        }
    }

    reset() {
        clearInterval(this.interval);
        this.interval = undefined;
        this.display.node.innerHTML = `00:${TIMER_IN_SPRINT}`;
        this.count = TIMER_IN_SPRINT;
        this.wrapper.node.classList.add('timer__wrapper_animated');
    }

    alarmTimeout() {
        const event = new Event('sprintTimeout');
        document.dispatchEvent(event);
    }
}
