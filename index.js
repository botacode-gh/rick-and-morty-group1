import { createCharacterCard } from "./components/card/card.js";
import { createButton } from "./components/nav-button/nav-button.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";
import { createSearchBar } from "./components/search-bar/search-bar.js";

const navigation = document.querySelector('[data-js="navigation"]');
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);

//extra: create HTML elements

createSearchBar(searchBarContainer);
createButton(navigation, "previous", "button button--prev", "button-prev");
createPagination(navigation);
createButton(navigation, "next", "button button--next", "button-next");

const searchBar = document.querySelector('[data-js="search-bar"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = "42";
let page = 1;
let searchQuery = "";
let urlAll = `https://rickandmortyapi.com/api/character/?page=${page}`;

const fetchCharacters = async () => {
  try {
    const response = await fetch(urlAll);
    const jsonData = await response.json();
    pagination.textContent = `${page} / ${maxPage}`;
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

    createCharacterCard(cardContainer, image, name, status, type, occurrences);
  });
}

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchInput = new FormData(searchBar);
  const data = Object.fromEntries(searchInput);
  searchQuery = data.query;

  urlAll = `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`;

  fetchCharacters();
});
