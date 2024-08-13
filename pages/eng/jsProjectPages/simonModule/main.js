import { Board } from "./Board.js";
import { getRandomColor, SleepManager } from "./helpers.js";

const speed = 600;
let colorsArray = [];
let currentIndex = 0;

const board = new Board(document.querySelector("#board"), speed);
const boardWidth = board.element.width;
const boardHeight = board.element.height;
board.element.addEventListener("click", (e) => {
    if (board.isFree) {
        const boardClientWidth = board.element.getBoundingClientRect().width;
        const boardClientheight = board.element.getBoundingClientRect().height;
        const widthRatio = boardWidth / boardClientWidth;
        const heightRatio = boardHeight / boardClientheight;
        const colorClicked = board.getClicked(e.offsetX * widthRatio, e.offsetY * heightRatio);
        if (board.isPlaying) {
            if (!colorClicked || colorClicked === "gap" || colorClicked === "center") {
                //do nothing
            } else if (colorsArray[currentIndex] === colorClicked) {
                board.playColor(colorClicked);
                if (colorsArray.length === ++currentIndex) {
                    playNextLevel();
                }
            } else {
                gameOver();
            }
        } else if (colorClicked === "center") {
            board.isPlaying = true;
            playNextLevel();
        }
    }
});

async function playNextLevel() {
    board.isFree = false;
    await SleepManager.sleep(500);
    board.render();
    await SleepManager.sleep(board.speed);
    currentIndex = 0;
    colorsArray.push(getRandomColor());
    board.playColorPattern(colorsArray);
}

async function gameOver() {
    board.isPlaying = false;
    board.centerText = "You got"
    board.centerText2 = colorsArray.length - 1;
    board.drawText();
    console.log(colorsArray.length - 1);
    colorsArray = [];
    await SleepManager.sleep(board.speed);
    board.centerText = "Try";
    board.centerText2 = "Again?";
    board.render();
    board.drawText();
}