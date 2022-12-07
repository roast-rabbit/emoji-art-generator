import { createPicker } from "https://unpkg.com/picmo@latest/dist/index.js";
const body = document.querySelector("body");
const heightInput = document.querySelector("#stats input[name=height]");
const widthInput = document.querySelector("#stats input[name=width]");
const board = document.querySelector("#board");

const currentSelection = document.querySelector("#current-selection span");

const resizeBtn = document.querySelector("#resize");

// The picker must have a root element to insert itself into
const sideToolSet = document.querySelector("#side-tool-set");

// Create the picker
const picker = createPicker({ rootElement: sideToolSet });

let height = heightInput.value;
let width = widthInput.value;

let currentSelectedEmoji = "😍";

function createBoard(height, width) {
  board.innerHTML = "";
  board.style.setProperty("--height", height);
  board.style.setProperty("--width", width);
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const element = document.createElement("div");
      element.textContent = "⬜️";
      element.classList.add("tile");
      board.appendChild(element);
    }
  }
}

createBoard(height, width);

const setEmojiToTarget = (e) => {
  console.log(e.target);
  e.target.closest(".tile").textContent = currentSelectedEmoji;
};

const openEmojiPicker = function () {
  sideToolSet.classList.add("shown");
};
const closeEmojiPicker = function () {
  sideToolSet.classList.remove("shown");
};

const setCurrentEmoji = (emoji) => {
  if (typeof emoji !== "string") return;
  closeEmojiPicker();
  currentSelectedEmoji = emoji;

  currentSelection.textContent = currentSelectedEmoji;
};

sideToolSet.addEventListener("click", setCurrentEmoji);
board.addEventListener("click", setEmojiToTarget);
board.addEventListener("mousedown", (e) => {
  e.preventDefault();
  board.addEventListener("mousemove", setEmojiToTarget);

  document.addEventListener("mouseup", () => {
    board.removeEventListener("mousemove", setEmojiToTarget);
  });
});

resizeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  height = heightInput.value;
  width = widthInput.value;
  createBoard(height, width);
});

currentSelection.addEventListener("click", () => {
  openEmojiPicker();
});

// The picker emits an event when an emoji is selected. Do with it as you will!
picker.addEventListener("emoji:select", (event) => {
  setCurrentEmoji(event.emoji);
});

body.addEventListener("click", (e) => {
  console.log(e.target.closest("#current-selection"));
  if (
    e.target.closest("#side-tool-set") === sideToolSet ||
    e.target.closest("#current-selection span") === currentSelection
  ) {
    return;
  }
  closeEmojiPicker();
});
