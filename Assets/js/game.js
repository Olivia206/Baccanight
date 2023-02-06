let pvPlayer = 100;
let pvBot = 100;
const damageAttack = 25;
const damageUltimateAttack = 35;
const defence = 15;

const controls = document.querySelectorAll(".control");

function gameControls(control){
  let bot = botActions();
  let player = playerActions(control);

  updatePv(player, bot);

}

function updatePv(playerAction, botAction) {
  if(playerAction === "attack" && botAction === "defence" || playerAction === "ultimate" && botAction === "defence"){
    if(playerAction === "attack"){
      pvBot -= 10;
    }
    else{
      pvBot -= 25;
    }
    pvPlayer -= 0;
    console.log("attack vs defence pvBot "+ pvBot + "  pvPlayer " + pvPlayer);
  }
  else if(playerAction === "attack" && botAction === "attack" || playerAction === "ultimate" && botAction === "attack"){
    if(playerAction === "attack"){
      pvBot -= 25;
    }
    else{
      pvBot -= 35;
    }
    pvPlayer -= 25;
    console.log("attack vs attack pvBot "+ pvBot + "  pvPlayer " + pvPlayer);
  }
  else if(playerAction === "defence" && botAction === "attack"){
      pvBot -= 0;
      pvPlayer -= 10;
      console.log("defence vs attack pvBot "+ pvBot + "  pvPlayer " + pvPlayer);
  }
  else{
      pvBot -= 0;
      pvPlayer -= 0;
      console.log("defence vs defence pvBot "+ pvBot + "  pvPlayer " + pvPlayer);
  }
}

function playerActions(control) {
  let btnAttr = control.getAttribute('data-spell');
  let playerAction = null;

  if(btnAttr == "attack"){
    playerAction = "attack";
    return playerAction;
  }
  else if(btnAttr == "defence"){
    playerAction = "defence";
    return playerAction;
  }
  else{
    playerAction = "ultimate";
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
    gameControls(control);
  })
});
