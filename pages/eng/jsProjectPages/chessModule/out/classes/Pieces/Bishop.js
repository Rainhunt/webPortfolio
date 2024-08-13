import { Moves, Piece, PieceType } from "../../types.js";
export class Bishop extends Piece {
    type = PieceType.BISHOP;
    getMoves(board) {
        const legalMoves = [];
        for (const direction of Moves.diagonals) {
            legalMoves.push(...board.getLine(this.coordinate, direction));
        }
        return legalMoves;
    }
}
