import { removeChildren } from "../utils/index.js";

//getting api data
const getAPIData = async (url) => {
  try {
    const result = await fetch(url);
    return await result.json();
  } catch (error) {
    console.error(error);
  }
};
//defining elements and class for document
const pokeHeader = document.querySelector("header");
const pokeGrid = document.querySelector(".pokegrid");
class Pokemon {
  constructor(name, height, weight, abilities, types) {
    (this.id = 9001),
      (this.name = name),
      (this.height = height),
      (this.weight = weight),
      (this.abilities = abilities),
      (this.types = types);
  }
}
//load pokemon button
const loadPokemonButton = document.createElement("button");
loadPokemonButton.textContent = "Load Pokemon";
pokeHeader.appendChild(loadPokemonButton);
loadPokemonButton.addEventListener("click", () => {
  const pokeNumber = prompt("How many pokemon (total) would you like to load?");
  removeChildren(pokeGrid);
  if (pokeNumber === null) {
    //if they dont answer the promt just load with default (25) pokemons
    loadPokemon(0, 25);
  } else {
    loadPokemon(0, pokeNumber);
  }
});
//new button
const newButton = document.createElement("button");
newButton.textContent = "New Pokemon";
pokeHeader.appendChild(newButton);
newButton.addEventListener("click", () => {
  const pokeName = prompt("What is the name of your new Pokemon?");
  const pokeHeight = prompt("What is the Pokemon's height?");
  const pokeWeight = prompt("What is the Pokemon's weight?");
  const pokeAbilities = prompt(
    "What are your Pokemon's abilities? (use a comma separated list)"
  );
  const pokeTypes = prompt(
    "What are your Pokemon's types? (up to 2 types separated by a space)"
  );
  const newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    makeAbilitiesArray(pokeAbilities),
    makeTypesArray(pokeTypes)
  );
  console.log(newPokemon);
  populatePokeCard(newPokemon);
});
//function for new pokemon abilities
function makeAbilitiesArray(commaString) {
  return commaString.split(",").map((abilityName) => {
    return { ability: { name: abilityName } };
  });
}
//function for new pokemon types
function makeTypesArray(spacedString) {
  return spacedString.split(" ").map((typeName) => {
    return { type: { name: typeName } };
  });
}
async function loadPokemon(offset = 0, limit = 25) {
  const data = await getAPIData(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  for (const nameAndUrl of data.results) {
    const singlePokemon = await getAPIData(nameAndUrl.url);
    const simplePokemon = {
      id: singlePokemon.id,
      height: singlePokemon.height,
      weight: singlePokemon.weight,
      name: singlePokemon.name,
      abilities: singlePokemon.abilities,
      types: singlePokemon.types,
      moves: singlePokemon.moves.slice(0, 3),
    };
    populatePokeCard(simplePokemon);
  }
}
//function to populate the pokemon card
function populatePokeCard(pokemon) {
  const pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  const pokeCard = document.createElement("div");
  pokeCard.className = "card";
  pokeCard.addEventListener("click", () =>
    pokeCard.classList.toggle("is-flipped")
  );
  pokeCard.appendChild(populateCardFront(pokemon));
  pokeCard.appendChild(populateCardBack(pokemon));
  pokeScene.appendChild(pokeCard);
  pokeGrid.appendChild(pokeScene);
}
//function for the front of the card
function populateCardFront(pokemon) {
  const pokeFront = document.createElement("figure");
  pokeFront.className = "cardFace front";
  //basing color on pokemon type
  let pokeType1 = pokemon.types[0].type.name;
  pokeFront.style.setProperty("background", getPokeTypeColor(pokeType1));
  const pokeImg = document.createElement("img");
  if (pokemon.id === 9001) {
    pokeImg.src = "../images/pokeball.png";
  } else {
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  }
  const pokeCaption = document.createElement("figcaption");
  pokeCaption.textContent = pokemon.name;
  pokeFront.appendChild(pokeImg);
  pokeFront.appendChild(pokeCaption);
  return pokeFront;
}
//function for the back of the card
function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div");
  pokeBack.className = "cardFace back";
  //if they have a second type, set the back color to that
  let pokeType1 = pokemon.types[0].type.name;
  let pokeType2 = pokemon.types[1]?.type.name;
  if (!pokeType2) {
    pokeBack.style.setProperty("background", getPokeTypeColor(pokeType1));
  } else {
    pokeBack.style.setProperty("background", getPokeTypeColor(pokeType2));
  }
  //abilities list
  const abilityLabel = document.createElement("h4");
  abilityLabel.textContent = "Abilities";
  pokeBack.appendChild(abilityLabel);
  const abilityList = document.createElement("ul");
  pokemon.abilities.forEach((abilityItem) => {
    const listItem = document.createElement("li");
    listItem.textContent = abilityItem.ability.name;
    abilityList.appendChild(listItem);
  });
  pokeBack.appendChild(abilityList);
  //type(s)list
  const typeLabel = document.createElement("h4");
  typeLabel.textContent = "Type(s)";
  pokeBack.appendChild(typeLabel);
  const typeList = document.createElement("ul");
  pokemon.types.forEach((typeItem) => {
    const listItem = document.createElement("li");
    listItem.textContent = typeItem.type.name;
    typeList.appendChild(listItem);
  });
  pokeBack.appendChild(typeList);
  //height and weight

  const heightLabel = document.createElement("h5");
  heightLabel.textContent = `Height:${pokemon.height}`;
  pokeBack.appendChild(heightLabel);

  const weightLabel = document.createElement("h5");
  weightLabel.textContent = `Weight:${pokemon.weight}`;
  pokeBack.appendChild(weightLabel);

  return pokeBack;
}
function getPokeTypeColor(pokeType) {
  //check if poketype is equal to water and then return blue background color
  let color;
  switch (pokeType) {
    case "normal":
      color = "#A8A878";
      break;
    case "fighting":
      color = "#C03028";
      break;
    case "flying":
      color = "#A890F0";
      break;
    case "poison":
      color = "#A040A0";
      break;
    case "ground":
      color = "#E0C068";
      break;
    case "rock":
      color = "#B8A038";
      break;
    case "bug":
      color = "#A8B820";
      break;
    case "ghost":
      color = "#705898";
      break;
    case "steel":
      color = "#B8B8D0";
      break;
    case "fire":
      color = "#F08030";
      break;
    case "water":
      color = "#6890F0";
      break;
    case "grass":
      color = "#78C850";
      break;
    case "electric":
      color = "#F8D030";
      break;
    case "psychic":
      color = "#F85888";
      break;
    case "ice":
      color = "#98D8D8";
      break;
    case "dragon":
      color = "#7038F8";
      break;
    case "dark":
      color = "#705848";
      break;
    case "fairy":
      color = "#EE99AC";
      break;
    case "???":
      color = "#68A090";
      break;
  }
  return color;
}
await loadPokemon(0, 25);
