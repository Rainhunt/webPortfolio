import { Bishop } from "../classes/Pieces/Bishop.js";
import { EmptySquare } from "../classes/Pieces/EmptySquare.js";
import { King } from "../classes/Pieces/King.js";
import { Knight } from "../classes/Pieces/Knight.js";
import { Pawn } from "../classes/Pieces/Pawn.js";
import { Queen } from "../classes/Pieces/Queen.js";
import { Rook } from "../classes/Pieces/Rook.js";
import { Color } from "../types.js";
export const board = [];
for (let col = 0; col < 8; col++) {
    const boardRow = [];
    for (let row = 0; row < 8; row++) {
        const square = [col, row];
        switch (`${col}, ${row}`) {
            //white pawns
            case "0, 1":
            case "1, 1":
            case "2, 1":
            case "3, 1":
            case "4, 1":
            case "5, 1":
            case "6, 1":
            case "7, 1":
                boardRow.push(new Pawn(Color.WHITE, square));
                break;
            //black pawns
            case "0, 6":
            case "1, 6":
            case "2, 6":
            case "3, 6":
            case "4, 6":
            case "5, 6":
            case "6, 6":
            case "7, 6":
                boardRow.push(new Pawn(Color.BLACK, square));
                break;
            case "0, 0":
            case "7, 0":
                boardRow.push(new Rook(Color.WHITE, square));
                break;
            case "0, 7":
            case "7, 7":
                boardRow.push(new Rook(Color.BLACK, square));
                break;
            case "1, 0":
            case "6, 0":
                boardRow.push(new Knight(Color.WHITE, square));
                break;
            case "1, 7":
            case "6, 7":
                boardRow.push(new Knight(Color.BLACK, square));
                break;
            case "2, 0":
            case "5, 0":
                boardRow.push(new Bishop(Color.WHITE, square));
                break;
            case "2, 7":
            case "5, 7":
                boardRow.push(new Bishop(Color.BLACK, square));
                break;
            case "4, 0":
                boardRow.push(new Queen(Color.WHITE, square));
                break;
            case "4, 7":
                boardRow.push(new Queen(Color.BLACK, square));
                break;
            case "3, 0":
                boardRow.push(new King(Color.WHITE, square));
                break;
            case "3, 7":
                boardRow.push(new King(Color.BLACK, square));
                break;
            default:
                boardRow.push(new EmptySquare(square));
        }
    }
    board.push(boardRow);
}
