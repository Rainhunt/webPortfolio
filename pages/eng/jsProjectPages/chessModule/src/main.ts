import { Board } from "./classes/Board.js";
import { Piece } from "./types.js";

const boardContainer = document.querySelector("#container");
const board = new Board(boardContainer as HTMLDivElement);