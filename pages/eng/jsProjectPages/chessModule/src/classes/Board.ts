import { Attacks, Color, direction, IPiece, Moves, Piece, PieceType, square } from "../types.js";
import { board } from "../utils/defaultBoardState.js";
import { getOppositeColor } from "../utils/helpers.js";
import { add, coordsToNotation, evaluateSquares, intersectionOfSquares, isOnBoard } from "../utils/squareHelpers.js";
import { King } from "./Pieces/King.js";

export class Board {
    container: HTMLDivElement;
    board: IPiece[][] = board;
    currentTurn: Color = Color.WHITE;
    selectedSquare: false | square = false;
    legalMoves: square[] = [];
    enpassantSquare: false | square = false;
    whiteKing: square = [3, 0];
    blackKing: square = [3, 7];

    constructor(element: HTMLDivElement) {
        this.container = element;
        this.render(this.currentTurn === Color.WHITE);
    }

    getPiece(square: square): IPiece {
        return this.board[square[0]][square[1]];
    }

    setPiece(square: square, piece: IPiece): void {
        this.board[square[0]][square[1]] = piece;
    }

    isEmpty(square: square): boolean {
        return this.getPiece(square).type === PieceType.EMPTY;
    }

    isLegalMove(square: square): boolean {
        return this.legalMoves.findIndex((move) => evaluateSquares(move, square)) !== -1;
    }

    //straight line from a square in a direction. Stops on edge of board, after adding a nonempty piece, or before adding the exclude color. A square can be specified that won't stop the line (useful for getting pins and attacks through a king)
    getLine(coordinate: square, direction: direction, passThrough = coordinate, excludeColor = this.getPiece(coordinate).color): square[] {
        const squares: square[] = [];
        let currentSquare = add(coordinate, direction);
        while (isOnBoard(currentSquare) && (this.getPiece(currentSquare).color !== excludeColor || evaluateSquares(currentSquare, passThrough))) {
            squares.push(currentSquare);
            if (!this.isEmpty(currentSquare) && !evaluateSquares(currentSquare, passThrough)) break;
            currentSquare = add(currentSquare, direction);
        }
        return squares;
    }

    //attacks that require the getLine method
    getLinearAttacks(coordinate: square, attackingColor: Color, passThrough = coordinate): Attacks {
        const attacks = new Attacks()
        const attackedColor = getOppositeColor(attackingColor);
        for (let i = 0; i < 2; i++) {
            const moves = i === 0 ? Moves.lines : Moves.diagonals;
            const piece = i === 0 ? PieceType.ROOK : PieceType.BISHOP;
            for (const direction of moves) {
                const currentLine = this.getLine(coordinate, direction, passThrough, attackedColor);
                const currentSquare = currentLine.at(-1);
                if (currentSquare) {
                    const currentPiece = this.getPiece(currentSquare);
                    if (currentPiece.color === attackingColor && (currentPiece.type === piece || currentPiece.type === PieceType.QUEEN)) {
                        attacks.attackVectors.push(currentLine);
                    }
                }
            }
        }
        return attacks;
    }

    //all attacks on a square
    getAttacks(coordinate: square, attackingColor: Color, passThrough = coordinate): Attacks {
        const attacks = this.getLinearAttacks(coordinate, attackingColor, passThrough);
        for (const direction of Moves.knight) {
            const currentSquare = add(coordinate, direction);
            if (isOnBoard(currentSquare)) {
                const currentPiece = this.getPiece(currentSquare);
                if (currentPiece.color === attackingColor && (currentPiece.type === PieceType.KNIGHT || currentPiece.type === PieceType.KING)) {
                    attacks.attackVectors.push([currentSquare]);
                }
            }
        }
        for (const direction of Moves.diagonals) {
            const currentSquare = add(coordinate, direction);
            if (isOnBoard(currentSquare)) {
                const currentPiece = this.getPiece(currentSquare);
                if (currentPiece.color === attackingColor && ((currentPiece.type === PieceType.PAWN && ((direction[1] < 0 && currentPiece.color === Color.WHITE) || (direction[1] > 0 && currentPiece.color === Color.BLACK))) || currentPiece.type === PieceType.KING)) {
                    attacks.attackVectors.push([currentSquare]);
                }
            }
        }
        return attacks;
    }

    getCurrentKing(): square {
        return this.currentTurn === Color.WHITE ? this.whiteKing : this.blackKing;
    }

    getPins(coordinate: square): false | square[] {
        const king = this.getCurrentKing();
        const attackingColor = getOppositeColor(this.currentTurn);
        const attacks = this.getLinearAttacks(king, attackingColor, coordinate);
        if (attacks.attackVectors.length === 1) {
            return attacks.attackVectors[0];
        } else if (attacks.attackVectors.length > 1) {
            return [];
        } else {
            return false;
        }
    }

    getChecks(color: Color): false | square[] {
        const king = this.getCurrentKing();
        const oppositeColor = getOppositeColor(color);
        const attacks = this.getAttacks(king, oppositeColor, king);
        if (attacks.attackVectors.length === 1) {
            return attacks.attackVectors[0];
        } else if (attacks.attackVectors.length > 1) {
            return [];
        } else {
            return false;
        }
    }

    //return an array of squares a piece could move to without ending with that color in check
    getLegalMoves(coordinate: square, color: Color): false | square[] {
        const checks = this.getChecks(color);
        const pins = this.getPins(coordinate);
        if (checks && pins) {
            return intersectionOfSquares(pins, checks);
        } else {
            return checks ? checks : pins;
        }
    }

    getCheckMate(): boolean {
        const king = this.getPiece(this.getCurrentKing()) as King;
        if (this.getChecks(this.currentTurn) && king.getMoves(this).length === 0) {
            let currentTurnHasMoves = false;
            for (const column of board) {
                for (const piece of column) {
                    if (piece.color === this.currentTurn) {
                        const nonEmptyPiece = piece as Piece;
                        const checksAndPins = this.getLegalMoves(nonEmptyPiece.coordinate, nonEmptyPiece.color);
                        if (checksAndPins) {
                            if (intersectionOfSquares(nonEmptyPiece.getMoves(this), checksAndPins).length > 0) {
                                currentTurnHasMoves = true;
                            }
                        } else {
                            if (nonEmptyPiece.getMoves(this).length > 0) {
                                currentTurnHasMoves = true;
                            }
                        }
                    }
                }
            }
            return !currentTurnHasMoves;
        } else {
            return false;
        }
    }

    highlightSquares(highlight: boolean, squares: square[]): void {
        for (const square of squares) {
            this.getPiece(square).highlight = highlight;
        }
    }

    selectSquare(square: square): void {
        if (this.selectedSquare) {
            if (this.isLegalMove(square)) {
                const piece = this.getPiece(this.selectedSquare) as Piece;
                this.enpassantSquare = false;
                console.log(`${coordsToNotation(piece.coordinate)} to ${coordsToNotation(square)}`);
                piece.move(this, square);
                this.currentTurn = getOppositeColor(this.currentTurn);
                if (this.getCheckMate()) {
                    alert("checkmate");
                }
            }
            this.highlightSquares(false, [...this.legalMoves, this.selectedSquare]);
            this.selectedSquare = false;
            this.legalMoves = [];
        } else {
            const pieceInSquare = this.getPiece(square);
            if (pieceInSquare.color === this.currentTurn) {
                const nonEmptyPiece = pieceInSquare as Piece;
                const moves = nonEmptyPiece.getMoves(this);
                const checks = this.getLegalMoves(square, this.currentTurn);
                if (checks && nonEmptyPiece.type !== PieceType.KING) {
                    this.legalMoves = intersectionOfSquares(moves, checks);
                } else {
                    this.legalMoves = moves;
                }
                this.selectedSquare = square;
                this.highlightSquares(true, [...this.legalMoves, square]);
            }
        }
    }

    render(reverse = false): void {
        const table = document.createElement("table");
        for (let row = reverse ? 7 : 0; reverse ? row >= 0 : row < 8; reverse ? row-- : row++) {
            const trow = document.createElement("tr");
            for (let col = reverse ? 7 : 0; reverse ? col >= 0 : col < 8; reverse ? col-- : col++) {
                const tcell = document.createElement("td");
                const pieceInSquare = this.getPiece([col, row]);
                tcell.classList.add((col + row) % 2 ? "dark" : "light");
                tcell.classList.add(pieceInSquare.highlight ? "filled" : "empty");
                tcell.classList.add(pieceInSquare.color === Color.WHITE ? "white" : "black");
                tcell.innerText = pieceInSquare.type;
                tcell.addEventListener("click", () => {
                    this.selectSquare(pieceInSquare.coordinate);
                    this.render(this.currentTurn === Color.WHITE);
                });
                trow.appendChild(tcell);
            }
            table.appendChild(trow);
        }
        this.container.replaceChildren(table);
    }
}