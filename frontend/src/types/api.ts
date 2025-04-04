// Game related types
export type Position = number;

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

// API response types
export interface ApiError {
  error: string;
}

export interface HealthResponse {
  status: string;
  message: string;
} 