export const screen = function() {
  let idCurrentSection = "screen-narrative-1";
  const sections = document.querySelectorAll(".js-screen");

  const animEvilPath = '/assets/js/animations/anim-evil-dialog.json';
  
  var animationEvil1 = lottie.loadAnimation({
     container: document.querySelector('.dialog__animation.anim-1'),
     path: animEvilPath,
     renderer: 'svg',
     loop: true,
     autoplay: false
   });
  var animationEvil2 = lottie.loadAnimation({
     container: document.querySelector('.dialog__animation.anim-2'),
     path: animEvilPath,
     renderer: 'svg',
     loop: true,
     autoplay: false
   });

  function goToNextSection(idCurrentSection, idNextSection) {
    let currentSection = document.getElementById(idCurrentSection);
    let nextSection = document.getElementById(idNextSection);

    nextSection.classList.add('is-visible')
    if (idNextSection === "screen-dialog-1") {
      animationEvil1.play();
    }
    if (idNextSection === "screen-dialog-2") {
      animationEvil2.play();
    }
    currentSection.classList.remove('is-visible')

    return idNextSection;
  }

  sections.forEach((section) => {

    let btn = section.querySelector('[data-open-screen]');
    if (btn) {
      let idNextSection = btn.getAttribute('data-open-screen');

      btn.addEventListener('click', () => {
      console.log(idCurrentSection);
      idCurrentSection = goToNextSection(idCurrentSection, idNextSection);
      })
    }

  })
}
