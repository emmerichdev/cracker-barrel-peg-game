import { Request, Response } from 'express';
import { Game, GameState, Position, BOARD_SIZE } from '../models/Game';

// In-memory game storage
const games = new Map<string, Game>();

// Get the game ID from the request or use default
const getGameId = (req: Request): string => req.params.id || 'default';

// Get or create a game instance
const getOrCreateGame = (gameId: string): Game => {
  if (!games.has(gameId)) {
    games.set(gameId, new Game());
  }
  return games.get(gameId) as Game;
};

// Get game state
export const getGameState = (req: Request, res: Response): void => {
  const game = getOrCreateGame(getGameId(req));
  res.json(game.getState());
};

// Handle a peg click
export const handlePegClick = (req: Request, res: Response): void => {
  const position: Position = parseInt(req.body.position, 10);
  
  if (isNaN(position) || position < 0 || position >= BOARD_SIZE) {
    res.status(400).json({ error: 'Invalid position' });
    return;
  }
  
  const game = getOrCreateGame(getGameId(req));
  const updatedState = game.handlePegClick(position);
  res.json(updatedState);
};

// Reset the game
export const resetGame = (req: Request, res: Response): void => {
  const game = getOrCreateGame(getGameId(req));
  const resetState = game.resetGame();
  res.json(resetState);
}; 