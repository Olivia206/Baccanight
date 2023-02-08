const btns_popup = document.querySelectorAll(".btns-popup");
console.log(btns_popup);
const popupCredit = document.getElementById("popup-credit");
const popupMenu = document.getElementById("popup-menu");

const btn_open_credit = document.getElementById("btn-credit");
const btn_open_menu = document.getElementById("btn-menu");

btns_popup.forEach(btn => {
  btn.addEventListener("click", ()=>{
    console.log("btns");
    if(popupCredit){
      console.log("hello credit");
      popup(popupCredit, btn_open_credit)
    }

    if (popupMenu) {
      console.log("hello");
      popup(popupMenu, btn_open_menu)
    }
  })
});

function popup(popup, openBtn) {
  popup.classList.toggle("popup--open");
  if (popup.className.includes("popup--open")) {
    openBtn.style.display = "none";
  }
  else{
    openBtn.style.display = "block";
  }
}
