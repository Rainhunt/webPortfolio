import { Moves, Piece, PieceType, square } from "../../types.js";
import { Board } from "../Board.js";

export class Queen extends Piece {
    type = PieceType.QUEEN;

    getMoves(board: Board): square[] {
        const legalMoves: square[] = [];
        for (const direction of [...Moves.lines, ...Moves.diagonals]) {
            legalMoves.push(...board.getLine(this.coordinate, direction));
        }
        return legalMoves;
    }

}