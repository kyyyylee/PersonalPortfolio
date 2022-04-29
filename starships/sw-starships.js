import { starships } from "../data/starships.js";
import { removeChildren, getLastNumber } from "../utils/index.js";

const navList = document.querySelector(".navList");
const shipViewer = document.querySelector(".shipViewer");
const shipMessage = document.querySelector(".modal p");

// Get the modal
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function populateNav() {
  starships.forEach((starship) => {
    const listItem = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.href = "#!";
    anchor.textContent = starship.name;
    anchor.addEventListener("click", () => populateShipView(starship));
    listItem.addEventListener("click", () => populateShipView(starship));
  
    listItem.appendChild(anchor);
    navList.appendChild(listItem);
  });
}

populateNav();

function populateShipView(shipData) {
  removeChildren(shipViewer);
  const shipFigure = document.createElement("figure")
  const shipImage = document.createElement("img");
  let shipNum = getLastNumber(shipData.url);
  shipImage.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`;
  let shipCaption = document.createElement("figcaption")
  shipCaption.textContent = shipData.name

  shipFigure.appendChild(shipImage)
  shipFigure.appendChild(shipCaption)

  shipImage.addEventListener("error", () => {
    console.log("Image error!!!!!!");
    shipImage.hidden = true;
    shipMessage.textContent = `The ship known as ${shipData.name} is currently in space port for repairs.`;
    // When the user clicks the button, open the modal
    modal.style.display = "block";
    shipCaption.textContent = ""
  });

  shipViewer.appendChild(shipFigure);
}
