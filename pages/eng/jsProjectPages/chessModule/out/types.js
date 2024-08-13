import { EmptySquare } from "./classes/Pieces/EmptySquare.js";
export class Moves {
    static UP = [0, 1];
    static RIGHT = [1, 0];
    static DOWN = [0, -1];
    static LEFT = [-1, 0];
    static UL = [-1, 1];
    static UR = [1, 1];
    static DL = [-1, -1];
    static DR = [1, -1];
    static KUL = [-1, 2];
    static KUR = [1, 2];
    static KRU = [2, 1];
    static KRD = [2, -1];
    static KDL = [-1, -2];
    static KDR = [1, -2];
    static KLU = [-2, 1];
    static KLD = [-2, -1];
    static UP2 = [0, 2];
    static DOWN2 = [0, -2];
    static lines = [this.UP, this.RIGHT, this.DOWN, this.LEFT];
    static diagonals = [this.UL, this.UR, this.DL, this.DR];
    static knight = [this.KUL, this.KUR, this.KRU, this.KRD, this.KDL, this.KDR, this.KLU, this.KLD];
}
export var Columns;
(function (Columns) {
    Columns[Columns["H"] = 0] = "H";
    Columns[Columns["G"] = 1] = "G";
    Columns[Columns["F"] = 2] = "F";
    Columns[Columns["E"] = 3] = "E";
    Columns[Columns["D"] = 4] = "D";
    Columns[Columns["C"] = 5] = "C";
    Columns[Columns["B"] = 6] = "B";
    Columns[Columns["A"] = 7] = "A";
})(Columns || (Columns = {}));
export var Color;
(function (Color) {
    Color["NONE"] = "none";
    Color["WHITE"] = "white";
    Color["BLACK"] = "black";
})(Color || (Color = {}));
export var PieceType;
(function (PieceType) {
    PieceType["EMPTY"] = "";
    PieceType["PAWN"] = "P";
    PieceType["ROOK"] = "R";
    PieceType["KNIGHT"] = "N";
    PieceType["BISHOP"] = "B";
    PieceType["QUEEN"] = "Q";
    PieceType["KING"] = "K";
})(PieceType || (PieceType = {}));
export class Piece {
    color;
    highlight = false;
    coordinate;
    constructor(color, square) {
        this.color = color;
        this.coordinate = square;
    }
    move(board, square) {
        board.setPiece(square, this);
        board.setPiece(this.coordinate, new EmptySquare(this.coordinate));
        this.coordinate = square;
    }
    getOppositeColor() {
        return this.color === Color.WHITE ? Color.BLACK : Color.WHITE;
    }
}
export class Attacks {
    attackVectors = [];
    add(attacks) {
        this.attackVectors = [...this.attackVectors, ...attacks.attackVectors];
        return this;
    }
}
