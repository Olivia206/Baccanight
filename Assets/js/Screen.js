// import { gsap } from 'gsap';

export default class Screen  {

    constructor () {

        this.sections = document.querySelectorAll('.js-screen');
        this.setup(this.sections);
        
    }

    setup () {
        this.sections.forEach((section) => {
            this.btn = section.querySelector('[data-open-screen]');
            let screen = this.btn.getAttribute('data-open-screen');

            this.btn.addEventListener('click', this.navigate.bind(section, screen));
        });
    }

    navigate (section, screen) {
        this.goToNextScreen(screen);
        this.closeCurrentScreen(section);
    }   


    goToNextScreen (screen) {
        document.getElementById(this.toString(screen)).classList.add("is-visible");
        
        // if (this.isOpened) {
        //     return false;
        // }

        // this.isOpened = true;

        // gsap.to(this.dom, {
        //     opacity: 1,
        //     duration: 0.33,
        //     delay: 0.33,
        //     display: 'block',
        //     onComplete: () => window.dispatchEvent(new Event('resize'))
        // });
    }

    closeCurrentScreen (section) {

        // if (!this.isOpened) {
        //     return false;
        // }

        // this.isOpened = false;

        section.classList.remove('is-visible');

        // gsap.to(this.dom, {
        //     opacity: 0,
        //     duration: 0.33,
        //     onComplete: () => {
        //         window.scrollTo(0, 0);
        //         gsap.set(this.dom, { display: 'none' });
        //     }
        // });
    }
}