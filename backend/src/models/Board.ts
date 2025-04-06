import { Position, Move } from './Game';

export const Board = {
  size: 15,
  rows: 5,
  structure: {
    rowStarts: [0, 1, 3, 6, 10],
    rowLengths: [1, 2, 3, 4, 5]
  },

  // Get the row number (0-based) for a given position
  getRow: (position: Position): number => 
    Board.structure.rowStarts.findIndex((start, index) => 
      position >= start && 
      position < (index < Board.structure.rowStarts.length - 1 
        ? Board.structure.rowStarts[index + 1] 
        : Board.size)
    ),

  // Get position within its row (0-based)
  getPositionInRow: (position: Position): number => {
    const row = Board.getRow(position);
    return position - Board.structure.rowStarts[row];
  },

  // Check if a position is valid on the board
  isValidPosition: (position: Position): boolean => 
    position >= 0 && position < Board.size,

  // Check if a position is valid within its row
  isValidInRow: (row: number, posInRow: number): boolean =>
    row >= 0 && 
    row < Board.rows && 
    posInRow >= 0 && 
    posInRow < Board.structure.rowLengths[row],

  // Convert row and position in row to board position
  toPosition: (row: number, posInRow: number): Position =>
    Board.isValidInRow(row, posInRow) ? Board.structure.rowStarts[row] + posInRow : -1,

  // Get adjacent positions in specified direction
  getAdjacentPositions: (position: Position): Position[][] => {
    const row = Board.getRow(position);
    const posInRow = Board.getPositionInRow(position);
    const results: Position[][] = [];

    // Function to check and add valid adjacent positions
    const addIfValid = (
      middleRow: number, 
      middlePos: number, 
      endRow: number, 
      endPos: number
    ): void => {
      const middle = Board.toPosition(middleRow, middlePos);
      const end = Board.toPosition(endRow, endPos);
      if (middle !== -1 && end !== -1) {
        results.push([middle, end]);
      }
    };

    // Horizontal moves (same row)
    addIfValid(row, posInRow - 1, row, posInRow - 2); // Left
    addIfValid(row, posInRow + 1, row, posInRow + 2); // Right

    // Diagonal moves up
    if (row > 1) {
      addIfValid(row - 1, posInRow - 1, row - 2, posInRow - 2); // Up-left
      addIfValid(row - 1, posInRow, row - 2, posInRow); // Up-center
      addIfValid(row - 1, posInRow + 1, row - 2, posInRow + 2); // Up-right
    }

    // Diagonal moves down
    if (row < Board.rows - 2) {
      addIfValid(row + 1, posInRow - 1, row + 2, posInRow - 2); // Down-left
      addIfValid(row + 1, posInRow, row + 2, posInRow); // Down-center
      addIfValid(row + 1, posInRow + 1, row + 2, posInRow + 2); // Down-right
    }

    return results;
  },

  // Generate all possible moves on the board
  generateMoves: (): Move[] => {
    // Generate moves for each position
    const moves = Array.from({ length: Board.size }, (_, pos) => 
      Board.getAdjacentPositions(pos)
        .map(([middle, end]): Move => [pos, middle, end])
    ).flat();

    // Return all valid moves (no need for explicit reverses as they're generated naturally)
    return moves;
  }
}; 