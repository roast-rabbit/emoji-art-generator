const heightInput = document.querySelector("#stats input[name=height]");
const widthInput = document.querySelector("#stats input[name=width]");
const board = document.querySelector("#board");
const sideToolSet = document.querySelector("#side-tool-set");
const currentSelection = document.querySelector("#current-selection span");

let height = heightInput.value;
let width = widthInput.value;

let currentSelectedEmoji = "😍";

board.style.setProperty("--height", height);
board.style.setProperty("--width", width);

function createBoard(height, width) {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      element = document.createElement("div");
      element.textContent = "⬜️";
      element.classList.add("tile");
      board.appendChild(element);
    }
  }
}

createBoard(height, width);

const setEmojiToTarget = (e) => {
  console.log(e.target);
  e.target.textContent = currentSelectedEmoji;
};
const setCurrentEmoji = (e) => {
  currentSelectedEmoji = e.target.textContent;

  currentSelection.textContent = currentSelectedEmoji;
};
sideToolSet.addEventListener("click", setCurrentEmoji);
board.addEventListener("click", setEmojiToTarget);
board.addEventListener("mousedown", (e) => {
  e.preventDefault();
  board.addEventListener("mousemove", setEmojiToTarget);

  board.addEventListener("mouseup", () => {
    board.removeEventListener("mousemove", setEmojiToTarget);
  });
});
