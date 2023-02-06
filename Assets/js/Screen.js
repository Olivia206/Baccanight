// import { gsap } from 'gsap';

export default class Screen  {

    constructor () {

        this.sections = document.querySelectorAll('.js-screen');
        this.setup(this.sections);

    }

    setup () {
        this.sections.forEach((currentSection) => {
            this.btn = currentSection.querySelector('[data-open-screen]');
            console.log(this.btn.getAttribute('data-open-screen'));
            let nextScreen = this.btn.getAttribute('data-open-screen');
            console.log(nextScreen)

            this.btn.addEventListener('click', ()=>{
              this.navigate.bind(currentSection, nextScreen);
            });
        });
    }

    navigate (currentSection, nextScreen) {
        this.goToNextScreen(nextScreen);
        this.closeCurrentScreen(currentSection);
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

    closeCurrentScreen (currentSection) {

        // if (!this.isOpened) {
        //     return false;
        // }

        // this.isOpened = false;

        currentSection.classList.remove('is-visible');

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
