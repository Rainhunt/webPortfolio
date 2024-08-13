import { Color, PieceType } from "../../types.js";
export class EmptySquare {
    type = PieceType.EMPTY;
    color = Color.NONE;
    highlight = false;
    coordinate;
    constructor(coordinate) {
        this.coordinate = coordinate;
    }
}
