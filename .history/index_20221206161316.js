const heightInput = document.querySelector("#stats input[name=height]");
const widthInput = document.querySelector("#stats input[name=width]");
const board = document.querySelector("#board");

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

board.addEventListener("mousedown", (e) => {
  e.preventDefault();
  board.addEventListener("mousemove", (e) => {
    console.log(e.target);
    e.target.textContent = currentSelectedEmoji;
  });
});
