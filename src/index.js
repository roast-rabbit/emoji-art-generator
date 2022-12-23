import { createPicker } from "picmo";
import "./style.css";
const emojiDataPath = `emojibase-data/${navigator.language}/data.json`;
const messagesPath = `emojibase-data/${navigator.language}/messages.json`;
import html2canvas from "html2canvas";

let emojiData;
let messages;

const loadModule = async function () {
  emojiData = await import("emojibase-data/en/data.json");
  messages = await import("emojibase-data/en/messages.json");
};

loadModule();

const body = document.querySelector("body");
const heightInput = document.querySelector("#stats input[name=height]");
const widthInput = document.querySelector("#stats input[name=width]");
const board = document.querySelector("#board");

const currentSelection = document.querySelector("#current-selection span");

const resizeBtn = document.querySelector("#resize");

const copyBtn = document.querySelector("#copy");
const toPicBtn = document.querySelector("#to-picture");

// The picker must have a root element to insert itself into
const sideToolSet = document.querySelector("#side-tool-set");

// Select social icons
const fb = document.querySelector(".facebook");
const twitter = document.querySelector(".twitter");
const linkedIn = document.querySelector(".linkedin");
const reddit = document.querySelector(".reddit");

let msg = encodeURIComponent(`I created an emoji art\n${currentText}`);

const title = encodeURIComponent(document.querySelector("title").textContent);

fb.href = `https://www.facebook.com/share.php?u=${link}`;

linkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${link}`;

reddit.href = `http://www.reddit.com/submit?url=${link}&title=${title}`;

// Create the picker
const picker = createPicker({
  rootElement: sideToolSet,
  emojiData,
  messages,
  i18n: navigator.language,
});

let height = heightInput.value;
let width = widthInput.value;

let currentSelectedEmoji = "😍";

// Current emoji art text
let currentText = "";

function setCurrentText() {
  currentText = "";
  const tiles = document.querySelectorAll(".tile");
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      currentText += tiles[i * height + j].textContent;
    }
    currentText += "\n";
  }
}

function createBoard(height, width) {
  board.innerHTML = "";
  board.style.setProperty("--height", height);
  board.style.setProperty("--width", width);
  board.style.setProperty("--size", `${90 / width}vmin`);
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
  e.preventDefault();
  if (e.touches) {
    document
      .elementFromPoint(e.touches[0].pageX, e.touches[0].pageY)
      .closest(".tile").textContent = currentSelectedEmoji;
  }
  e.target.closest(".tile").textContent = currentSelectedEmoji;
  setCurrentText();
  msg = encodeURIComponent(`I created an emoji art\n${currentText}`);
  twitter.href = `http://twitter.com/share?&url=${link}&text=${msg}&hashtags=emoji,emojiart`;
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

board.addEventListener("touchstart", (e) => {
  e.preventDefault();
  board.addEventListener("touchmove", setEmojiToTarget);
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
  if (
    e.target.closest("#side-tool-set") === sideToolSet ||
    e.target.closest("#current-selection span") === currentSelection
  ) {
    return;
  }
  closeEmojiPicker();
});

async function copyText(e) {
  e.preventDefault();
  const { clipboard } = navigator;
  // console.log("copy!");

  await clipboard.writeText(currentText);
  // console.log(text);
}
copyBtn.addEventListener("click", copyText);

function getScreenShot(e) {
  e.preventDefault();
  document.querySelector(".picture")?.remove();
  let c = document.querySelector("#board"); // or document.getElementById('canvas');
  html2canvas(c).then((canvas) => {
    // canvas.classList.add("picture");
    // document.body.appendChild(canvas);
    const dataUrl = canvas
      .toDataURL()
      .replace("image/png", "image/octet-stream");
    window.location.href = dataUrl;
    // const meta = document.createElement("meta");
    // meta.name = "twitter:image";
    // meta.content = dataUrl;
    // document.querySelector("head").appendChild(meta);
  });
}
toPicBtn.addEventListener("click", getScreenShot);

const link = encodeURI(window.location.href);
function getCurrentEmojiArtText() {
  let text = "";
  const tiles = document.querySelectorAll(".tile");
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      text += tiles[i * height + j].textContent;
    }
    text += "\n";
  }
  return text;
}
