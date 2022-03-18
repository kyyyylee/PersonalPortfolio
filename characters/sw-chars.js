import { people } from "../data/people.js";
import { getLastNumber, removeChildren } from "../utils/index.js";

const header = document.querySelector("header");
const main = document.querySelector("main");

const allCharsButton = document.createElement("button");
allCharsButton.textContent = "All Characters";
allCharsButton.addEventListener("click", function () {
  populateDOM(people);
});

const maleCharacters = people.filter((person) => person.gender == "male");
const maleCharsButton = document.createElement("button");
maleCharsButton.textContent = "Male Characters";
maleCharsButton.addEventListener("click", () => populateDOM(maleCharacters));

const femaleCharacters = people.filter((person) => person.gender == "female");
const femaleCharsButton = document.createElement("button");
femaleCharsButton.textContent = "Female Characters";
femaleCharsButton.addEventListener("click", () =>
  populateDOM(femaleCharacters)
);

const otherCharacters = people.filter((person) =>person.gender != "male" && person.gender != "female");
const otherCharsButton = document.createElement("button");
otherCharsButton.textContent = "Other Characters";
otherCharsButton.addEventListener("click", () => populateDOM(otherCharacters));

header.appendChild(allCharsButton);
header.appendChild(maleCharsButton);
header.appendChild(femaleCharsButton);
header.appendChild(otherCharsButton);

function populateDOM(characters) {
  removeChildren(main);
  characters.forEach((person) => {
    const personFig = document.createElement("figure");
    const personImg = document.createElement("img");
    let charNum = getLastNumber(person.url);
    personImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`;
    const personCap = document.createElement("figcaption");
    personCap.textContent = person.name;

    personFig.appendChild(personImg);
    personFig.appendChild(personCap);
    main.appendChild(personFig);
  });
}
