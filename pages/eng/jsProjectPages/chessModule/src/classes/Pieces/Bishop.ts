import { Moves, Piece, PieceType, square } from "../../types.js";
import { Board } from "../Board.js";

export class Bishop extends Piece {
    type = PieceType.BISHOP;

    getMoves(board: Board): square[] {
        const legalMoves: square[] = [];
        for (const direction of Moves.diagonals) {
            legalMoves.push(...board.getLine(this.coordinate, direction));
        }
        return legalMoves;
    }
}