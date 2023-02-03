import Section from './screens/section.js';

export default class ScreenManager {
    constructor () {
        this.screens = {
            section: new Section('#screen-manager-game')
        };

        this.bindEvents();
        this.handleHash();
    }
    
    bindEvents () {
        document.querySelectorAll('[data-open-screen]').forEach((btn) => {
            let screen = btn.getAttribute('data-open-screen');
            btn.addEventListener('click', this.open.bind(this, screen));
        });
    }

    open (name) {
        if (this.screens[name].isOpened) {
            return null;
        }

        for (let key in this.screens) {
            this.screens[key].close();
        }

        this.screens[name].open(false);

        document.body.setAttribute('data-page', name);
    }

    handleHash () {
        const hash = window.location.hash;
        if (hash) {
            this.open(hash.replace('#', ''));
        }
    }
}