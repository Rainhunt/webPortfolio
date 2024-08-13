import { Color, Moves, Piece, PieceType } from "../../types.js";
import { choosePawnPromotion } from "../../utils/helpers.js";
import { add, evaluateSquares, isOnBoard } from "../../utils/squareHelpers.js";
import { EmptySquare } from "./EmptySquare.js";
export class Pawn extends Piece {
    type = PieceType.PAWN;
    constructor(color, square) {
        super(color, square);
    }
    getMoves(board) {
        const legalMoves = [];
        let direction;
        //Pawns move in one direction, determined by color
        let startRow;
        if (this.color === Color.WHITE) {
            direction = Moves.UP;
            startRow = 1;
        }
        else {
            direction = Moves.DOWN;
            startRow = 6;
        }
        const step = add(this.coordinate, direction);
        if (isOnBoard(step) && board.isEmpty(step)) {
            legalMoves.push(step);
            const step2 = add(step, direction);
            if (this.coordinate[1] === startRow && isOnBoard(step2) && board.isEmpty(step2)) {
                legalMoves.push(step2);
            }
        }
        //allow enpassant
        const right = add(step, Moves.RIGHT);
        const left = add(step, Moves.LEFT);
        if (isOnBoard(right) && board.getPiece(right).color === this.getOppositeColor() || (board.enpassantSquare && evaluateSquares(right, board.enpassantSquare))) {
            legalMoves.push(right);
        }
        if (isOnBoard(left) && board.getPiece(left).color === this.getOppositeColor() || (board.enpassantSquare && evaluateSquares(left, board.enpassantSquare))) {
            legalMoves.push(left);
        }
        return legalMoves;
    }
    move(board, square) {
        //adds en passant to the legal moves for pawns for one turn
        if (this.coordinate[1] === 1 && square[1] === 3)
            board.enpassantSquare = add(this.coordinate, Moves.UP);
        if (this.coordinate[1] === 6 && square[1] === 4)
            board.enpassantSquare = add(this.coordinate, Moves.DOWN);
        //on en passant remove the pawn (moving a step will remove the previous location of the pawn, which should be empty anyways)
        if (board.isEmpty(square)) {
            const removePiece = this.color === Color.WHITE ? add(square, Moves.DOWN) : add(square, Moves.UP);
            board.setPiece(removePiece, new EmptySquare(removePiece));
        }
        super.move(board, square);
        if (square[1] === 0 || square[1] === 7) {
            board.render();
            board.setPiece(square, choosePawnPromotion(this.color, square));
        }
    }
}
