export const screen = function() {
  let idCurrentSection = "screen-narrative";
  const sections = document.querySelectorAll(".js-screen");

  function goToNextSection(idCurrentSection, idNextSection) {
    let currentSection = document.getElementById(idCurrentSection);
    let nextSection = document.getElementById(idNextSection);

    nextSection.classList.add('is-visible')
    currentSection.classList.remove('is-visible')

    return idNextSection;
  }

  sections.forEach((section)=>{

    let btn = section.querySelector('[data-open-screen]');
    if (btn) {
      let idNextSection = btn.getAttribute('data-open-screen');

      btn.addEventListener('click', ()=>{
      console.log(idCurrentSection);
      idCurrentSection = goToNextSection(idCurrentSection, idNextSection);
      })
    }

  })
}
