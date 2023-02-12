export const startGame = function() {
  let pvPlayer = 100;
  let pvBot = 100;

  let counterAttack = 0;
  let counterDefence = 0;
  let counterUltimate = 0;
  let maxDefence = 3;

  const damageAttack = 15,
        damageUltimateAttack = 25,
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

  function toggleIsVisible(player, bot) {
    if(player === "ultimate" && bot === "attack"){
      animPlayerIdleContainer.classList.toggle("is-visible");
      animBotIdleContainer.classList.toggle("is-visible");

      animPlayerContainer.classList.toggle("is-visible");
    }
    else if(pvBot <= 0) {
      animPlayerIdleContainer.classList.toggle("is-visible");
      animBotIdleContainer.classList.toggle("is-visible");

      animBotDeathContainer.classList.toggle("is-visible");
      animVictoryContainer.classList.toggle("is-visible");
    }
    else{

      animPlayerIdleContainer.classList.toggle("is-visible");
      animBotIdleContainer.classList.toggle("is-visible");

      animPlayerContainer.classList.toggle("is-visible");
      animBotContainer.classList.toggle("is-visible");
    }
  }

  function gameControls(control){
    let bot = botActions();
    let player = playerActions(control);
    toggleIsVisible(player, bot);
    updatePv(player, bot);
    updateAnimations(player, bot);
    updateLifeBar();

    if (pvBot <= 0) {
      modalVictory.classList.add("is-visible");
      control.parentNode.classList.add("disabled");
      setTimeout(animDeath, 1500);
    }
    setTimeout(() => {
      toggleIsVisible(player, bot)
    }, 3500);
  }

  function updateAnimations (playerAction, botAction) {
    if (playerAction === "attack" && botAction === "defence") {
      animationPlayer.goToAndStop(742);
      animationPlayer.playSegments([742,850],true);

      animationEvil.goToAndStop(0);
      animationEvil.playSegments([0,200],true);
    }
    else if (playerAction === "attack" && botAction === "attack") {
      animationPlayer.goToAndStop(742);
      animationPlayer.playSegments([742,850],true);

      animationEvil.goToAndStop(210);
      animationEvil.playSegments([210,300],true);

    }
    else if (playerAction === "ultimate" && botAction === "attack") {
      animationPlayer.goToAndStop(230);
      animationPlayer.playSegments([230,320],true);
    }
    else if (playerAction === "ultimate" && botAction === "defence") {
      animationPlayer.goToAndStop(850);
      animationPlayer.playSegments([850,950],true);

      animationEvil.goToAndStop(0);
      animationEvil.playSegments([0,200],true);
    }
    else if (playerAction === "defence" && botAction === "attack") {
      animationPlayer.goToAndStop(0);
      animationPlayer.playSegments([0,220],true);

      animationEvil.goToAndStop(210);
      animationEvil.playSegments([210,300],true);
    }
    else if (playerAction === "defence" && botAction === "defence") {
      animationPlayer.goToAndStop(0);
      animationPlayer.playSegments([0,220],true);

      animationEvil.goToAndStop(0);
      animationEvil.playSegments([0,200],true);
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
    if (pvBot <= 25) {
      lifebarBot.style.background = "#B72D2D";
    }
    if (pvPlayer <= 50 ) {
      lifebarPlayer.style.background = "orange";
    }
    if (pvPlayer <= 25) {
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

  function animDeath() {
    console.log("c la muerte");
    document.querySelector("#control-container").classList.add("disabled");

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
      //console.log(control.parentNode)
      // control.parentNode.classList.toggle("disabled");
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
