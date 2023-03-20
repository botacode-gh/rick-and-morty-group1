export function createPagination(container) {
  const paginationElement = document.createElement("span");
  paginationElement.classList.add("navigation__pagination");
  paginationElement.setAttribute("data-js", "pagination");
  container.append(paginationElement);
}
