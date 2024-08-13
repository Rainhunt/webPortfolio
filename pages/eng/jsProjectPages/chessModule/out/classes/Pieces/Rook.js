import { Moves, Piece, PieceType } from "../../types.js";
export class Rook extends Piece {
    type = PieceType.ROOK;
    hasMoved = false;
    getMoves(board) {
        const legalMoves = [];
        for (const direction of Moves.lines) {
            legalMoves.push(...board.getLine(this.coordinate, direction));
        }
        return legalMoves;
    }
    move(board, square) {
        super.move(board, square);
        this.hasMoved = true;
    }
}
