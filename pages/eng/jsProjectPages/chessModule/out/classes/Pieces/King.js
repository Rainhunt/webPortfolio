import { Color, Moves, Piece, PieceType } from "../../types.js";
import { add, isOnBoard } from "../../utils/squareHelpers.js";
export class King extends Piece {
    type = PieceType.KING;
    hasMoved = false;
    getMoves(board) {
        const legalMoves = [];
        for (const direction of [...Moves.lines, ...Moves.diagonals]) {
            const currentSquare = add(this.coordinate, direction);
            if (isOnBoard(currentSquare) && board.getPiece(currentSquare).color !== this.color && board.getAttacks(currentSquare, this.getOppositeColor(), this.coordinate).attackVectors.length === 0) {
                legalMoves.push(currentSquare);
            }
        }
        //castling
        if (!this.hasMoved) {
            const row = this.color === Color.WHITE ? 0 : 7;
            const aRook = board.getPiece([0, row]);
            const hRook = board.getPiece([7, row]);
            if (aRook.type === PieceType.ROOK && !aRook.hasMoved) {
                const b = [1, row];
                const c = [2, row];
                if (board.isEmpty(b) && board.getAttacks(b, this.getOppositeColor()).attackVectors.length === 0 &&
                    board.isEmpty(c) && board.getAttacks(c, this.getOppositeColor()).attackVectors.length === 0) {
                    legalMoves.push(b);
                }
            }
            if (hRook.type === PieceType.ROOK && !hRook.hasMoved) {
                const e = [4, row];
                const f = [5, row];
                const g = [6, row];
                if (board.isEmpty(e) && board.getAttacks(e, this.getOppositeColor()).attackVectors.length === 0 &&
                    board.isEmpty(f) && board.getAttacks(f, this.getOppositeColor()).attackVectors.length === 0) {
                    legalMoves.push(f, g);
                }
            }
        }
        return legalMoves;
    }
    move(board, square) {
        if (!this.hasMoved && square[0] === 1) {
            const row = this.coordinate[1];
            const aRook = board.getPiece([0, row]);
            aRook.move(board, [2, row]);
            super.move(board, [1, row]);
        }
        else if (!this.hasMoved && (square[0] === 5 || square[0] === 6)) {
            const row = this.coordinate[1];
            const hRook = board.getPiece([7, row]);
            hRook.move(board, [4, row]);
            super.move(board, [5, row]);
        }
        else {
            super.move(board, square);
        }
        this.hasMoved = true;
        if (this.color === Color.WHITE) {
            board.whiteKing = this.coordinate;
        }
        else {
            board.blackKing = this.coordinate;
        }
    }
}
