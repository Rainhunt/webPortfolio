import { Columns, direction, IPiece, square } from "../types.js";

export function add(square: square, direction: direction): square {
    return [square[0] + direction[0], square[1] + direction[1]];
}

export function evaluateSquares(square1: square, square2: square): boolean {
    return square1[0] === square2[0] && square1[1] === square2[1];
}

export function isOnBoard(square: square): boolean {
    return square.every((value) => 0 <= value && value <= 7);
}

export function intersectionOfSquares(squares1: square[], square2: square[]) {
    return squares1.filter((square) => square2.find((checkSquare) => evaluateSquares(square, checkSquare)));
}

export function coordsToNotation(square: square): string {
    return `${Columns[square[0]]}${square[1] + 1}`;
}