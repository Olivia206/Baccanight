export const startGame = function() {
  let pvPlayer = 100;
  let pvBot = 100;

  let counterAttack = 0;
  let counterDefense = 0;

  const damageAttack = 25,
        damageUltimateAttack = 35,
        damageDefence = 10;

  const lifebarPlayer = document.querySelector(".lifebar-good div"),
        lifebarBot = document.querySelector(".lifebar-evil div"), 
        controls = document.querySelectorAll(".control"),
        btnUltimate = document.querySelector(".ultimate");

  function gameControls(control){
    let bot = botActions();
    let player = playerActions(control);

    if (pvBot > 0) {
      updatePv(player, bot);
    } else {
      console.log("Victoire !");
    }
    console.log(counterAttack)
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

      playerAction = "attack";
      return playerAction;
    }
    else if(btnAttr == "defence"){
      if (counterDefense === 3) {
        control.classList.add("disabled");
      } 
      else {
        counterDefense += 1;
        playerAction = "defence";
        return playerAction;
      }
    }
    else {
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

  controls.forEach(control => {
    control.addEventListener("click", ()=>{
      if (counterAttack != 0 && counterAttack % 2  == 0) {
        btnUltimate.classList.remove("disabled");
      }
      gameControls(control);
    })
  });
}
