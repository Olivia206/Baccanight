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
  if(playerAction === "attack" && botAction === "defence"){
    pvBot -= 10;
    console.log("attack vs defence pvBot "+ pvBot + "  pvPlayer " + pvPlayer);
  }
  else{
    pvBot -= 25;
    console.log("attack vs attack pvBot "+ pvBot + "  pvPlayer " + pvPlayer);
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
