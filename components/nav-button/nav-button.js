export function createButton(container, text, classes, dataJsValue) {
  container.innerHTML += `
    <button class="${classes}" data-js="${dataJsValue}">
      ${text}
    </button>
    `;
}
