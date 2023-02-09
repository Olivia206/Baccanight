export const screen = function() {
  let idCurrentSection = "screen-narrative-1";
  const sections = document.querySelectorAll(".js-screen");

  const animEvilPath = '/assets/js/animations/anim-bouche-mechant.json';
  
  var animationEvil = lottie.loadAnimation({
     container: document.querySelector('.animation__dialog'),
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
      animationEvil.play();
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
