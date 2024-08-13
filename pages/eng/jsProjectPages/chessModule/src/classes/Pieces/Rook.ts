import { Moves, Piece, PieceType, square } from "../../types.js";
import { Board } from "../Board.js";

export class Rook extends Piece {
    type = PieceType.ROOK;
    hasMoved = false;

    getMoves(board: Board): square[] {
        const legalMoves: square[] = [];
        for (const direction of Moves.lines) {
            legalMoves.push(...board.getLine(this.coordinate, direction));
        }
        return legalMoves;
    }

    move(board: Board, square: square): void {
        super.move(board, square);
        this.hasMoved = true;
    }
}