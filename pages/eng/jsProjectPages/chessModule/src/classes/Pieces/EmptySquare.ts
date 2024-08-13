import { Color, IPiece, PieceType, square } from "../../types.js";

export class EmptySquare implements IPiece {
    type = PieceType.EMPTY;
    color = Color.NONE;
    highlight = false;
    coordinate: square;

    constructor(coordinate: square) {
        this.coordinate = coordinate;
    }
}