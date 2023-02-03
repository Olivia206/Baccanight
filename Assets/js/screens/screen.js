import { gsap } from 'gsap';

export default class Screen {
    constructor (selector, opened = false) {
        if (typeof selector === 'string') {
            this.dom = document.querySelector(selector);
        } else {
            this.dom = selector;
        }
        this.isOpened = false;
        if (opened) {
            this.open(true);
        }

        this.init();
    }

    init () {
        // Override
    }

    open (immediate = false) {
        if (this.isOpened) {
            return false;
        }

        this.isOpened = true;

        this.dom.classList.add('is-visible');

        gsap.to(this.dom, {
            opacity: 1,
            duration: immediate ? 0 : 0.33,
            delay: 0.33,
            display: 'block',
            onComplete: () => window.dispatchEvent(new Event('resize'))
        });
    }

    close () {
        if (!this.isOpened) {
            return false;
        }

        this.isOpened = false;

        this.dom.classList.remove('is-visible');

        gsap.to(this.dom, {
            opacity: 0,
            duration: 0.33,
            onComplete: () => {
                window.scrollTo(0, 0);
                gsap.set(this.dom, { display: 'none' });
            }
        });
    }
}
