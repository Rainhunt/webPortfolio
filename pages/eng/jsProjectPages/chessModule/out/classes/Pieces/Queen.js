import { Moves, Piece, PieceType } from "../../types.js";
export class Queen extends Piece {
    type = PieceType.QUEEN;
    getMoves(board) {
        const legalMoves = [];
        for (const direction of [...Moves.lines, ...Moves.diagonals]) {
            legalMoves.push(...board.getLine(this.coordinate, direction));
        }
        return legalMoves;
    }
}
