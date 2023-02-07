export const startGame = function() {
  let pvPlayer = 100;
  let pvBot = 100;

  let counterAttack = 0;
  let counterDefence = 0;
  let counterUltimate = 0;

  const damageAttack = 25,
        damageUltimateAttack = 35,
        damageDefence = 10;

  const lifebarPlayer = document.querySelector(".lifebar-good div"),
        lifebarBot = document.querySelector(".lifebar-evil div"), 
        controls = document.querySelectorAll(".control"),
        btnUltimate = document.querySelector(".control__ultimate"),
        btnAttack = document.querySelector(".control__attack"),
        btnDefence = document.querySelector(".control__defence");

  if (counterAttack === 0) {
    toggleTutorial("attack");
  } else if (counterAttack === 1 && counterDefence === 0) {
    toggleTutorial("defence");
  }

  function gameControls(control){
    let bot = botActions();
    let player = playerActions(control);

    if (pvBot > 0) {
      updatePv(player, bot);
    } else {
      console.log("Victoire !");
      control.parentNode.classList.add("disabled");
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
      console.log("attack vs defence pvBot "+ pvBot + "  pvPlayer " + pvPlayer);
    }
    else if(playerAction === "attack" && botAction === "attack" || playerAction === "ultimate" && botAction === "attack"){
      if(playerAction === "attack"){
        pvBot -= damageAttack;
      }
      else{
        pvBot -= damageUltimateAttack;
      }
      pvPlayer -= damageAttack;
      console.log("attack vs attack pvBot "+ pvBot + "  pvPlayer " + pvPlayer);
    }
    else if(playerAction === "defence" && botAction === "attack"){
        pvBot -= 0;
        pvPlayer -= damageDefence;
        console.log("defence vs attack pvBot "+ pvBot + "  pvPlayer " + pvPlayer);
    }
    else{
        pvBot -= 0;
        pvPlayer -= 0;
        console.log("defence vs defence pvBot "+ pvBot + "  pvPlayer " + pvPlayer);
    }
    lifebarPlayer.style.width = pvPlayer + "%";
    lifebarBot.style.width = pvBot + "%";
  }

  function playerActions(control) {
    let btnAttr = control.getAttribute('data-spell');
    let playerAction = null;

    if(btnAttr == "attack"){
      counterAttack += 1;

      if (counterAttack === 1) {
        toggleTutorial(btnAttr);
        toggleTutorial("defence");
      }

      playerAction = btnAttr;
      return playerAction;
    }
    else if(btnAttr == "defence"){
      if (counterDefence === 3) {
        control.classList.add("disabled");
      } 
      else {
        counterDefence += 1;

        if (counterDefence === 1) {
          toggleTutorial(btnAttr);
        }

        playerAction = btnAttr;
        return playerAction;
      }
    }
    else {
      counterUltimate += 1;

      if (counterUltimate === 1) {
        toggleTutorial(btnAttr);
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
      botAction = "attack";
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
      if (counterAttack != 0 && counterAttack % 2  == 0) {
        btnUltimate.classList.remove("disabled");
      } 
      else if (counterAttack === 0) {
        btnDefence.classList.remove("disabled");
        btnAttack.classList.add("disabled");
      } 
      else if (counterDefence === 0) {
        btnAttack.classList.remove("disabled");
      } 
      else if (counterAttack === 1 && counterDefence === 1) {
        btnAttack.classList.add("disabled");
        btnDefence.classList.add("disabled");
        btnUltimate.classList.remove("disabled");

        toggleTutorial("ultimate");
        btnAttack.classList.remove("disabled");
        btnDefence.classList.remove("disabled");
      }
      console.log( counterAttack,counterDefence, counterUltimate)
      gameControls(control);
    })
  });
}
