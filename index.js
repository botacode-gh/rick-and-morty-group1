import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

const cardsUrl =
  "https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20";

const fetchCharacters = async () => {
  try {
    const response = await fetch(cardsUrl);
    const jsonData = await response.json();
    return jsonData;
  } catch {
    console.log("Something went wrong");
  }
};
fetchCharacters();

console.log("fetchCharacters", fetchCharacters());
console.log("fetchCharacters", typeof fetchCharacters());

// jsonData.forEach((character) => {
//   const image = character.image;
//   console.log(character.image);
//   const name = character.name;
//   console.log(character.name);
//   const status = character.status;
//   console.log(character.status);
//   const type = character.type;
//   console.log(character.type);
//   const occurrences = character.occurrences;
//   console.log(character.occurrences);

//   const characterData = [];
//   characterData.push(image, name, status, type, occurrences);

//   characters.push(characterData);
// });
