const heightInput = document.querySelector("#stats input[name=height]");
const widthInput = document.querySelector("#stats input[name=width]");
let height = heightInput.value;
let width = widthInput.value;

function createBoard(height, width) {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {}
  }
}
