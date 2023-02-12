// import { animationManager } from './animation-manager.js';

export const startGame = function() {
  let pvPlayer = 100;
  let pvBot = 100;

  let counterAttack = 0;
  let counterDefence = 0;
  let counterUltimate = 0;
  let maxDefence = 3;

  const damageAttack = 10,
        damageUltimateAttack = 20,
        damageDefence = 5;

  const lifebarPlayer = document.querySelector(".lifebar-good div"),
        lifebarBot = document.querySelector(".lifebar-evil div"),
        controls = document.querySelectorAll(".control"),
        btnUltimate = document.querySelector(".control__ultimate"),
        btnAttack = document.querySelector(".control__attack"),
        btnDefence = document.querySelector(".control__defence"),
        modalVictory = document.querySelector(".modal__victory"),
        counterDefenceContent = document.querySelector(".counter"),
        progressBar = document.querySelector(".control-progress"),
        animPlayerIdleContainer = document.querySelector('#character-good-idle'),
        animPlayerContainer = document.querySelector('#character-good-sprite'),
        animBotIdleContainer = document.querySelector('#character-evil-idle'),
        animBotContainer = document.querySelector('#character-evil-sprite'),
        animBotDeathContainer = document.querySelector('#character-evil-death'),
        animVictoryContainer = document.querySelector('#character-good-victory');

  const animPlayerIdlePath = '/assets/js/animations/anims-player/anim-player-idle.json',
        animPlayerPath = '/assets/js/animations/all-anim-player.json',
        animEvilIdlePath = '/assets/js/animations/anims-evil/anim-evil-idle.json',
        animEvilPath = '/assets/js/animations/all-anim-evil.json',
        animPlayerVictoryPath = '/assets/js/animations/anims-endings/anim-player-victory.json',
        animEvilDeathPath = '/assets/js/animations/anims-endings/anim-evil-death.json';

  // Animations pc

  var animationPlayerIdle = lottie.loadAnimation({
    container: animPlayerIdleContainer,
    path: animPlayerIdlePath,
    renderer: 'svg',
    loop: true,
    autoplay: false
  });
  var animationPlayer = lottie.loadAnimation({
    container: animPlayerContainer,
    path: animPlayerPath,
    renderer: 'svg',
    loop: false,
    autoplay: false
  });
  var animationPlayerVictory = lottie.loadAnimation({
    container: animVictoryContainer,
    path: animPlayerVictoryPath,
    renderer: 'svg',
    loop: false,
    autoplay: false
  });

  // Animations npc

  var animationEvil = lottie.loadAnimation({
    container: animBotContainer,
    path: animEvilPath,
    renderer: 'svg',
    loop: false,
    autoplay: false
  });
  var animationEvilIdle = lottie.loadAnimation({
    container: animBotIdleContainer,
    path: animEvilIdlePath,
    renderer: 'svg',
    loop: true,
    autoplay: false
  });
  var animationEvilDeath = lottie.loadAnimation({
    container: animBotDeathContainer,
    path: animEvilDeathPath,
    renderer: 'svg',
    loop: false,
    autoplay: false
  });
  
  if (pvBot > 0) {
    animationPlayerIdle.play();
    animationEvilIdle.play();
  }

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
    updateAnimations(player, bot);
    updateLifeBar();

    if (pvBot <= 0) {
      modalVictory.classList.add("is-visible");
      control.parentNode.classList.add("disabled");
      setTimeout(animDeath, 1500);
    }
  }

  function updateAnimations (playerAction, botAction) {
    if (playerAction === "attack" && botAction === "defence") {
      animationPlayer.goToAndStop(742);
      animationPlayer.playSegments([742,850],true);

      if (pvBot > 0) {
        setTimeout(animIdlePlayer, 3000);
        setTimeout(animIdleBot, 3000);
      }
    }
    else if (playerAction === "attack" && botAction === "attack") {
      animBotIdleContainer.style.display = "none";

      animationPlayer.goToAndStop(120);
      animationPlayer.playSegments([120,230],true);

      if (pvBot > 0) {
        setTimeout(animIdlePlayer, 4000);
        setTimeout(animIdleBot, 4000);
      }
    }
    else if (playerAction === "ultimate" && botAction === "attack") {
      animBotIdleContainer.style.display = "none";

      animationPlayer.goToAndStop(230);
      animationPlayer.playSegments([230,320],true);

      if (pvBot > 0) {
        setTimeout(animIdlePlayer, 4000);
        setTimeout(animIdleBot, 4000);
      } 
    }
    else if (playerAction === "ultimate" && botAction === "defence") {
      animationPlayer.goToAndStop(850);
      animationPlayer.playSegments([850,950],true);

      if (pvBot > 0) {
        setTimeout(animIdlePlayer, 4000);
        setTimeout(animIdleBot, 4000);
      } 
    }
    else if (playerAction === "defence" && botAction === "attack") {
      animationEvil.goToAndStop(210);
      animationEvil.playSegments([210,300],true);
      
      if (pvBot > 0) {
        setTimeout(animIdleBot, 3000);
      }
   
    }
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

      animationPlayer.goToAndStop(0);
      animationPlayer.playSegments([0,120],true);

      if (pvBot > 0) {
        setTimeout(animIdlePlayer, 3500);
      }

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

      return botAction;
    }
    else{
      console.log("bot is defending too bad")
      botAction = "defence";
      
      animationEvil.goToAndStop(0);
      animationEvil.playSegments([0,260],true);
      
      if (pvBot > 0) {
        setTimeout(animIdleBot, 5000);
      }

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

  function animIdleBot() {
    console.log('idle bot')
    animBotContainer.style.display = "none";
    animBotIdleContainer.style.display = "block";
  }

  function animIdlePlayer() {
    console.log('idle player')
    animPlayerContainer.style.display = "none";
    animPlayerIdleContainer.style.display = "block";
  }

  function animDeath() {
    console.log("c la muerte")
    animPlayerContainer.style.display = "none";
    animPlayerIdleContainer.style.display = "none";
    animBotContainer.style.display = "none";
    animBotIdleContainer.style.display = "none";
    
    animBotDeathContainer.style.display = "block";
    animVictoryContainer.style.display = "block";

    animationPlayerVictory.play();
    animationEvilDeath.play();
  }

  controls.forEach(control => {
    control.addEventListener("click", ()=>{

      animPlayerIdleContainer.style.display = "none";
      animBotIdleContainer.style.display = "none";
      animBotContainer.style.display = "block";
      animPlayerContainer.style.display = "block";

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