export type Position = number;
export type Board = boolean[];
export type Move = [Position, Position, Position]; // [from, over, to]

import { Board } from './Board';

// Constants
export const BOARD_SIZE = 15;
export const DEFAULT_EMPTY_POSITION = 0; // Top position

// Position data for visual rendering
export interface PegPosition {
  top: number;
  left: number;
}

// Information about each peg for rendering
export interface PegInfo {
  hasPeg: boolean;
  position: PegPosition;
  isSelected: boolean;
  isValidTarget: boolean;
}

export interface GameState {
  selectedPeg: Position | null;
  message: string;
  isGameOver: boolean;
  countPegs: number;
  pegs: PegInfo[];
  validMoveTargets: Position[];
}

export class Game {
  // Triangular board representation:
  // The positions are indexed as follows:
  //        0
  //       1 2
  //      3 4 5
  //     6 7 8 9
  //    10 11 12 13 14

  private board: Board;
  private selectedPeg: Position | null = null;
  private message: string = "Select a peg to move";
  
  // Position data for rendering pegs
  private readonly pegPositions: PegPosition[] = [
    // Row 1
    { top: 20, left: 50 },
    // Row 2
    { top: 60, left: 40 },
    { top: 60, left: 60 },
    // Row 3
    { top: 100, left: 30 },
    { top: 100, left: 50 },
    { top: 100, left: 70 },
    // Row 4
    { top: 140, left: 20 },
    { top: 140, left: 40 },
    { top: 140, left: 60 },
    { top: 140, left: 80 },
    // Row 5
    { top: 180, left: 10 },
    { top: 180, left: 30 },
    { top: 180, left: 50 },
    { top: 180, left: 70 },
    { top: 180, left: 90 }
  ];
  
  private readonly validMoves: Move[] = Board.generateMoves();

  constructor() {
    // Initialize the board with all pegs, except position 0 (top) is empty
    this.board = Array(BOARD_SIZE).fill(true);
    this.board[DEFAULT_EMPTY_POSITION] = false;
  }

  public getState(): GameState {
    // Calculate valid move targets for the selected peg
    const validMoveTargets = this.getValidMoveTargets();
    
    // Build peg info for rendering
    const pegs = this.board.map((hasPeg, index) => ({
      hasPeg,
      position: this.pegPositions[index],
      isSelected: index === this.selectedPeg,
      isValidTarget: validMoveTargets.includes(index)
    }));

    return {
      selectedPeg: this.selectedPeg,
      message: this.message,
      isGameOver: this.isGameOver(),
      countPegs: this.countPegs(),
      pegs,
      validMoveTargets
    };
  }

  public handlePegClick(position: Position): GameState {
    // If a peg is already selected
    if (this.selectedPeg !== null) {
      // If clicking the same peg, deselect it
      if (this.selectedPeg === position) {
        this.selectedPeg = null;
        this.message = "Select a peg to move";
        return this.getState();
      }
      
      // Check if we can jump from selectedPeg to this position
      const moveIndex = this.validMoves.findIndex(
        ([from, over, to]) => from === this.selectedPeg && to === position && 
        this.board[from] && this.board[over] && !this.board[to]
      );
      
      if (moveIndex !== -1) {
        const [from, over, to] = this.validMoves[moveIndex];
        
        // Make the move: remove peg from 'from' and 'over', add to 'to'
        this.board[from] = false;
        this.board[over] = false;
        this.board[to] = true;
        
        this.selectedPeg = null;
        this.message = "Good move! Select another peg.";
      } else {
        // If the clicked position is not a valid move
        if (this.board[position]) {
          // If clicking another peg, select that peg instead
          this.selectedPeg = position;
          this.message = "Peg selected. Click an empty spot to jump.";
        } else {
          this.message = "Invalid move. Try a different spot.";
        }
      }
    } else {
      // If this position has a peg, select it
      if (this.board[position]) {
        this.selectedPeg = position;
        
        // Check if this peg has any valid moves
        const hasValidMoves = this.getValidMoveTargets().length > 0;
        
        this.message = hasValidMoves ? 
          "Peg selected. Click an empty spot to jump." : 
          "This peg has no valid moves. Try another one.";
      } else {
        this.message = "You need to select a peg first.";
      }
    }
    
    return this.getState();
  }

  public resetGame(): GameState {
    this.board = Array(BOARD_SIZE).fill(true);
    this.board[DEFAULT_EMPTY_POSITION] = false;
    this.selectedPeg = null;
    this.message = "Game restarted. Select a peg to move.";
    return this.getState();
  }

  private getValidMoveTargets(): Position[] {
    if (this.selectedPeg === null) return [];
    
    // Find all valid destination positions for the selected peg
    return this.validMoves
      .filter(([from, over, to]) => 
        from === this.selectedPeg && 
        this.board[from] && 
        this.board[over] && 
        !this.board[to]
      )
      .map(([_, __, to]) => to);
  }

  private countPegs(): number {
    return this.board.filter(hasPeg => hasPeg).length;
  }

  private hasValidMovesLeft(): boolean {
    return this.validMoves.some(
      ([from, over, to]) => this.board[from] && this.board[over] && !this.board[to]
    );
  }

  private isGameOver(): boolean {
    return this.countPegs() === 1 || !this.hasValidMovesLeft();
  }
} 