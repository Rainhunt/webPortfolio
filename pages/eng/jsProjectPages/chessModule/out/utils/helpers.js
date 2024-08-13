import { Bishop } from "../classes/Pieces/Bishop.js";
import { Knight } from "../classes/Pieces/Knight.js";
import { Queen } from "../classes/Pieces/Queen.js";
import { Rook } from "../classes/Pieces/Rook.js";
import { Color } from "../types.js";
export function getOppositeColor(color) {
    return color === Color.WHITE ? Color.BLACK : Color.WHITE;
}
export function choosePawnPromotion(color, coordinate) {
    while (true) {
        switch (prompt("Choose a piece")?.trim().toLowerCase()) {
            case "knight":
                return new Knight(color, coordinate);
            case "bishop":
                return new Bishop(color, coordinate);
            case "rook":
                return new Rook(color, coordinate);
            case "queen":
                return new Queen(color, coordinate);
        }
    }
}
