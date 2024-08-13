import { Moves, Piece, PieceType } from "../../types.js";
import { add, isOnBoard } from "../../utils/squareHelpers.js";
export class Knight extends Piece {
    type = PieceType.KNIGHT;
    getMoves(board) {
        const legalMoves = [];
        for (const direction of Moves.knight) {
            const currentSquare = add(this.coordinate, direction);
            if (isOnBoard(currentSquare) && board.getPiece(currentSquare).color !== this.color)
                legalMoves.push(currentSquare);
        }
        return legalMoves;
    }
}
