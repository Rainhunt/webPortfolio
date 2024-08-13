import { Board } from "./classes/Board.js";
import { EmptySquare } from "./classes/Pieces/EmptySquare.js";

export type square = [number, number];
export type direction = [number, number];

export class Moves {
    static readonly UP: direction = [0, 1];
    static readonly RIGHT: direction = [1, 0];
    static readonly DOWN: direction = [0, -1];
    static readonly LEFT: direction = [-1, 0];
    static readonly UL: direction = [-1, 1];
    static readonly UR: direction = [1, 1];
    static readonly DL: direction = [-1, -1];
    static readonly DR: direction = [1, -1];
    static readonly KUL: direction = [-1, 2];
    static readonly KUR: direction = [1, 2];
    static readonly KRU: direction = [2, 1];
    static readonly KRD: direction = [2, -1];
    static readonly KDL: direction = [-1, -2];
    static readonly KDR: direction = [1, -2];
    static readonly KLU: direction = [-2, 1];
    static readonly KLD: direction = [-2, -1];
    static readonly UP2: direction = [0, 2];
    static readonly DOWN2: direction = [0, -2];
    static readonly lines: direction[] = [this.UP, this.RIGHT, this.DOWN, this.LEFT]
    static readonly diagonals: direction[] = [this.UL, this.UR, this.DL, this.DR];
    static readonly knight: direction[] = [this.KUL, this.KUR, this.KRU, this.KRD, this.KDL, this.KDR, this.KLU, this.KLD];
}

export enum Columns {
    "H",
    "G",
    "F",
    "E",
    "D",
    "C",
    "B",
    "A"
}

export enum Color {
    "NONE" = "none",
    "WHITE" = "white",
    "BLACK" = "black"
}

export enum PieceType {
    "EMPTY" = "",
    "PAWN" = "P",
    "ROOK" = "R",
    "KNIGHT" = "N",
    "BISHOP" = "B",
    "QUEEN" = "Q",
    "KING" = "K"
}

export interface IPiece {
    type: PieceType;
    color: Color;
    highlight: boolean;
    coordinate: square;
}

export abstract class Piece implements IPiece {
    abstract type: PieceType;
    color: Color;
    highlight = false;
    coordinate: square;

    constructor(color: Color, square: square) {
        this.color = color;
        this.coordinate = square;
    }

    abstract getMoves(board: Board): square[];

    move(board: Board, square: square): void {
        board.setPiece(square, this)
        board.setPiece(this.coordinate, new EmptySquare(this.coordinate));
        this.coordinate = square;
    }

    getOppositeColor(): Color {
        return this.color === Color.WHITE ? Color.BLACK : Color.WHITE;
    }
}

export class Attacks {
    attackVectors: square[][] = [];

    add(attacks: Attacks): Attacks {
        this.attackVectors = [...this.attackVectors, ...attacks.attackVectors];
        return this;
    }
}