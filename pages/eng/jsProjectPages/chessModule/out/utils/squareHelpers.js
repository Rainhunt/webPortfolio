import { Columns } from "../types.js";
export function add(square, direction) {
    return [square[0] + direction[0], square[1] + direction[1]];
}
export function evaluateSquares(square1, square2) {
    return square1[0] === square2[0] && square1[1] === square2[1];
}
export function isOnBoard(square) {
    return square.every((value) => 0 <= value && value <= 7);
}
export function intersectionOfSquares(squares1, square2) {
    return squares1.filter((square) => square2.find((checkSquare) => evaluateSquares(square, checkSquare)));
}
export function coordsToNotation(square) {
    return `${Columns[square[0]]}${square[1] + 1}`;
}
