import { animationManager } from './animation-manager.js';

export const startGame = function() {
  let pvPlayer = 100;
  let pvBot = 100;

  let counterAttack = 0;
  let counterDefence = 0;
  let counterUltimate = 0;
  let maxDefence = 3;

  const damageAttack = 25,
        damageUltimateAttack = 35,
        damageDefence = 10;

  const lifebarPlayer = document.querySelector(".lifebar-good div"),
        lifebarBot = document.querySelector(".lifebar-evil div"),
        controls = document.querySelectorAll(".control"),
        btnUltimate = document.querySelector(".control__ultimate"),
        btnAttack = document.querySelector(".control__attack"),
        btnDefence = document.querySelector(".control__defence"),
        modalVictory = document.querySelector(".modal__victory"),
        counterDefenceContent = document.querySelector(".counter"),
        progressBar = document.querySelector(".control-progress"),
        animPlayerContainer = document.querySelector('#character-good-sprite'),
        animBotContainer = document.querySelector('#character-evil-sprite');

  const animPlayerUltimatePath = '/assets/js/animations/anim-player-ultimate.json',
        animPlayerIdlePath = '/assets/js/animations/anim-player-idle.json',
        animEvilAttackPath = '/assets/js/animations/anim-evil-attack.json',
        animEvilDeathPath = '/assets/js/animations/anim-evil-death.json';

  // Animations player

  var animationPlayerIdle = lottie.loadAnimation({
    container: animPlayerContainer,
    path: animPlayerIdlePath,
    renderer: 'svg',
    loop: true,
    autoplay: false
  });
  var animationPlayerUltimate = lottie.loadAnimation({
      container: animPlayerContainer,
      path: animPlayerUltimatePath,
      renderer: 'svg',
      loop: false,
      autoplay: false
    });

  // Animations bot

  var animationEvilAttack = lottie.loadAnimation({
    container: animBotContainer,
    path: animEvilAttackPath,
    renderer: 'svg',
    loop: false,
    autoplay: false
  });
  var animationEvilDeath = lottie.loadAnimation({
    container: animBotContainer,
    path: animEvilDeathPath,
    renderer: 'svg',
    loop: false,
    autoplay: false
  });

  animationPlayerIdle.play();

  if (counterAttack === 0) {
    toggleTutorial("attack");
  } 
  else if (counterAttack === 1 && counterDefence === 0) {
    toggleTutorial("defence");
  }

  function gameControls(control){

    let bot = botActions();
    let player = playerActions(control);
    updatePv(player, bot);
    updateLifeBar();

    if (pvBot <= 0) {
      modalVictory.classList.add("is-visible");
      control.parentNode.classList.add("disabled");
      setTimeout(animDeath, 1500);
    }
  }
  function animDeath() {
    animationEvilDeath.play()
  }

  function updatePv(playerAction, botAction) {
    if(playerAction === "attack" && botAction === "defence" || playerAction === "ultimate" && botAction === "defence"){
      if(playerAction === "attack"){
        pvBot -= damageDefence;
      }
      else{
        pvBot -= damageAttack;
      }
      pvPlayer -= 0;
    }
    else if(playerAction === "attack" && botAction === "attack" || playerAction === "ultimate" && botAction === "attack"){
      if(playerAction === "attack"){
        pvBot -= damageAttack;
      }
      else{
        pvBot -= damageUltimateAttack;
      }
      pvPlayer -= damageAttack;
    }
    else if(playerAction === "defence" && botAction === "attack"){
        pvBot -= 0;
        pvPlayer -= damageDefence;
    }
    else{
        pvBot -= 0;
        pvPlayer -= 0;
    }
    if (pvBot <= 0) {
      lifebarBot.style.width = "0%";
    } else {
      lifebarBot.style.width = pvBot + "%";
    }
    lifebarPlayer.style.width = pvPlayer + "%";
  }

  function updateLifeBar() {
    if (pvBot <= 50 ) {
      lifebarBot.style.background = "orange";
    }
    if (pvBot <= 20) {
      lifebarBot.style.background = "#B72D2D";
    }
    if (pvPlayer <= 50 ) {
      lifebarPlayer.style.background = "orange";
    }
    if (pvPlayer <= 20) {
      lifebarPlayer.style.background = "#B72D2D";
    }
  }

  function playerActions(control) {
    let btnAttr = control.getAttribute('data-spell');
    let playerAction = null;

    if(btnAttr == "attack"){
      counterAttack += 1;
      animationPlayerUltimate.goToAndStop(0);

      if (counterAttack != 0 && counterAttack % 2  == 0) {
        btnUltimate.classList.remove("disabled");
      }
      if (counterAttack === 1) {
        toggleTutorial(btnAttr);
        toggleTutorial("defence");
      }
      if (counterAttack != 0 && counterAttack % 2 == 0) {
        progressBar.style.cssText += '--num: 100';
      } else {
        progressBar.style.cssText += '--num: 27';
      }

      playerAction = btnAttr;
      return playerAction;
    }
    else if(btnAttr == "defence"){
      maxDefence -= 1;
      counterDefenceContent.innerHTML = "x" + maxDefence;
      counterDefence += 1;

      if (counterDefence === 3) {
        console.log("counterDefence = " + counterDefence);
        control.classList.add("disabled");
      }
      else {

        if (counterDefence === 1) {
          toggleTutorial(btnAttr);
          btnDefence.classList.add("disabled");
        }
        playerAction = btnAttr;
        return playerAction;
      }
    }
    else {
      animationPlayerUltimate.play();
      counterUltimate += 1;
      progressBar.style.cssText += '--num: 0';

      if (counterUltimate === 0) {
        progressBar.style.cssText += '--num: 0';
      } else if (counterUltimate === 1) {
        toggleTutorial(btnAttr);
        btnAttack.classList.remove("disabled");
        btnDefence.classList.remove("disabled");
      }

      playerAction = "ultimate";
      control.classList.add("disabled");
      return playerAction;
    }
  }

  function botActions() {
    let sort = Math.floor(Math.random() * 2);
    let botAction = null;
    if (sort == 0) {
      console.log("bot is attacking olala")
      botAction = "attack";
      animationEvilAttack.play();
      return botAction;
    }
    else{
      botAction = "defence";
      return botAction;
    }
  }

  function toggleTutorial(type) {
    if (type === "attack") {
      document.querySelector(".tutorial__attack").classList.toggle("is-visible");

    } else if (type === "defence") {
      document.querySelector(".tutorial__defence").classList.toggle("is-visible");
    }
    else {
      document.querySelector(".tutorial__ultimate").classList.toggle("is-visible");
    }
  }

  controls.forEach(control => {
    control.addEventListener("click", ()=>{
      if (counterAttack === 0) {
        btnDefence.classList.remove("disabled");
        btnAttack.classList.add("disabled");
      }
      else if (counterDefence === 0) {
        btnAttack.classList.remove("disabled");
      }
      else if (counterAttack === 1 && counterDefence === 1) {
        btnAttack.classList.add("disabled");
        btnUltimate.classList.remove("disabled");

        toggleTutorial("ultimate");
      }
      gameControls(control);
    })
  });
}
