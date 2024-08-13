import { Moves, Piece, PieceType, square } from "../../types.js";
import { add, isOnBoard } from "../../utils/squareHelpers.js";
import { Board } from "../Board.js";

export class Knight extends Piece {
    type = PieceType.KNIGHT;

    getMoves(board: Board): square[] {
        const legalMoves: square[] = [];
        for (const direction of Moves.knight) {
            const currentSquare = add(this.coordinate, direction);
            if (isOnBoard(currentSquare) && board.getPiece(currentSquare).color !== this.color) legalMoves.push(currentSquare);
        }
        return legalMoves;
    }
}