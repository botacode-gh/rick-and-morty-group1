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
let maxPage = 42;
let page = 1;
let searchQuery = "";
let urlAll = `https://rickandmortyapi.com/api/character/?page=${page}`;
pagination.textContent = `${page} / ${maxPage}`;

const fetchCharacters = async () => {
  try {
    const response = await fetch(urlAll);
    const jsonData = await response.json();
    const results = await jsonData.results;

    createCharacterCards(results);
  } catch {
    console.log("Something went wrong");
  }
};

nextButton.addEventListener("click", () => {
  if (page >= maxPage) {
    return;
  }
  page++;
  urlAll = `https://rickandmortyapi.com/api/character/?page=${page}`;
  fetchCharacters();
  pagination.textContent = `${page} / ${maxPage}`;
});

prevButton.addEventListener("click", () => {
  if (page <= 1) {
    return;
  }
  page--;
  urlAll = `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`;
  fetchCharacters();
  pagination.textContent = `${page} / ${maxPage}`;
});

fetchCharacters();

function createCharacterCards(results) {
  cardContainer.innerHTML = "";
  results.forEach((character) => {
    const image = character.image;
    const name = character.name;
    const status = character.status;
    const type = character.type;
    const occurrences = character.episode.length;

    createCharacterCard(image, name, status, type, occurrences);
  });
}

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchInput = new FormData(searchBar);
  const data = Object.fromEntries(searchInput);
  searchQuery = data.query;

  urlAll = `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`;

  fetchCharacters();
  console.log("data:", data);
  console.log("urlAll:", urlAll);
});

console.log("searchQuery:", searchQuery);
// CJ's forbidden code

// async function fetchCharacters() {
//   const response = await fetch(urlAll);
//   const jsonData = await response.json();
//   const results = jsonData.results;

//   cardContainer.innerHTML = "";
//   results.map(createCharacterCard).forEach((card) => cardContainer.append(card));
// }

// const fetchCharacters = async () => {
//   try {
//     const response = await fetch(urlAll);
//     const jsonData = await response.json();
//     const results = await jsonData.results;

//     createCharacterCards(results);
//   } catch {
//     console.log("Something went wrong");
//   }
// };
